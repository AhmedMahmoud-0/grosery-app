import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductDetail from "./ProductDetail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
function ProductItem({ product }) {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg cursor-pointer hover:scale-105 hover:shadow-md transition-all">
      <Image
        className="w-100 h-100"
        src={`http://localhost:1337${product?.image[0]?.url}`}
        width={500}
        height={200}
        alt="icon"
        unoptimized={true}
        style={{ objectFit: "cover" }}
      />
      <h2 className="text-amber-500 font-bold">{product.name}</h2>
      <div className="flex gap-2">
        <del className="text-red-500 font-bold text-xl">
          {product.realPrice} $
        </del>
        <h2 className="font-bold text-xl">{product.sellingPrice} $</h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add To Cart</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>

            <DialogDescription>

              <ProductDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
