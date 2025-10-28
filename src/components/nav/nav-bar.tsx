import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Squirrel } from "lucide-react";

export function NavBar() {
  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold">
            <Squirrel className="inline-block mb-1 mr-1 h-6 w-6 text-cyan-600" />
            ThatWebThing
          </Link>
          <div className="h-12 border-2 ml-2"></div>
          <Link href="/tryout-ui" className="ml-4 font-normal hover:underline">
            Try Out
          </Link>
          <div className="h-12 border-2 ml-2"></div>
          <Link href="/guovno" className="ml-4 font-normal hover:underline">
            Doesn't exist
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button asChild variant={"outline"}>
                <Link href="/signin">Sign In</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button asChild variant={"secondary"}>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
