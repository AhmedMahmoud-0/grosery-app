import React from "react";
import Image from "next/image";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <div className="shadow-md flex justify-between p-2">
      <div className="flex items-center gap-8">
        <Image width={100} height={100} src="/logo.png.png" alt="" />
        <h2
          className="flex gap-2 items-center
          border rounded-full p-2 bg-slate-200"
        >
          <LayoutGrid className="h-5 w-5" />
          Category
        </h2>
        <div className="hidden md:flex items-center gap-3 border rounded-full p-2 ">
          <Search />
          <input type="text" className="outline-none" placeholder="search" />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 items-center">
          <ShoppingBag />0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Header;
