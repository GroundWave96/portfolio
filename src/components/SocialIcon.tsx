import Image from "next/image";

interface SocialIconProps {
  name: "github" | "linkedin" | "whatsapp"; 
  className?: string;
}

export function SocialIcon({ name, className }: SocialIconProps) {
  return (
    <Image 
      src={`/${name}.svg`} 
      alt={name} 
      width={20} 
      height={20} 
      className={className} 
    />
  );
}