"use client";
import { Button } from "@/components/ui/button"
import { addEntry } from "./actions";
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

export default function AddEntryModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer text-black text-xl p-6 hover:shadow-md transition-shadow">Add Entry</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader> <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>Insert your favourite material here!</DialogDescription>
        </DialogHeader>
        <form action={addEntry} className="space-y-4">

          <div>
            <Label htmlFor="coverUrl">Cover</Label>
            <input id="coverUrl"
              name="coverUrl"
              className="border border-gray-300 rounded p-1 w-full"
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <input id="title"
              name="title"
              className="border border-grey-300 rounded p-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="url">URL</Label>
            <input id="url"
              name="url"
              className="border border-grey-300 rounded p-1 w-full"
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <input id="author"
              name="author"
              className="border border-grey-300 rounded p-1 w-full"
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <input id="notes"
              name="notes"
              className="border border-grey-300 rounded p-1 w-full"
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category">
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
              placeholder="action, romance, isekai"
            />
          </div>


          <div>
            <Label htmlFor="status">Status (Optional)</Label>
            <Select name="status">
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

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}
