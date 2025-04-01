import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductGrid } from '@/components/ProductDisplay';

export const Browse = () => {
  return (
    <>
      <div className="flex  justify-between items-center max-w-[90rem] mx-auto px-4 py-8">
        <h2 className=" text-3xl font-bold">Browse Listings</h2>
        <div className='flex gap-4'>
          <input
            className="border border-black p-2 rounded-sm"
            type="text"
            placeholder="Search listings..."
          />
          <Sheet>
            <SheetTrigger className="border border-black p-2 rounded-sm">
              Filters
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div>
        <ProductGrid />
      </div>
    </>
  );
}
