import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductGrid } from '@/components/ProductDisplay';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ListingTypeToggle from '@/components/TogglerRentBuy';

export const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category
  const [searchValue,setSearchValue] = useState(""); // State for search value
  const [selected, setSelected] = useState("Rent");


  return (
    <>
      <div className="flex justify-between items-center max-w-[90rem] mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold">Browse Listings</h2>
        <div className="flex gap-4">
          <input
            className="border border-black p-2 rounded-sm"
            type="text"
            placeholder="Search listings..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Sheet>
            <SheetTrigger className="border border-black p-2 rounded-sm">
              Filters
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-bold">Filters</SheetTitle>
                <SheetDescription>
                  Filter items according to your needs
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-5 font-bold">
                <h1 className="font-bold">Categories</h1>
                <RadioGroup
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Home" id="r2" />
                    <Label htmlFor="r2">Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Vehicles" id="r3" />
                    <Label htmlFor="r3">Vehicles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Electronics" id="r4" />
                    <Label htmlFor="r4">Electronics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Photography" id="r5" />
                    <Label htmlFor="r5">Photography</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Clothing" id="r6" />
                    <Label htmlFor="r6">Clothing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Furniture" id="r7" />
                    <Label htmlFor="r7">Furniture</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tools" id="r8" />
                    <Label htmlFor="r8">Tools</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sports" id="r9" />
                    <Label htmlFor="r9">Sports</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <ListingTypeToggle selected={selected} setSelected={setSelected} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div>
        <ProductGrid category={selectedCategory} searchValue={searchValue} selected={selected} />{" "}
        {/* Pass category to ProductGrid */}
      </div>
    </>
  );
};
