// src/utils/firebaseError.ts
import { FirebaseError } from "firebase/app";
import { toastError } from "./toasts";

const firebaseErrorMessages: Record<string, string> = {
  "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
  "auth/email-already-in-use": "O e-mail já está em uso.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/wrong-password": "Senha incorreta.",
  "auth/user-not-found": "Usuário não encontrado.",
  "auth/user-disabled": "Usuário desativado.",
  "auth/too-many-requests": "Muitas solicitações. Tente novamente mais tarde.",
  "auth/operation-not-allowed": "Operação não permitida.",
  "auth/invalid-credential": "Dados de autenticação inválidos.",
};

export function handleFirebaseError(error: unknown) {
  if (error instanceof FirebaseError) {
    const message = firebaseErrorMessages[error.code] || "Erro desconhecido.";
    toastError("ERRO!", message, "bottom-right");
  } else if (error instanceof Error) {
    toastError("ERRO!", error.message, "bottom-right");
  } else {
    toastError("ERRO!", "Erro desconhecido.", "bottom-right");
  }
}
