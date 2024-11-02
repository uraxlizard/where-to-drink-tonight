// components/TabList.js

import React from "react";

const TabList = ({ categories, onTabChange, selectedCategory }) => {
  return (
    <div className="flex space-x-4 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onTabChange(category)}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            selectedCategory === category
              ? "bg-white text-indigo-600 font-bold"
              : "bg-transparent text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default TabList;
