import { SearchForm } from "~/components/search-form";
import { db } from "@learnin10/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <section className="h-screen w-full bg-black py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-4">
              <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text py-2 text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                Learn Something New in Just 10 Minutes!
              </h1>
              <p className="mx-auto max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100">
                Welcome to Learn in 10! Discover new skills in just 10 minutes.
                Boost productivity, learn a language, or explore a hobby. Start
                your learning journey now!
              </p>
              <div className="mt-8 flex flex-col items-center gap-4">
                <h2 className="text-xl font-semibold text-white">
                  Database Posts:
                </h2>
                <div className="space-y-2">
                  {posts.length === 0 ? (
                    <p className="text-zinc-400">No posts yet</p>
                  ) : (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        className="rounded-lg bg-gray-800 p-4 text-white"
                      >
                        <p className="font-semibold">ID: {post.id}</p>
                        <p className="text-lg">{post.name}</p>
                        <p className="text-sm text-zinc-400">
                          Created: {post.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <SearchForm />
          </div>
        </div>
      </div>
    </section>
  );
}
