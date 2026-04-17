import Api from "@/app/-utils/Api";
import React from "react";
import TopCategoryList from "./_components/TopCategoryList";
import ProductList from "@/app/-components/ProductList";
async function ProductCategory({ params }) {
  const { categoryName } = await params;
  const productList = await Api.getProductByCategory(categoryName);
  const categoryList = await Api.getCategoryList();
  return (
    <div>
      <h2 className="bg-[#ffcc00] text-black font-bold p-4 text-center text-2xl capitalize">
        {decodeURIComponent(categoryName)}
      </h2>
      <TopCategoryList categoryList={categoryList} selectedCategory={categoryName}/>
      <ProductList productList={productList} />
    </div>
  );
}

export default ProductCategory;
