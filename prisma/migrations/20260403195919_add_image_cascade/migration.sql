-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_entryId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
