"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

// check if user is already in the db if not create new user
export async function checkUser() {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await prisma.user.create({
      data: {
        clerkUserId: user.id,
        displayName: user.fullName,
        imageUrl: user.imageUrl,
        email: user.primaryEmailAddress.emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
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
          },
        });

        // if not industry insight create new
        if (!industryInsight) {
          industryInsight = await prisma.industryInsight.create({
            data: {
              industry: data.industry,
              salaryRanges: [],
              growthRate: 0,
              demandLevel: "MEDIUM",
              topSkills: [],
              marketOutlook: "NEUTRAL",
              keyTrends: [],
              recommendedSkills: [],
              // update every week at midnight from now
              nextUpdate: new Date(
                new Date().setHours(0, 0, 0, 0) + 7 * 24 * 60 * 60 * 1000
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
    return result.user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
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
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to check onboarding status");
  }
}
