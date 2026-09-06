import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
};

export function PhotoFrame({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
  children,
}: Props) {
  return (
    <figure className={`photo-frame ${className}`.trim()}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      {children}
    </figure>
  );
}
