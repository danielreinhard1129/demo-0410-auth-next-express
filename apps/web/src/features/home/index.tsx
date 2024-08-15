"use client";

import { useSession } from "next-auth/react";

const Homepage = () => {
  const session = useSession();

  return <div>Hello, {session.data?.user.name}</div>;
};

export default Homepage;
