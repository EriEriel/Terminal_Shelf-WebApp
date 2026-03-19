import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Category, Status } from "@/generated/prisma/enums";

export default function AddEntryPage() {
  // This is a Server Action!
  async function addEntry(formData: FormData) {
    "use server";

    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const category = formData.get("category") as Category
    const status = formData.get("status") as Status
    const url = formData.get("url") as string
    const notes = formData.get("notes") as string

    await prisma.entry.create({
      data: {
        title,
        author: author || null,
        category: category || "OTHER",
        status: status || "READING",
        url: url || null,
        notes: notes || null,
      },
    });

    // Go back to the homepage after adding
    redirect("/");
  }

  return (
    <main>
      <div className="bg-red-500 p-10 text-white text-4xl">
        Test button
      </div>
    </main>
  );
}
