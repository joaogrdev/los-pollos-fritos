import { cn } from "@/lib/utils";
import { useState } from "react";
import BuscadorCEP from "./BuscadorCEP/BuscadorCEP";

const Entrega = () => {
  const [tipo, setTipo] = useState("entrega");

  return (
    <section
      className={cn(
        "flex flex-col gap-2 bg-light-base/50 rounded-b-md rounded-br-none "
      )}
    >
      <div className="grid grid-cols-2 w-full">
        <p
          className={cn(
            "flex items-center font-title font-semibold justify-center cursor-pointer transition-all py-1",
            tipo === "entrega"
              ? "bg-dark-base"
              : "bg-light-base hover:bg-muted"
          )}
          onClick={() => setTipo("entrega")}
        >
          Entrega
        </p>
        <p
          className={cn(
            "flex items-center font-title font-semibold justify-center cursor-pointer transition-all",
            tipo === "retirada"
              ? "bg-dark-base"
              : "bg-light-base hover:bg-muted"
          )}
          onClick={() => setTipo("retirada")}
        >
          Retirada
        </p>
      </div>
      {tipo === "entrega" ? (
        <BuscadorCEP />
      ) : (
        <div className="py-2 px-4">
          <p className="text-lg">Los Pollos Fritos S.A</p>
          <p className="font-semibold mb-2">
            Av. Fulano de Tal,123, Centro - São Paulo/ SP
          </p>
          <p className="text-sm">Aberto de segunda a sexta das 10h a 18h</p>
          <p className="text-sm">(11) 99999-9999</p>
        </div>
      )}
    </section>
  );
};

export default Entrega;
