// Component to display a list/table of executive orders
'use client';

import { useState, useMemo } from 'react';
import { ExecutiveOrder } from '@/types';

interface ExecutiveOrdersListProps {
  orders: ExecutiveOrder[];
}

export default function ExecutiveOrdersList({ orders }: ExecutiveOrdersListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPresident, setSelectedPresident] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Get unique presidents for filter
  const presidents = useMemo(() => {
    const unique = Array.from(new Set(orders.map(order => order.president)));
    return unique.sort();
  }, [orders]);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = searchTerm === '' ||
        order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.abstract?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPresident = selectedPresident === 'all' || order.president === selectedPresident;

      return matchesSearch && matchesPresident;
    });
  }, [orders, searchTerm, selectedPresident]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800">
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Executive Orders Database
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Browse and search all executive orders
        </p>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by title or content..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-64">
            <label htmlFor="president" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Filter by President
            </label>
            <select
              id="president"
              value={selectedPresident}
              onChange={(e) => {
                setSelectedPresident(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Presidents</option>
              {presidents.map(president => (
                <option key={president} value={president}>{president}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Showing {filteredOrders.length.toLocaleString()} of {orders.length.toLocaleString()} orders
        </div>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {paginatedOrders.map((order) => (
          <div key={order.document_number} className="px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                  {order.title}
                </h3>
                {order.abstract && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 line-clamp-2">
                    {order.abstract}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-500">
                  <span className="font-medium">{order.president}</span>
                  <span>•</span>
                  <span>Signed: {new Date(order.signing_date).toLocaleDateString()}</span>
                  {order.citation && (
                    <>
                      <span>•</span>
                      <span>{order.citation}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={order.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                >
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
