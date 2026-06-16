"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getOrCreateIndustryInsight } from "@/lib/industry-insights";
import { onboardingSchema } from "@/lib/schemas/onboarding-schema";

export async function checkUser() {
  try {
    const user = await currentUser();

    if (!user) return null;

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.error("User has no primary email address");
      return null;
    }

    return await prisma.user.upsert({
      where: { clerkUserId: user.id },
      update: {
        displayName: user.fullName,
        imageUrl: user.imageUrl,
      },
      create: {
        clerkUserId: user.id,
        displayName: user.fullName,
        imageUrl: user.imageUrl,
        email,
      },
    });
  } catch (error) {
    console.error("Error checking/creating user:", error);
    return null;
  }
}

export async function updateUser(data) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const parsed = onboardingSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message || "Invalid onboarding data");
  }

  const formData = parsed.data;
  const industry = formData.industry.split(" ").join("-");
  const subIndustry = formData.subIndustry.split(" ").join("-");

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    await getOrCreateIndustryInsight(industry, subIndustry);

    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        industry,
        subIndustry,
        bio: formData.bio,
        experience: formData.experience,
        skills: formData.skills,
      },
    });

    revalidatePath("/");
    revalidatePath("/insights");
    return updatedUser;
  } catch (err) {
    console.error("Error updating user:", err.message);
    throw new Error(`Failed to update user: ${err.message}`);
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      subIndustry: true,
    },
  });

  if (!user) {
    return { isOnboarded: false };
  }

  return {
    isOnboarded: !!(user.industry && user.subIndustry),
  };
}

export async function getUserDetails() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) throw new Error("User not found");

  return existingUser;
}
