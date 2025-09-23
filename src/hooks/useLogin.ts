import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

type UsuarioAcesso = {
  email: string;
  senha: string;
};

const auth = getAuth();

export function useLogin() {
  const login = useMutation<any, any, UsuarioAcesso>({
    mutationFn: async (usuarioAcesso: UsuarioAcesso) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        usuarioAcesso.email,
        usuarioAcesso.senha
      );
      return userCredential.user;
    },
  });

  return login;
}
