# How Many Executive Orders?

A modern web application that tracks and displays U.S. Presidential Executive Orders using data from the Federal Register API.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fennelouski/howmanyexecutiveorders)

## Features

- **Real-time Data**: Fetches executive orders directly from the official Federal Register API
- **Comprehensive Statistics**: View total counts, yearly breakdowns, and per-president analytics
- **Interactive Search**: Filter and search through all executive orders by title, content, or president
- **Responsive Design**: Beautiful, mobile-friendly interface built with Tailwind CSS
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Optimized Performance**: Built with Next.js 16 for fast loading and optimal SEO

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel
- **Data Source**: [Federal Register API](https://www.federalregister.gov/developers/api/v1)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fennelouski/howmanyexecutiveorders.git
cd howmanyexecutiveorders
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
howmanyexecutiveorders/
├── app/
│   ├── api/
│   │   └── executive-orders/
│   │       └── route.ts          # API endpoint for fetching EO data
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main homepage
│   └── globals.css               # Global styles
├── components/
│   ├── ExecutiveOrdersList.tsx   # Searchable list component
│   ├── PresidentTable.tsx        # President statistics table
│   └── StatsCard.tsx             # Reusable stats card component
├── lib/
│   └── federalRegister.ts        # Federal Register API integration
├── types/
│   └── index.ts                  # TypeScript type definitions
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## API Routes

### GET `/api/executive-orders`

Fetches all executive orders data including:
- Total count of executive orders
- Statistics by president
- Yearly breakdown
- Complete list of orders

**Response:**
```json
{
  "total": 13960,
  "presidentStats": [...],
  "yearlyStats": [...],
  "orders": [...],
  "lastUpdated": "2025-11-15T12:00:00.000Z"
}
```

## Data Source

This application uses the [Federal Register API](https://www.federalregister.gov/developers/api/v1), which provides:
- Official executive order documents
- Publication and signing dates
- Full text and metadata
- Citations and references

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file based on `.env.local.example`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production on Vercel, this will be automatically set to your deployment URL.

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your site will be live!

Alternatively, click the "Deploy with Vercel" button at the top of this README.

### Manual Deployment

```bash
npm run build
npm run start
```

## Performance Considerations

- **Caching**: API responses are cached for 1 hour to reduce API load
- **Static Generation**: Uses Next.js static generation where possible
- **Code Splitting**: Automatic code splitting for optimal load times
- **Image Optimization**: Next.js automatic image optimization

## Contributing

Contributions are welcome! Please see [TASKS.md](./TASKS.md) for a list of planned features and enhancements.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data provided by the [Federal Register](https://www.federalregister.gov/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)

## Support

For issues and questions:
- Open an issue on GitHub
- Check the [Federal Register API documentation](https://www.federalregister.gov/developers/documentation/api/v1)

---

**Note**: This is an independent project and is not affiliated with the U.S. government or the Federal Register.
