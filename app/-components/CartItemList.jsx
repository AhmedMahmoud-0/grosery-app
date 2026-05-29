"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function CartItemList({ cartItemList }) {
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total = total + item.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);
  return (
    <div>
      <div>
        {cartItemList.map((cart, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-4 mt-5">
              <Image
                src={`http://localhost:1337${cart?.image}`}
                width={70}
                height={70}
                alt="icon"
                unoptimized={true}
                className="border p-2"
              />
              <div>
                <h2 className="font-bold ">{cart?.name}</h2>
                <h2 className="font-bold ">quantity: {cart?.quantity}</h2>
                <h2 className="font-bold "> {cart?.amount} $</h2>
              </div>
            </div>
            <TrashIcon />
          </div>
        ))}
      </div>

      <div className="mt-8 absolute w-[90%] bottom-5 flex flex-col">
        <h2 className="flex justify-between font-bold">
          SubTotal <span>${subTotal.toFixed(2)}</span>
        </h2>
        <Link href="/checkout">
          <Button className="mt-5 w-[99%] text-black font-bold text-xl">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CartItemList;
