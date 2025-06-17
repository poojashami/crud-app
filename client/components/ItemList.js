export default function ItemList({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Name
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Description
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((item) => (
            <tr key={item._id}>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.description}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <button
                  onClick={() => onEdit(item)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
