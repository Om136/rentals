import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";



export const Navbar = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    // Handle sign-in logic here
    navigate('/sign-in');
  };
  const handleSignUp = () => {
    // Handle sign-up logic here
    navigate('/sign-up');
  }
  return (
    <div className='flex justify-between py-4 items-center mx-2'>
      <div>
        <Button onClick={()=>{
          navigate("/")
        }} className=" text-2xl font-bold" variant="link">
          Rentals
        </Button>
      </div>
      <div className=''>
        <Button onClick={()=>{navigate("/browse")}} className=" text-sm" variant="link">
          Browse
        </Button>
        <Button variant="link">
          <Link href="/working">How it works</Link>
        </Button>
        <Button variant="link" onClick={()=>{
          navigate("/list-item")
        }}>
          List your item
        </Button>
      </div>
      <div className='flex gap-4'>
        <Button onClick={handleSignIn}>
          Sign in
        </Button>
        <Button onClick={handleSignUp}>
          Sign up
        </Button>
      </div>
    </div>
  );
}
