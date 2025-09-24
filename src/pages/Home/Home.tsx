import { cn } from "@/lib/utils";
import bandeiraModularGrid from "../../assets/bandeiraModularGrid.webp";
import polloModularGrid from "../../assets/polloModularGrid.webp";
import vasosModularGrid from "../../assets/vasosModularGrid.webp";
import burgerModularGrid from "../../assets/burgerModularGrid.webp";
import GridImage from "./GridImage/GridImage";
import { useNavigate } from "react-router";

const socialIcons = [
  {
    icon: "https://img.icons8.com/?size=25&id=8808&format=png&color=ffffff",
    desc: "Linkedin",
    link: "https://www.linkedin.com/in/joaogrs/",
  },
  {
    icon: "https://img.icons8.com/?size=25&id=106562&format=png&color=ffffff",
    desc: "GitHub",
    link: "https://github.com/joaogrdev",
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className={cn("h-full w-full")}>
      <div
        className={cn(
          "grid grid-cols-4 laptop:grid-cols-5 grid-rows-5 gap-0 h-full w-full"
        )}
      >
        <GridImage
          src="https://i.postimg.cc/nzL93PQW/bandeira-Modular-Grid.webp"
          alt="Imagem Bandeira México"
          wrapperClass="col-span-2 row-span-2 col-start-1 row-start-4 rounded-bl-xl"
          imageClass="rounded-bl-xl"
          imgFallback={bandeiraModularGrid}
        />
        <GridImage
          src="https://i.postimg.cc/3w1DCTWp/pollo-Modular-Grid.webp"
          alt="Imagem Frango Mexicano"
          wrapperClass="col-span-2 row-span-2 col-start-3 row-start-4 rounded-r-xl"
          imageClass="rounded-r-xl"
          imgFallback={polloModularGrid}
        />

        <div
          className={cn(
            "col-span-4 col-start-1 sm:col-span-3 sm:col-start-2 row-span-2 row-start-1 bg-light-base w-full py-5 px-10 flex flex-col justify-center items-center gap-3 relative border-2 border-lightest/0"
          )}
        >
          <h4
            className={cn(
              "text-darkest whitespace-nowrap tablet:whitespace-normal text-base laptop:text-lg desktop:text-2xl font-bold font-title text-center"
            )}
          >
            O ORIGINAL, DIRETO DO MÉXICO
          </h4>
          <h1
            className={cn(
              "font-black whitespace-nowrap tablet:whitespace-normal text-contrast text-4xl tablet:text-5xl laptop:text-5xl desktop:text-6xl font-title text-center"
            )}
          >
            POLLO FRITO!
          </h1>
        </div>

        {/*box com botão de pedido*/}
        <p
          className={cn(
            "text-lightest h-full font-semibold font-title text-base laptop:text-lg text-center col-start-1 sm:col-start-2 row-span-1 row-start-3 bg-green-800 p-5 flex justify-center items-center hover:bg-green-700 cursor-pointer transition-all"
          )}
          onClick={() => navigate("/cardapio")}
        >
          PEDIR AGORA
        </p>

        {/*box com icone de chapeu mexicano*/}
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

        {/*box com contatos*/}
        <div
          className={cn(
            "row-span-1 col-start-4 row-start-3 bg-contrast text-lightest p-5 flex flex-col justify-center items-center gap-1"
          )}
        >
          <p className={cn("text-lightest font-semibold font-title text-sm")}>
            CONTATOS
          </p>
          <div className={cn("flex items-center justify-center gap-2")}>
            {socialIcons.map((item) => (
              <a href={item.link} key={item.desc} target="_blank">
                <img
                  src={item.icon}
                  alt={`Ícone ${item.desc}`}
                  className={cn("fill-contrast hover:scale-115 cursor-pointer")}
                  title={item.desc}
                />
              </a>
            ))}
          </div>
        </div>

        <GridImage
          src="https://i.postimg.cc/MGqQQTZq/burger-Modular-Grid.webp"
          alt="Imagem Hamburguer Mexicano"
          wrapperClass="hidden sm:block row-span-3 col-start-1 row-start-1 rounded-tl-xl"
          imageClass="rounded-tl-xl"
          imgFallback={burgerModularGrid}
        />

        <GridImage
          src="https://i.postimg.cc/XYMFnLTZ/vasos-Modular-Grid.webp"
          alt="Imagem Vasos Mexicanos"
          wrapperClass="hidden laptop:block row-span-5 col-start-5 row-start-1 rounded-r-xl"
          imageClass="rounded-r-xl"
          imgFallback={vasosModularGrid}
        />
      </div>
    </section>
  );
};

export default Home;
