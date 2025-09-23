import { cn } from "@/lib/utils";

const GridImage = ({
  src,
  alt,
  wrapperClass,
  imageClass,
}: {
  src: string;
  alt: string;
  wrapperClass: string;
  imageClass?: string;
}) => (
  <div className={cn(wrapperClass)}>
    <img
      src={src}
      alt={alt}
      className={cn("w-full h-full object-cover", imageClass)}
    />
  </div>
);

export default GridImage;
