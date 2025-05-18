"use client";
import DealDetailsSkeliton from "@/components/basiclayout/dealDetails";
import AssetsAccordionForm from "@/components/pages/deal/details/assets/form";
import AdditionalIncomeAccordionForm from "@/components/pages/deal/details/borrower/additionalincome/incomeForm";
import DealAccordionForm from "@/components/pages/deal/details/dealinfo";
import { usePathname } from "next/navigation";
import React from "react";

const Page = () => {
  const path = usePathname();
  console.log(path);

  return (
    <DealDetailsSkeliton>
      <DealAccordionForm></DealAccordionForm>
      <AdditionalIncomeAccordionForm></AdditionalIncomeAccordionForm>
      <AssetsAccordionForm></AssetsAccordionForm>
    </DealDetailsSkeliton>
  );
};

export default Page;
