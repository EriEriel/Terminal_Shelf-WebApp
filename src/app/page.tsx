import { prisma } from "@/lib/db";
import Link from "next/link";

async function getEntries() {
  return await prisma.entry.findMany({
    orderBy: { updatedAt: "desc" },
    include: { tags: true },
  });
}

export default async function Home() {
  const entries = await getEntries();

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Virtual Shelf</h1>
          <p className="text-muted-foreground mt-2">Manage your favorite stories and bookmarks in one place!!.</p>
        </div>
        <div className="border rounded-lg p-3">
          <Link href="/add">Add Entry</Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Your shelf is empty. Start adding some fics!</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {entry.category}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border 
                  ${entry.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-200' :
                    entry.status === 'READING' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      entry.status === 'PLAN_TO_READ' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-zinc-50 text-zinc-700 border-zinc-200'
                  }`}>
                  {entry.status.replace(/_/g, ' ')}
                </span>
              </div>

              <h2 className="text-xl font-bold leading-tight mb-2 line-clamp-1">{entry.title}</h2>
              {entry.author && <p className="text-sm text-muted-foreground mb-4">by {entry.author}</p>}

              <div className="mt-auto pt-4 flex flex-wrap gap-2">
                {entry.tags.map(tag => (
                  <span key={tag.id} className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
