import { useState } from "react";
import { cn } from "@/lib/utils";

interface GridImageProps {
  src: string;
  alt: string;
  wrapperClass?: string;
  imageClass?: string;
  imgFallback: string;
}

const GridImage = ({
  src,
  alt,
  wrapperClass = "",
  imageClass = "",
  imgFallback,
}: GridImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden bg-darkest/15", wrapperClass)}
      style={{ minHeight: "100px" }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          imageClass,
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        onError={(e) => (e.currentTarget.src = imgFallback)}
      />
      {!loaded && <div className="absolute inset-0 animate-pulse"></div>}
    </div>
  );
};

export default GridImage;
