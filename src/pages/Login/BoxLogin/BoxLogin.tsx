import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { handleFirebaseError } from "@/lib/firebaseError";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail inválido"),
  senha: z.string().min(1, "Senha obrigatória"),
});

const BoxLogin = () => {
  const login = useLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login.mutateAsync(values);
      navigate("/cardapio");
    } catch (error) {
      console.log(error);
      handleFirebaseError(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-3 flex flex-col items-center justify-center w-3/4"
      >
        <h1 className={cn("font-bold font-title text-3xl text-contrast")}>
          LOGIN
        </h1>
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
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
          className="w-full bg-contrast hover:bg-darkest transition-all duration-150"
          disabled={login.isPending}
        >
          {login.isPending ? "Entrando..." : "Entrar"}
        </Button>

        <p className="text-sm text-darkest/50 mt-5">
          Quer testar sem se cadastrar?{" "}
          <span
            className="text-contrast cursor-pointer"
            onClick={() => {
              form.setValue("email", "joao@gmail.com");
              form.setValue("senha", "123123");
              form.handleSubmit(onSubmit)();
            }}
          >
            Clique aqui.
          </span>
        </p>
      </form>
    </Form>
  );
};

export default BoxLogin;
