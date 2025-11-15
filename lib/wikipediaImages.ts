/**
 * Wikipedia API utilities for fetching president portrait images
 */

interface WikipediaImageResponse {
  query?: {
    pages?: {
      [key: string]: {
        pageimage?: string;
        thumbnail?: {
          source: string;
          width: number;
          height: number;
        };
        original?: {
          source: string;
          width: number;
          height: number;
        };
      };
    };
  };
}

/**
 * Fetch the main image URL from a Wikipedia page
 * @param pageTitle - Wikipedia page title (e.g., "Barack_Obama")
 * @param size - Thumbnail size in pixels (default: 500)
 * @returns Image URL or null if not found
 */
export async function getWikipediaImage(
  pageTitle: string,
  size: number = 500
): Promise<string | null> {
  try {
    // Wikipedia API endpoint with CORS support
    const url = new URL('https://en.wikipedia.org/w/api.php');
    url.searchParams.append('action', 'query');
    url.searchParams.append('titles', pageTitle);
    url.searchParams.append('prop', 'pageimages');
    url.searchParams.append('format', 'json');
    url.searchParams.append('pithumbsize', size.toString());
    url.searchParams.append('pilicense', 'any'); // Include non-free images for thumbnails
    url.searchParams.append('origin', '*'); // CORS support
    url.searchParams.append('formatversion', '2'); // Easier response parsing

    const response = await fetch(url.toString(), {
      cache: 'force-cache', // Cache images for 24 hours
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      console.error(`Wikipedia API error: ${response.status}`);
      return null;
    }

    const data = await response.json() as WikipediaImageResponse;

    // Extract image URL from response
    if (data.query?.pages) {
      const pages = Object.values(data.query.pages);
      if (pages.length > 0 && pages[0].thumbnail) {
        return pages[0].thumbnail.source;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching Wikipedia image for ${pageTitle}:`, error);
    return null;
  }
}

/**
 * Get the original (full-size) image from Wikipedia
 */
export async function getWikipediaOriginalImage(
  pageTitle: string
): Promise<string | null> {
  try {
    const url = new URL('https://en.wikipedia.org/w/api.php');
    url.searchParams.append('action', 'query');
    url.searchParams.append('titles', pageTitle);
    url.searchParams.append('prop', 'pageimages');
    url.searchParams.append('format', 'json');
    url.searchParams.append('piprop', 'original');
    url.searchParams.append('pilicense', 'any');
    url.searchParams.append('origin', '*');
    url.searchParams.append('formatversion', '2');

    const response = await fetch(url.toString(), {
      cache: 'force-cache',
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      console.error(`Wikipedia API error: ${response.status}`);
      return null;
    }

    const data = await response.json() as WikipediaImageResponse;

    if (data.query?.pages) {
      const pages = Object.values(data.query.pages);
      if (pages.length > 0 && pages[0].original) {
        return pages[0].original.source;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching Wikipedia original image for ${pageTitle}:`, error);
    return null;
  }
}

/**
 * Fallback image URLs for presidents if Wikipedia API fails
 * These are stable Wikimedia Commons URLs for presidential portraits
 */
export const FALLBACK_PRESIDENT_IMAGES: Record<string, string> = {
  "George Washington": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/440px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
  "Joe Biden": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/440px-Joe_Biden_presidential_portrait.jpg",
  "Donald Trump": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/440px-Donald_Trump_official_portrait.jpg",
  "Barack Obama": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/440px-President_Barack_Obama.jpg",
  "George W. Bush": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/George-W-Bush.jpeg/440px-George-W-Bush.jpeg",
  "Bill Clinton": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bill_Clinton.jpg/440px-Bill_Clinton.jpg",
  "George H. W. Bush": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/George_H._W._Bush%2C_President_of_the_United_States%2C_1989_official_portrait.jpg/440px-George_H._W._Bush%2C_President_of_the_United_States%2C_1989_official_portrait.jpg",
  "Ronald Reagan": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Portrait_of_President_Reagan_1981.jpg/440px-Official_Portrait_of_President_Reagan_1981.jpg",
  "Jimmy Carter": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Jimmy_Carter_1977.jpg/440px-Jimmy_Carter_1977.jpg",
  "Gerald Ford": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Gerald_Ford_presidential_portrait.jpg/440px-Gerald_Ford_presidential_portrait.jpg",
  "Richard Nixon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Richard_Nixon_presidential_portrait.jpg/440px-Richard_Nixon_presidential_portrait.jpg",
  "Lyndon B. Johnson": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/37_Lyndon_Johnson_3x4.jpg/440px-37_Lyndon_Johnson_3x4.jpg",
  "John F. Kennedy": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg/440px-John_F._Kennedy%2C_White_House_color_photo_portrait.jpg",
  "Dwight D. Eisenhower": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_29%2C_1959.jpg/440px-Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_29%2C_1959.jpg",
  "Harry S. Truman": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Harry_S_Truman.jpg/440px-Harry_S_Truman.jpg",
  "Franklin D. Roosevelt": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/FDR_1944_Color_Portrait.jpg/440px-FDR_1944_Color_Portrait.jpg",
};

/**
 * Get president image with fallback
 */
export async function getPresidentImage(
  presidentName: string,
  wikipediaTitle: string
): Promise<string> {
  // Try Wikipedia API first
  const wikipediaImage = await getWikipediaImage(wikipediaTitle, 440);

  if (wikipediaImage) {
    return wikipediaImage;
  }

  // Fall back to static URLs
  return FALLBACK_PRESIDENT_IMAGES[presidentName] || '';
}
