import { useMutation } from "@tanstack/react-query";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

type Usuario = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
};

const auth = getAuth();

export function useCadastroUsuario() {
  const cadastrarUsuario = useMutation<any, any, Usuario>({
    mutationFn: async (usuario: Usuario) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        usuario.email,
        usuario.senha
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: usuario.nome,
      });
      return user;
    },
  });

  return cadastrarUsuario;
}
