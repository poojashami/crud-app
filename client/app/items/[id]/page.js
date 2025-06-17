"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import Link from "next/link";

export default function ItemView() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/items/${id}`);
        if (!res.ok) throw new Error("Failed to fetch item");
        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-2 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            <FiArrowLeft /> Back to Items
          </button>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p>Item not found</p>
        <button
          onClick={() => router.push("/")}
          className="mt-2 flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          <FiArrowLeft /> Back to Items
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft /> Back to List
        </button>
        <Link
          href={`/items/${id}/edit`}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <FiEdit /> Edit Item
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h1>

          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 mb-1">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {item.description || "No description provided"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h2 className="font-medium text-gray-500">Created At</h2>
              <p className="text-gray-700">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <h2 className="font-medium text-gray-500">Last Updated</h2>
              <p className="text-gray-700">
                {new Date(item.updatedAt || item.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
