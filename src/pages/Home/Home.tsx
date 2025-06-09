import { cn } from "@/lib/utils";
import bandeiraModularGrid from "../../assets/bandeiraModularGrid.jpg";
import polloModularGrid from "../../assets/polloModularGrid.jpg";
import vasosModularGrid from "../../assets/vasosModularGrid.jpg";
import burgerModularGrid from "../../assets/burgerModularGrid.jpg";

const Home = () => {
  return (
    <section className={cn("h-full w-full px-10 sm:px-20 py-15")}>
      <div
        className={cn(
          "grid grid-cols-4 laptop:grid-cols-5 grid-rows-5 gap-0 h-full w-full"
        )}
      >
        <div className={cn("col-span-2 row-span-2 col-start-1 row-start-4")}>
          <img
            src={bandeiraModularGrid}
            alt="Imagem Bandeira México"
            className={cn("w-full h-full object-cover")}
          />
        </div>
        <div className={cn("col-span-2 row-span-2 col-start-3 row-start-4")}>
          <img
            src={polloModularGrid}
            alt="Imagem Frango Mexicano"
            className={cn("w-full h-full object-cover")}
          />
        </div>

        <div
          className={cn(
            "col-span-4 col-start-1 sm:col-span-3 sm:col-start-2 row-span-2 row-start-1 bg-light-base w-full py-5 px-10 flex flex-col justify-center items-center gap-3 relative border-2 border-lightest/0"
          )}
        >
          <div className={cn("flex flex-col items-center gap-2")}>
            <p
              className={cn(
                "text-darkest whitespace-nowrap tablet:whitespace-normal text-base laptop:text-lg desktop:text-2xl font-bold font-title text-center"
              )}
            >
              O ORIGINAL, DIRETO DO MÉXICO
            </p>
            <p
              className={cn(
                "font-black whitespace-nowrap tablet:whitespace-normal text-contrast text-4xl tablet:text-5xl laptop:text-5xl desktop:text-6xl font-title text-center"
              )}
            >
              POLLO FRITO!
            </p>
          </div>
        </div>

        <div
          className={cn(
            "col-start-1 sm:col-start-2 row-span-1 row-start-3 bg-green-800 text-lightest p-5 flex justify-center items-center hover:bg-green-700 cursor-pointer transition-all"
          )}
        >
          <p
            className={cn(
              "text-lightest font-semibold font-title text-base laptop:text-lg text-center"
            )}
          >
            PEDIR AGORA
          </p>
        </div>

        <div
          className={cn(
            "col-span-2 col-start-2 sm:col-start-3 sm:col-span-1 row-start-3 bg-lightest text-lightest p-5 flex justify-center items-center"
          )}
        >
          <img
            src="https://img.icons8.com/?size=60&id=RaK23TTVVTlT&format=png&color=ECC94B"
            alt="Ícone Mexicano"
          />
        </div>

        <div
          className={cn(
            "row-span-1 col-start-4 row-start-3 bg-contrast text-lightest p-5 flex flex-col justify-center items-center gap-1"
          )}
        >
          <p className={cn("text-lightest font-semibold font-title text-sm")}>
            CONTATOS
          </p>
          <div className={cn("flex items-center justify-center gap-2")}>
            <img
              src="https://img.icons8.com/?size=25&id=106562&format=png&color=ffffff"
              alt="Ícone GitHub"
              className={cn("hover:scale-115 cursor-pointer")}
              title="GitHub"
            />
            <img
              src="https://img.icons8.com/?size=25&id=8808&format=png&color=ffffff"
              alt="Ícone Linkedin"
              className={cn("hover:scale-115 cursor-pointer")}
              title="Linkedin"
            />
          </div>
        </div>

        <div
          className={cn("hidden sm:block row-span-3 col-start-1 row-start-1")}
        >
          <img
            src={burgerModularGrid}
            alt="Imagem Hamburguer Mexicano"
            className={cn("w-full h-full object-cover")}
          />
        </div>

        <div
          className={cn(
            "hidden laptop:block row-span-5 col-start-5 row-start-1"
          )}
        >
          <img
            src={vasosModularGrid}
            alt="Imagem Vasos Mexicanos"
            className={cn("w-full h-full object-cover")}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
