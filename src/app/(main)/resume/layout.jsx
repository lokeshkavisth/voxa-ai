import { getUserOnboardingStatus } from "@/actions/user-actions";
import { redirect } from "next/navigation";

export default async function ResumeLayout({ children }) {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return children;
}
