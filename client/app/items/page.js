import Link from "next/link";
const API_URL = process.env.API_URL || "http://localhost:5000";

async function getItems() {
  const res = await fetch(`${API_URL}/api/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Items List</h1>
        <Link
          href="/items/create"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create New
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">{item.description}</td>
                <td className="py-2 px-4 border">
                  <Link
                    href={`/items/${item._id}`}
                    className="text-blue-500 mr-2"
                  >
                    View
                  </Link>
                  <Link
                    href={`/items/${item._id}/edit`}
                    className="text-green-500"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
