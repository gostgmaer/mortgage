"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

const Page = () => {
    const path = usePathname()
    console.log(path);
    
  return (
    <div>Page</div>
  )
}

export default Page