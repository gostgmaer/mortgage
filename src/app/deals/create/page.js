"use client"
import AppLayout from "@/components/basiclayout/Layout";
import CreateDeal from "@/components/forms/createDeal";
// import { Select, SelectItem } from "@heroui/react";
// import { TextSelectIcon } from "lucide-react";
// import { Select, SelectItem } from "@heroui/select";
// import {Select, SelectItem} from "@heroui/react";   
// import { Apple } from "lucide-react";
import React from "react";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

const Page = () => {
  return (
   <AppLayout>
     <div>
      <div>Create Deal</div>
      <div>
        <p>Select the transaction type of the deal.</p>
        <CreateDeal></CreateDeal>
   
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
   </AppLayout>
  );
};

export default Page;
