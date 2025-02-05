import { getUserOnboardingStatus } from "@/actions/user-actions";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
