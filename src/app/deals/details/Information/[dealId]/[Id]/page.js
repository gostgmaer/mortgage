'use server'
import DealDetailsSkeliton from "@/components/basiclayout/dealDetails";
import AssetsAccordionForm from "@/components/pages/deal/details/assets/form";
import AdditionalIncomeAccordionForm from "@/components/pages/deal/details/borrower/additionalincome/incomeForm";
import DealAccordionForm from "@/components/pages/deal/details/dealinfo";
import dealService from "@/lib/network/services/dealService";
// import { usePathname } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";
const Page = async ({ params, searchParams }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  // console.log(token);
  const { dealId, Id } = await params;
  console.log(params);
  
  const data = await getRecord(Id,token);

  return (
    <>
      <DealDetailsSkeliton data={data}>
        <div className=" flex flex-col w-full gap-5">
          <DealAccordionForm></DealAccordionForm>
          <AdditionalIncomeAccordionForm></AdditionalIncomeAccordionForm>
          <AssetsAccordionForm></AssetsAccordionForm>
        </div>
      </DealDetailsSkeliton>
    </>
  );
};

export default Page;

export const getRecord = async (id,token) => {
  const full = await dealService.getFullDealDetails({
    deal_application_id: id,
    
  },{ "Authorization": `Bearer ${token}` });
  const deal = await dealService.getSingleDeal({
    data: {
      deal_application_id: id,
    },
  },{ "Authorization": `Bearer ${token}` });
  return { full, deal };
};
