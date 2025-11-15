// Stats card component for displaying key metrics
interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">{description}</p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 text-zinc-400 dark:text-zinc-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
