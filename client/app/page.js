"use client"; // Add this since we're using hooks

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiPlus, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/items");
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/items/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete item");
        setItems(items.filter((item) => item._id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Items Management</h1>
        <Link
          href="/items/create"
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          <FiPlus /> Create New Item
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black font-semibold uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black font-semibold uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-black font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {item.description}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/items/${item._id}`}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition"
                          title="View"
                        >
                          <FiEye />
                        </Link>
                        <Link
                          href={`/items/${item._id}/edit`}
                          className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No items found. Create one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          Showing {items.length} {items.length === 1 ? "item" : "items"}
        </div>
      )}
    </div>
  );
}
