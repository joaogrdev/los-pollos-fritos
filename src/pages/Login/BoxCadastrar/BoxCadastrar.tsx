import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCadastroUsuario } from "@/hooks/useCadastroUsuario";
import { useCriarPedido } from "@/hooks/useCriarPedido";
import { handleFirebaseError } from "@/lib/firebaseError";
import { toastSuccess } from "@/lib/toasts";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  sobrenome: z.string().min(1, "Sobrenome obrigatório"),
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail inválido"),
  senha: z.string().min(1, "Senha obrigatória"),
});

const BoxCadastrar = () => {
  const navigate = useNavigate();
  const cadastrarUsuario = useCadastroUsuario();
  const criarPedido = useCriarPedido();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await cadastrarUsuario.mutateAsync(values);
      try {
        await criarPedido.mutateAsync({});
        toastSuccess(
          "SUCESSO!",
          "Usuário cadastrado com sucesso. Fazendo login...",
          "bottom-right"
        );
        setTimeout(() => navigate("/cardapio"), 2500);
      } catch (error) {
        console.log(error);
        handleFirebaseError(error);
      }
    } catch (error: any) {
      console.log(error);
      handleFirebaseError(error);
    } finally {
      form.clearErrors();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-3 flex flex-col items-center justify-center w-3/4"
      >
        <h1 className={cn("font-bold font-title text-3xl text-contrast")}>
          CADASTRO
        </h1>

        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} placeholder="Nome" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sobrenome"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} placeholder="Sobrenome" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} placeholder="E-mail" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Senha"
                    type={showPassword ? "text" : "password"}
                  />
                  {showPassword ? (
                    <Eye
                      className="absolute w-5 right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-115 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeClosed
                      className="absolute w-5 right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-115 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-contrast hover:bg-contrast/75"
          disabled={cadastrarUsuario.isPending}
        >
          {cadastrarUsuario.isPending ? "Criando..." : "Criar"}
        </Button>
      </form>
    </Form>
  );
};

export default BoxCadastrar;
