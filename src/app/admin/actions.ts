"use server";

import { revalidatePath } from "next/cache";
import {
  isCorrectPassword,
  isSignedIn,
  signInCookie,
  signOutCookie,
} from "@/lib/adminAuth";
import { clearFlyer, saveFlyer } from "@/lib/specials";

export type FormState = { error?: string; done?: string };

/** Anything over this is rejected; the browser downscales before uploading. */
const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function signIn(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const password = String(formData.get("password") ?? "");

  if (!isCorrectPassword(password)) {
    return { error: "That password didn't work. Please try again." };
  }

  await signInCookie(password);
  revalidatePath("/admin");
  return {};
}

export async function signOut(): Promise<void> {
  await signOutCookie();
  revalidatePath("/admin");
}

export async function publishFlyer(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!(await isSignedIn())) {
    return { error: "You've been signed out. Please enter the password again." };
  }

  const file = formData.get("flyer");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "No photo was chosen. Tap “Choose flyer photo” first." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "That file isn't a photo. Please choose a photo of the flyer." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "That photo is too large. Try taking it again." };
  }

  await saveFlyer(await file.arrayBuffer(), file.type, new Date().toISOString());

  // The homepage caches its rendered output, so tell it to rebuild now.
  revalidatePath("/");
  revalidatePath("/admin");
  return { done: "Your flyer is on the website." };
}

export async function removeFlyer(): Promise<void> {
  if (!(await isSignedIn())) return;

  await clearFlyer();
  revalidatePath("/");
  revalidatePath("/admin");
}
