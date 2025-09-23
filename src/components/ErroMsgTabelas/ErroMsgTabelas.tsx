import { CircleOff } from "lucide-react";

const ErroMsgTabelas = ({ msg }: { msg: string }) => {
  return (
    <p className="flex items-center bg-light-base/50 rounded-md justify-center gap-2 mb-2 py-5 w-full">
      <CircleOff className="w-4 text-contrast" />
      {msg}
    </p>
  );
};

export default ErroMsgTabelas;
