import { SearchForm } from "~/components/search-form";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

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
              <div className="flex flex-col items-center gap-4 mt-8">
                <h2 className="text-xl text-white font-semibold">Database Posts:</h2>
                <div className="space-y-2">
                  {posts.length === 0 ? (
                    <p className="text-zinc-400">No posts yet</p>
                  ) : (
                    posts.map((post) => (
                      <div key={post.id} className="bg-gray-800 p-4 rounded-lg text-white">
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
