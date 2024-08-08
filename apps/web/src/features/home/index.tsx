"use client";

import AuthGuard from "@/hoc/AuthGuard";
import { useAppSelector } from "@/redux/hooks";

const Homepage = () => {
  const { name } = useAppSelector((state) => state.user);
  return <div>Hello, {name}</div>;
};

export default AuthGuard(Homepage);
