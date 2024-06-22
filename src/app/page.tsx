'use client';
import { set } from "zod";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import Link from "next/link"
import { useState } from "react"; 


export default function HomePage() {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    // e.preventDefault();
    setSearch('🚧App construction under progress🚧');
    console.log(search);
  }

  return (
    <section className="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 py-2">
                Learn Something New in Just 10 Minutes!
              </h1>
              <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
                Welcome to Learn in 10! Discover new skills in just 10 minutes. Boost productivity, learn a language, or explore a hobby. Start your learning journey now!
              </p>
            </div>
            <div className="w-full max-w-3xl space-y-2 mx-auto">
              {/* this is a form, div for now */}
              <div className="flex space-x-2 justify-center items-center">
                <Textarea
                  className="flex-1 bg-gray-800 text-white border-gray-900 resize-none placeholder:text-lg"
                  placeholder="What would you like to learn today?"
                />
                <Button 
                  className="bg-white text-black h-[60px] text-lg" 
                  
                  onClick={handleSearch}>
                  Start Learning
                </Button>
              </div>
              <p className="text-3xl text-zinc-200 dark:text-zinc-100 text-center">
                {search}
              </p>
              {/* <p className="text-xs text-zinc-200 dark:text-zinc-100">
                Get ready to redefine your email experience.
                <Link className="underline underline-offset-2 text-white" href="#" prefetch={false}>
                  Terms & Conditions
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
