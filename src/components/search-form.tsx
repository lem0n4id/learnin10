'use client';

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export function SearchForm() {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    setSearch('🚧App construction under progress🚧');
    console.log(search);
  };

  return (
    <div className="w-full max-w-3xl space-y-2 mx-auto">
      <div className="flex space-x-2 justify-center items-center">
        <Textarea
          className="flex-1 bg-gray-800 text-white border-gray-900 resize-none placeholder:text-lg"
          placeholder="What would you like to learn today?"
        />
        <Button 
          className="bg-white text-black h-[60px] text-lg" 
          onClick={handleSearch}
        >
          Start Learning
        </Button>
      </div>
      <p className="text-3xl text-zinc-200 dark:text-zinc-100 text-center">
        {search}
      </p>
    </div>
  );
}
