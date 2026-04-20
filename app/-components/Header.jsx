"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Api from "../-utils/Api";
import CartItemList from "./CartItemList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "../_context/CartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const Header = () => {
  const router = useRouter();
  const [Category, setCategory] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const userid =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  const jwt =
    typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;
  const { updateCart, setUpdateCart } = useContext(CartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  useEffect(() => {
    setIsLogin(!!sessionStorage.getItem("jwt"));
    getCartItems();
    getCategorylist();
  }, [updateCart]);

  const getCategorylist = () => {
    Api.getCategory().then((resp) => {
      setCategory(resp.data.data);
      console.log(resp.data.data);
    });
  };
  const getCartItems = async () => {
    const cartItems = await Api.getCartItems(userid.id, jwt);
    console.log(cartItems);
    setTotalCartItem(cartItems.length);
    setCartItemList(cartItems);
  };
  console.log("Check Categories Content", Category);
  return (
    <div className="shadow-md flex justify-between p-2">
      <div className="flex items-center gap-8">
        <Image width={100} height={100} src="/logo.png.png" alt="" priority />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex gap-2 items-center
          border rounded-full p-2 bg-slate-200"
            >
              <LayoutGrid className="h-5 w-5" />
              Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            {Category.map((cat) => (
              <DropdownMenuItem key={cat.id}>
                <Image
                  src={`http://localhost:1337${cat?.icon?.[0]?.url}`}
                  width={23}
                  height={23}
                  unoptimized={true}
                  alt=""
                />
                <Link href={`/products-category/${cat.name}`}>
                  <p className="cursor-pointer text-lg">{cat.name}</p>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex items-center gap-3 border rounded-full p-2 ">
          <Search />
          <input type="text" className="outline-none" placeholder="search" />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            {" "}
            <h2 className="flex gap-2 items-center">
              <ShoppingBag />
              <span>{totalCartItem}</span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-[#ffcc00] font-bold text-black p-2 mt-5 ">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList cartItemList={cartItemList} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <CircleUserIcon className="h-7 w-7 cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/myOrders">Orders</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onSignOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
