import Image from "next/image";

export function Brand({ inverse = false, size = "normal" }: { inverse?: boolean; size?: "normal" | "large" }) {
  return <Image className={`brand-mark brand-mark--${size}`} src={`/images/brand/logo-${inverse ? "white" : "maroon"}.png`} width={400} height={349} alt="Deoluxe" />;
}
