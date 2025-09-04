import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token && token !== "null" && token !== "undefined");
  }, []);

  // Listen for storage changes (login/logout from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(token && token !== "null" && token !== "undefined");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <div className="flex justify-between py-4 items-center mx-2">
      <div>
        <Button
          onClick={() => {
            navigate("/");
          }}
          className=" text-2xl font-bold"
          variant="link"
        >
          Rentals
        </Button>
      </div>
      <div className="">
        <Button
          onClick={() => {
            navigate("/browse");
          }}
          className=" text-sm"
          variant="link"
        >
          Browse
        </Button>
        <Button
          onClick={() => {
            navigate("/working");
          }}
          className=" text-sm"
          variant="link"
        >
          How it works
        </Button>
        {isAuthenticated && (
          <>
            <Button
              variant="link"
              onClick={() => {
                navigate("/list-item");
              }}
            >
              List your item
            </Button>
            <Button
              variant="link"
              onClick={() => {
                navigate("/manage");
              }}
            >
              Manage my items
            </Button>
          </>
        )}
      </div>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <Button onClick={handleLogout}>Log out</Button>
        ) : (
          <>
            <Button onClick={handleSignIn}>Sign in</Button>
            <Button onClick={handleSignUp}>Sign up</Button>
          </>
        )}
      </div>
    </div>
  );
};
