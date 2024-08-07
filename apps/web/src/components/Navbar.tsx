"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import Link from "next/link";

const Navbar = () => {
  const { id, name } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <nav className="sticky top-0 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <h1 className="cursor-pointer text-xl font-bold">Logo</h1>

          <div className="flex cursor-pointer items-center gap-8 font-medium">
            <h3>Home</h3>
            <h3>Write</h3>
            <h3>Profile</h3>
            {id ? (
              <>
                <Link href="/profile">{name}</Link>
                <h3 onClick={() => dispatch(logoutAction())}>Logout</h3>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
