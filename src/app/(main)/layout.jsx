import { checkUser } from "@/actions/user-actions";

const MainLayout = async ({ children }) => {
  await checkUser();

  return <div className="container mx-auto">{children}</div>;
};

export default MainLayout;
