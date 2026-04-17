import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./-components/Slider";
import Api from "./-utils/Api";
import CategoryList from "./-components/CategoryList";
import ProductList from "./-components/ProductList";
import Footer from "./-components/Footer";
export default async function Home() {
  const sliderList = await Api.getSlider();
  console.log(sliderList);
  const categoryList = await Api.getCategoryList();
  console.log(categoryList);
  const productList = await Api.getProductList();
  console.log(productList);
  return (
    <div className="p-10 px-16">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />
      <div className=" bg-yellow-400 rounded-3xl p-8 overflow-hidden flex items-center justify-between mt-10">
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <h2 className=" text-7xl font-outfit text-white drop-shadow-md">
            Delivering In Time
          </h2>
          <p className="text-shadow-black text-2xl font-outfit">
            Follow Our Page
          </p>
        </div>
        <div className="w-1/2 flex justify-end">
          <Image 
          src="/footerImg.png.png" 
          width={400} 
          height={250} 
          alt="Delivery" 
          className="mt-8 object-contain"
          layout="responsive"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
