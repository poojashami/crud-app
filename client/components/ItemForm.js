// import { useState, useEffect } from "react";

// export default function ItemForm({ onSubmit, initialData }) {
//   const [item, setItem] = useState({
//     name: "",
//     description: "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setItem(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setItem((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(initialData?._id, item);
//     if (!initialData) {
//       setItem({ name: "", description: "" });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={item.name}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           name="description"
//           value={item.description}
//           onChange={handleChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           rows={3}
//         />
//       </div>

//       <button
//         type="submit"
//         className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//       >
//         {initialData ? "Update" : "Create"}
//       </button>

//       {initialData && (
//         <button
//           type="button"
//           onClick={() => onSubmit(null)}
//           className="ml-2 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Cancel
//         </button>
//       )}
//     </form>
//   );
// }
