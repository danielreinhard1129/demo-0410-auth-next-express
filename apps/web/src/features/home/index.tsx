"use client";

import AuthGuard from "@/hoc/AuthGuard";

const Homepage = () => {
  return <div>Homepage</div>;
};

export default AuthGuard(Homepage);
