"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export const CustomImageWithBlur = ({ src, alt, className, height, width }) => {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      height={height || 1200}
      width={width || 1200}
      onLoad={() => setImageLoading(false)}
      className={cn("", className, isImageLoading ? "blur" : "remove-blur")}
    />
  );
};
