"use client";

// import { PlusIcon, CalculatorIcon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import Cookies from "js-cookie";
import { BellIcon, CalculatorIcon, House, IdCard, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user")) || []);
  }, []);

  return (
    <header className="w-full px-6 h-16 py-3 bg-white shadow-md mb-5 rounded-xl flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4 me-40">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide text-blue-700">
          <span className="text-orange-500">IN</span>FIN8
        </div>

        {/* Welcome Message */}
        <div>
          <p className="text-sm text-gray-900">
            Welcome back, <span className="font-bold">{user?.name}</span>
          </p>
          <p className="text-xs text-orange-500">
            8Twelve Corp, <span className="text-gray-600">Super Admin</span>
          </p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 mx-10">
        <div className="relative">
          <Input
            isClearable
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: ["bg-transparent", "flex"],

              inputWrapper: [],
            }}
            // label="Search"
            type="search "
            placeholder="Search..."
            radius="lg"
            endContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0" />
            }
          />
        </div>
      </div>

      {/* Right Section: Icons + Avatar */}
      <div className="flex items-center gap-3 ms-40">
        <div className="bg-blue-100 p-2 rounded-full">
          <Popover placement={"bottom-end"} className="bg-[#f1f1f1] ">
            <PopoverTrigger>
              <PlusIcon className="h-4 w-4 text-blue-500" />
              {/* <Button>Open Popover</Button> */}
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 flex flex-col gap-3">
                <Link href="/deals/create" className="text-small font-bold flex flex-start gap-2 border border-bottom px-4 py-2 "> <House /> Create Deal</Link>
                 <Link href="/contacts/create" className="text-small font-bold flex flex-start gap-2 px-4 py-2"> <IdCard /> Create Contact</Link>
                {/* <div className="text-tiny">This is the popover content</div> */}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="bg-blue-100 p-2 rounded-full">
          <CalculatorIcon className="h-4 w-4 text-blue-500" />
        </div>
        <div className="bg-blue-100 p-2 rounded-full">
          <BellIcon className="h-4 w-4 text-blue-500" />
        </div>
        {/* Avatar */}
        <img
          src="/avatar.jpg"
          alt="User"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </header>
  );
}
