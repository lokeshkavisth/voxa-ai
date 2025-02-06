import Link from "next/link";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ChevronUpIcon,
  FileTextIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  PenBoxIcon,
  StarsIcon,
} from "lucide-react";

const Header = () => {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <MainNav />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center gap-2">
            <SignedIn>
              <Button variant="outline">
                <LayoutDashboardIcon className="size-4" />
                <span>Industry Insights</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <StarsIcon />
                    <span>Explore Tools</span>
                    <ChevronUpIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href={"/build-resume"}
                      className="flex items-center gap-2"
                    >
                      <FileTextIcon className="size-4" />
                      <span>Build Resume</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={"/build-cover-letter"}
                      className="flex items-center gap-2"
                    >
                      <PenBoxIcon className="size-4" />
                      <span>Build Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={"/interview-prepration"}
                      className="flex items-center gap-2"
                    >
                      <GraduationCapIcon className="size-4" />
                      <span>Interview Prepration</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </SignedIn>
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
