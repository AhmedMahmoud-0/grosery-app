"use client";
import Api from "../-utils/Api";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Checkout() {
  const userid =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  const jwt =
    typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  const allAmount = () => {
    const calculateallAmount = subTotal + subTotal * 0.09 + 15;
    return calculateallAmount.toFixed(2);
  };

  const handlePayment = () => {
    if (!username || !email || !phone || !zip || !address) {
      toast.error("please fill in the billing address");
    }

    const data = {
      data: {
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        totalOrderAmount: Math.round(allAmount()),
        userId: userid?.id,
        orderItemList: cartItemList.map((item) => ({
          quantity: item.quantity,
          amount: Math.round(item.amount),
          product: item.product,
        })),
      },
    };
    Api.createOrder(data, jwt).then((resp) => {
      console.log(resp);
      toast("order places successfully");
      router.push("/");
    });
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total = total + item.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const cartItems = await Api.getCartItems(userid.id, jwt);
    console.log(cartItems);
    setTotalCartItem(cartItems.length);
    setCartItemList(cartItems);
  };

  return (
    <div>
      <h2 className="p-3 bg-[#ffcc00] text-xl font-bold text-center">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <Input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Zip"
            />
          </div>

          <div className="mt-3">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
        </div>

        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart({totalCartItem})
          </h2>

          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              subtotal: <span>{subTotal.toFixed(2)}</span>
            </h2>

            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>15 $</span>
            </h2>
            <h2 className="flex justify-between">
              Tax(9%): <span>{(subTotal * 0.09).toFixed(2)}$</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total <span>{allAmount()}$</span>
            </h2>
            <Button onClick={handlePayment}>
              Payment <ArrowBigRight />{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
