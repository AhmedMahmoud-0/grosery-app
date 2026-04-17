import React from "react";
import Link from "next/link";
import Image from "next/image";
function TopCategoryList({ categoryList, selectedCategory }) {
  return (
    <div
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6
      justify-items-center items-center mt-5"
    >
      {categoryList?.map((category, index) => (
        <Link
          href={"/products-category/" + category.name}
          key={index}
          className={`w-30 h-35 mt-3 p-3 flex flex-col items-center text-center group ${selectedCategory === category.name ? "bg-[#ffcc00] text-dark text-white" : "bg - amber - 100"}
          `}
        >
          <Image
            src={`http://localhost:1337${category?.icon?.[0]?.url}`}
            width={80}
            height={80}
            alt="icon"
            unoptimized={true}
            className="hover:scale-125 transition-all cursor-pointer"
          />
          <small
            className={`text-amber-500 font-bold capitalize ${selectedCategory === category.name ? " text-black" : "bg - amber - 100"}`}
          >
            {category.name}
          </small>
        </Link>
      ))}
    </div>
  );
}

export default TopCategoryList;
