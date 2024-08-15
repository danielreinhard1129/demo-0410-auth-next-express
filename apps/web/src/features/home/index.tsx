"use client";

import Autocomplete from "@/components/Autocomplete";
import BlogList from "./components/BlogList";
import Jumbotron from "./components/Jumbotron";

const Homepage = () => {
  return (
    <main className="container mx-auto px-4">
      <Jumbotron />
      <Autocomplete />
      <BlogList />
    </main>
  );
};

export default Homepage;
