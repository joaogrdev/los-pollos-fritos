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
import { NavLink, useLocation, useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import { handleFirebaseError } from "@/lib/firebaseError";
import { useAuth } from "@/context/AuthContext";
import { useGetCarrinho } from "@/hooks/useGetCarrinho";

const data = [
  { title: "Início", url: "/", isActive: true },
  { title: "Cardápio", url: "/cardapio", isActive: false },
  { title: "Carrinho", url: "/carrinho", isActive: false },
  { title: "Pedidos", url: "/pedidos", isActive: false },
];

export function AppSideBarMenu() {
  const auth = getAuth();
  const navigate = useNavigate();

  const loggedUser = useAuth();
  const menuItens = loggedUser ? data : data.slice(0, 2);

  const location = useLocation();
  const locationWithoutFirstSlash = location.pathname.slice(1);
  let isActive = "";
  if (locationWithoutFirstSlash.includes("/")) {
    isActive = locationWithoutFirstSlash.slice(
      0,
      locationWithoutFirstSlash.indexOf("/")
    );
  } else {
    isActive = locationWithoutFirstSlash;
  }

  const {carrinho} = useGetCarrinho();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  return (
    <Sidebar className={cn("border-none")}>
      <SidebarHeader className={cn("flex flex-col gap-2 items-center mb-6")}>
        <img src={logo} alt="Logo" className={cn("w-1/2")} />
      </SidebarHeader>

      <SidebarContent className={cn("gap-0")}>
        {menuItens.map((item) => (
          <SidebarMenu key={item.title}>
            <SidebarMenuItem key={item.title} className={cn("relative")}>
              <SidebarMenuButton
                className={cn(
                  "rounded-none text-lg h-13 flex justify-center font-title font-semibold data-[active=true]:bg-dark-base data-[active=true]:text-contrast data-[active=true]:font-semibold"
                )}
                size={"lg"}
                asChild
                isActive={isActive === item.url.slice(1)}
              >
                <NavLink to={item.url}>{item.title}</NavLink>
              </SidebarMenuButton>
              {item.title === "Carrinho" && carrinho?.length ? (
                <span
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 right-3 inline-flex items-center justify-center w-fit px-2 py-1 rounded-md bg-contrast text-lightest text-xs font-semibold"
                  )}
                >
                  {carrinho?.length}
                </span>
              ) : null}
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>

      <SidebarFooter className={cn("p-0 h-fit")}>
        <SidebarMenu>
          {loggedUser && (
            <SidebarMenuItem>
              <p className="text-center font-semibold text-contrast/75">
                Olá, {auth.currentUser?.displayName}
              </p>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem className="border-t border-contrast/50">
            <SidebarMenuButton
              className={cn(
                "rounded-none text-lg h-10 flex justify-center font-title font-semibold data-[active=true]:bg-dark-base data-[active=true]:text-contrast data-[active=true]:font-semibold p-0"
              )}
              isActive={isActive === "login"}
            >
              {!loggedUser ? (
                <NavLink
                  className={cn(
                    "font-title flex w-full h-full items-center justify-center"
                  )}
                  to={"/login"}
                >
                  Login
                </NavLink>
              ) : (
                <button
                  className={cn(
                    "font-title flex w-full h-full items-center justify-center"
                  )}
                  onClick={handleLogout}
                >
                  Sair
                </button>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
