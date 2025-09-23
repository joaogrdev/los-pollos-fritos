import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BoxCadastrar from "./BoxCadastrar/BoxCadastrar";
import BoxLogin from "./BoxLogin/BoxLogin";
import image from "../../assets/bgSideMenu.svg";


const Login = () => {
  const [etapa, setEtapa] = useState("login");
  
  return (
    <section className="grid grid-cols-1 grid-rows-2 tablet:grid-cols-2 tablet:grid-rows-1 w-full h-fit tablet:h-full relative">
      <div className="flex flex-col items-center justify-center bg-light-base/50 rounded-l-xl p-5">
        <BoxLogin />
      </div>
      <div className="flex flex-col items-center gap-4 justify-center bg-light-base/50 rounded-r-xl p-5">
        <BoxCadastrar />
      </div>
      <div
      style={{ backgroundImage: `url(${image})` }}
        className={cn(
          "absolute  bg-light-base w-full h-1/2 tablet:w-1/2 tablet:h-full tablet:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col items-center gap-4 justify-center bg-repeat bg-contain",
          etapa === "login"
            ? "translate-y-full rounded-b-xl tablet:translate-x-full tablet:rounded-r-xl"
            : "translate-y-0 rounded-t-xl tablet:translate-x-0 tablet:rounded-l-xl"
        )}
      >
        {etapa === "login" ? (
          <>
            <h2 className={cn("font-bold font-title text-3xl text-contrast")}>
              CADASTRO
            </h2>
            <p className="text-center text-xl">
              Ainda não tem uma conta?
              <br /> Crie agora e comece a comprar!
            </p>
            <Button
              className={cn(
                "bg-dark-base text-contrast w-1/2 text-lg hover:bg-contrast hover:text-dark-base"
              )}
              onClick={() => setEtapa("cadastro")}
            >
              Criar
            </Button>
          </>
        ) : (
          <>
            <h2 className={cn("font-bold font-title text-3xl text-contrast")}>
              LOGIN
            </h2>
            <p className="text-center text-xl">
              Já tem uma conta?
              <br /> Entre agora e comece a comprar!
            </p>
            <Button
              className={cn(
                "bg-dark-base text-contrast w-1/2 text-lg hover:bg-contrast hover:text-dark-base"
              )}
              onClick={() => setEtapa("login")}
            >
              Entrar
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default Login;
