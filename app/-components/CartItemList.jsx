import React from "react";
import Image from "next/image";
function CartItemList({ cartItemList }) {
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItemList;
