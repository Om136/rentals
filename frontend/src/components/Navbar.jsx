import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";


export const Navbar = () => {
  return (
    <div className='flex justify-between py-4 items-center mx-2'>
      <div>
        <Button className=" text-2xl font-bold" variant="link">
          <Link href="/">Rentals</Link>
        </Button>
      </div>
      <div className=''>
        <Button className=" text-sm" variant="link">
          <Link href="/browse">Browse</Link>
        </Button>
        <Button variant="link">
          <Link href="/working">How it works</Link>
        </Button>
        <Button variant="link">
          <Link href="/list-item">List your item</Link>
        </Button>
      </div>
      <div className='flex gap-4'>
        <Button asChild>
          <Link href="/signin">Sign in</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
