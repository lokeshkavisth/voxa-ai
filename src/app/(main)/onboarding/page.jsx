import { checkUser, getUserOnboardingStatus } from "@/actions/user-actions";
import OnboardingForm from "@/components/onboarding-form";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";
import React from "react";

const Onboarding = async () => {
  await checkUser();
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/insights");
  }
  return <OnboardingForm industries={industries} />;
};

export default Onboarding;
