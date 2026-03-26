"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  })

  if (existing) {
    return { error: "An account with this email already exists." }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  return { success: true }
}
