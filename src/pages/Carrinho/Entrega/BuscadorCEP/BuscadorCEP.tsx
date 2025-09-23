import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Ajuste conforme seu setup
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useEnderecoPedido } from "@/hooks/useEnderecoPedido";
import { handleFirebaseError } from "@/lib/firebaseError";

const formSchema = z.object({
  cep: z
    .string()
    .nonempty("CEP obrigatório")
    .min(8, "CEP deve ter 8 caracteres")
    .max(8, "CEP deve ter 8 caracteres"),
});

interface BuscadorCEPProps {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const BuscadorCEP = () => {
  const { alterarEnderecoPedido } = useEnderecoPedido();

  const [cepResult, setCepResult] = useState<BuscadorCEPProps | null>(null);
  const [enderecoSaved, setEnderecoSaved] = useState<boolean>(false);
  const [dadosAdicionaisEndereco, setDadosAdicionaisEndereco] = useState({
    numero: "",
    complemento: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cep: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const CEP = values.cep.replace(/[^0-9]/g, "");
    setCepResult(null);
    setEnderecoSaved(false);
    fetch(`https://viacep.com.br/ws/${CEP}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          form.setError("cep", {
            message: "CEP inválido",
          });
          return;
        }
        setCepResult({
          cep: data.cep,
          logradouro: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar CEP:", error);
        setCepResult(null);
      });
  };

  const handleSalvarEndereco = async (tipo: string) => {
    try {
      await alterarEnderecoPedido.mutateAsync(
        tipo === "adicionar"
          ? `${cepResult?.logradouro}, ${dadosAdicionaisEndereco.numero}, ${cepResult?.bairro} (${dadosAdicionaisEndereco.complemento}) - ${cepResult?.localidade}/${cepResult?.uf}`
          : ""
      );
      if (tipo === "adicionar") {
        setEnderecoSaved(true);
      } else {
        form.reset();
        setEnderecoSaved(false);
        setCepResult(null);
        setDadosAdicionaisEndereco({ numero: "", complemento: "" });
      }
    } catch (error) {
      console.log(error);
      handleFirebaseError(error);
    }
  };

  return (
    <>
      {cepResult ? (
        <div className="py-2 px-4 gap-2 flex flex-col">
          <div className={cn("flex items-center gap-2")}>
            <Trash
              className="w-4 h-4 cursor-pointer text-contrast hover:scale-110"
              onClick={() => handleSalvarEndereco("remover")}
            />
            <p>CEP: {cepResult.cep}</p>
          </div>
          <p className="font-semibold">
            {cepResult.logradouro}, {cepResult.bairro} - {cepResult.localidade}/
            {cepResult.uf}
          </p>
          <div className={cn("grid grid-cols-1 tablet:grid-cols-2 gap-2")}>
            <fieldset>
              <legend className="text-xs text-muted-foreground px-1">
                Número *
              </legend>
              <Input
                type="number"
                value={dadosAdicionaisEndereco.numero}
                disabled={enderecoSaved}
                onChange={(e) =>
                  setDadosAdicionaisEndereco({
                    ...dadosAdicionaisEndereco,
                    numero: e.target.value,
                  })
                }
              />
            </fieldset>
            <fieldset>
              <legend className="text-xs text-muted-foreground px-1">
                Complemento
              </legend>
              <Input
                type="text"
                value={dadosAdicionaisEndereco.complemento}
                disabled={enderecoSaved}
                onChange={(e) =>
                  setDadosAdicionaisEndereco({
                    ...dadosAdicionaisEndereco,
                    complemento: e.target.value,
                  })
                }
              />
            </fieldset>
          </div>

          {enderecoSaved ? (
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Endereço salvo com sucesso!
              </p>
              <p className="text-sm font-semibold">
                Previsão de Entrega: 30-50min
              </p>
            </div>
          ) : (
            <Button
              className="w-full bg-contrast hover:bg-contrast/75"
              onClick={() => handleSalvarEndereco("adicionar")}
            >
              Salvar endereço
            </Button>
          )}
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-3 gap-2 flex flex-col justify-between flex-1"
          >
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={8} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-contrast hover:bg-contrast/75"
            >
              Buscar
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default BuscadorCEP;
