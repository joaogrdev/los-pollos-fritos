import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import logo from "../../assets/logo.png";

const data = [
  { title: "Home", url: "/", isActive: true },
  { title: "Cardápio", url: "/cardapio", isActive: false },
  { title: "Carrinho", url: "/carrinho", isActive: false },
  { title: "Sobre", url: "/sobre", isActive: false },
];

export function AppSideBarMenu() {
  const isActive = window.location.pathname;
  const token = false;

  return (
    <Sidebar className={cn("border-none")}>
      <SidebarHeader className={cn("flex flex-col gap-2 items-center mb-6")}>
        <img src={logo} alt="Logo" className={cn("w-1/2")} />
      </SidebarHeader>

      <SidebarContent className={cn("gap-0")}>
        {data.map((item) => (
          <SidebarMenu key={item.title}>
            <SidebarMenuItem key={item.title} className={cn("relative")}>
              <SidebarMenuButton
                className={cn(
                  "rounded-none text-lg h-13 flex justify-center font-title font-semibold data-[active=true]:bg-dark-base data-[active=true]:text-contrast data-[active=true]:font-semibold"
                )}
                size={"lg"}
                asChild
                isActive={item.url === isActive}
              >
                <a href={item.url}>{item.title}</a>
              </SidebarMenuButton>
              {item.title === "Carrinho" && (
                <span
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 right-3 inline-flex items-center justify-center w-fit px-2 py-1 rounded-md bg-contrast text-lightest text-xs font-semibold"
                  )}
                >
                  5
                </span>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>

      <SidebarFooter className={cn("p-0")}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(
                "rounded-none text-lg h-10 flex justify-center font-title font-semibold data-[active=true]:bg-dark-base data-[active=true]:text-contrast data-[active=true]:font-semibold"
              )}
            >
              {token ? "Minha Conta" : "Entrar"}
            </SidebarMenuButton>
          </SidebarMenuItem>
          {token && (
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn(
                  "rounded-none text-lg h-10 flex justify-center font-title font-semibold data-[active=true]:bg-dark-base data-[active=true]:text-contrast data-[active=true]:font-semibold"
                )}
              >
                Sair
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
