import { AlertDelete } from "./DeleteAlertModal";
import { Button } from "@/components/ui/button"
import { updateEntry } from "./actions";
import { Pencil } from "lucide-react";
import { type EntryWithTags } from "@/components/EntryCard"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function EditEntryModal({ entry }: { entry: EntryWithTags }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="w-4 h-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader> <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>Edit your favourite material here!</DialogDescription>
        </DialogHeader>

        <form action={updateEntry} className="space-y-4"> <input type="hidden" name="id" value={entry.id} />

          <div>
            <Label htmlFor="coverUrl">Cover</Label>
            <input id="coverUrl"
              name="coverUrl"
              className="border border-gray-300 rounded p-1 w-full"
              defaultValue={entry.coverUrl ?? ""}
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <input id="title"
              name="title"
              className="border border-grey-300 rounded p-1 w-full"
              defaultValue={entry.title ?? ""}
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <input id="author"
              name="author"
              className="border border-grey-300 rounded p-1 w-full"
              defaultValue={entry.author ?? ""}
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="url">URL</Label>
            <input id="url"
              name="url"
              className="border border-grey-300 rounded p-1 w-full"
              defaultValue={entry.url ?? ""}
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              name="notes"
              className="border border-gray-300 rounded p-3 w-full resize-none"
              defaultValue={entry.notes ?? ""}
              placeholder="Optional"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={entry.category}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="FANFIC">Fanfic</SelectItem>
                  <SelectItem value="NOVEL">Novel</SelectItem>
                  <SelectItem value="BOOKMARK">Book mark</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <input
              id="tags"
              name="tags"
              className="border border-gray-300 rounded p-1 w-full"
              defaultValue={entry.tags.map(tag => tag.name).join(", ")}
              placeholder="action, romance, isekai"
            />
          </div>

          <div>
            <Label htmlFor="status">Status (Optional)</Label>
            <Select name="status" defaultValue={entry.status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status (Optional)</SelectLabel>
                  <SelectItem value="READING">Reading</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="DROPPED">Dropped</SelectItem>
                  <SelectItem value="PLAN_TO_READ">Plan to read</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="w-full flex flex-row justify-between items-center">
            <AlertDelete id={entry.id} />
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </div>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}
