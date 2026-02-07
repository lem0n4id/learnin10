"use client";

import { useState } from "react";
import { Button, Textarea } from "@learnin10/ui";

export function SearchForm() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setSearch("🚧App construction under progress🚧");
    console.log(search);
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-2">
      <div className="flex items-center justify-center space-x-2">
        <Textarea
          className="flex-1 resize-none border-gray-900 bg-gray-800 text-white placeholder:text-lg"
          placeholder="What would you like to learn today?"
        />
        <Button
          className="h-[60px] bg-white text-lg text-black"
          onClick={handleSearch}
        >
          Start Learning
        </Button>
      </div>
      <p className="text-center text-3xl text-zinc-200 dark:text-zinc-100">
        {search}
      </p>
    </div>
  );
}
