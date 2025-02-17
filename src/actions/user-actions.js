"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAiResponse } from "./ai-actions";
import { promptToGenInsights } from "@/data/prompts";

// check if user is already in the db if not create new user
export async function checkUser() {
  try {
    const user = await currentUser();

    if (!user) return null;

    let existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          clerkUserId: user.id,
          displayName: user.fullName,
          imageUrl: user.imageUrl,
          email: user.primaryEmailAddress.emailAddress,
        },
      });
    }

    return existingUser;
  } catch (error) {
    console.error("Error checking/creating user:", error);
    return null;
  }
}

export async function updateUser(data) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  // find the user
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        // find if the industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
            subIndustry: data.subIndustry,
          },
        });

        // if not industry insight create new
        if (!industryInsight) {
          const prompt = promptToGenInsights(data.industry, data.subIndustry);
          const insights = await generateAiResponse(prompt);

          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              subIndustry: data.subIndustry,
              ...insights,
              demandLevel: insights.demandLevel.toUpperCase(),
              marketOutlook: insights.marketOutlook.toUpperCase(),
              nextUpdate: new Date(
                new Date().setHours(0, 0, 0, 0) + 7 * 24 * 60 * 60 * 1000 // update every week at midnight from now
              ),
            },
          });
        }

        // update the user
        const updatedUser = await tx.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            industry: data.industry,
            subIndustry: data.subIndustry,
            bio: data.bio,
            experience: data.experience,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000,
      }
    );
    revalidatePath("/");
    return result.updatedUser;
  } catch (err) {
    console.error("Error creating user:", err.message);
    throw new Error(`Failed to create user: ${err.message}`);
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
        // subIndustry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (err) {
    console.error("Error creating user:", err.message);
    throw new Error(`Failed to check onboarding status: ${err.message}`);
  }
}

export async function getUserDetails() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    return existingUser;
  } catch (err) {
    console.error("Error creating user:", err.message);
    throw new Error(`Failed to get user details: ${err.message}`);
  }
}
