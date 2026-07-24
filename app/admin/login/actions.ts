"use server";

import { redirect } from "next/navigation";
import { verifyPassword, setSessionCookie, clearSessionCookie } from "@/lib/auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }

  await setSessionCookie();
  redirect("/admin");
}

export async function logout() {
  await clearSessionCookie();
  redirect("/admin/login");
}
