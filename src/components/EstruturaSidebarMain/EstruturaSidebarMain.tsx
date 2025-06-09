import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router";
import { AppSideBarMenu } from "../AppSideBarMenu/AppSideBarMenu";

export function EstruturaSidebarMain() {
  return (
    <SidebarProvider>
      <AppSideBarMenu />
      <SidebarInset className={cn("relative")}>
        <SidebarTrigger size={"lg"} className={cn("absolute top-4 left-4 bg-light-base text-contrast hover:bg-contrast hover:text-light-base transition-all")} />
        <main
          className={cn(
            "w-full h-screen bg-[url('./assets/bgImage.svg')] bg-cover"
          )}
        >
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
