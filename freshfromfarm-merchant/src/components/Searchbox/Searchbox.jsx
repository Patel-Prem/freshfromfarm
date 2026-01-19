import React, { useContext } from "react";
import { ProduceContext } from "../../contexts/Context";

export default function Searchbox() {
  const produceContext = useContext(ProduceContext);

  return (
    <div id="searchbox" className="flex-1 px-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-full border px-4 py-2 text-sm text-gary-900 dark:text-gray-100 dark:!bg-gray-800 dark:!border-gray-700/60 dark:focus:!border-gray-600 focus:outline-none"
      />
    </div>
  );
}
