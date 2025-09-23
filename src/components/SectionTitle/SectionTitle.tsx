import { cn } from "@/lib/utils";
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router";
const SectionTitle = ({
  voltar,
  title,
}: {
  voltar?: boolean;
  title: string;
}) => {
  const navigate = useNavigate();
  return (
    <h1
      className={cn(
        "text-2xl tablet:text-3xl font-semibold font-title text-darkest bg-light-base py-2 px-4 rounded-md flex items-center gap-2 w-full"
      )}
    >
      {voltar && (
        <ArrowLeftCircle
          className={cn(
            "cursor-pointer text-contrast rounded-full hover:scale-115"
          )}
          onClick={() => navigate(-1)}
        >
          <title>Voltar</title>
        </ArrowLeftCircle>
      )}
      {title}
    </h1>
  );
};

export default SectionTitle;
