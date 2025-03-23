import Image from "next/image";
import Link from "next/link";

export const LogoGrid = {
    logo: {
        src: "/logo.png",
        alt: "Карта горожанина",
        width: 84,
        height: 40,
    },
};

export function Logo() {
    return (
        <Link href="/" className="flex items-center justify-center">
             <Image 
                src={LogoGrid.logo.src} 
                alt={LogoGrid.logo.alt} 
                width={LogoGrid.logo.width} 
                height={LogoGrid.logo.height}
                className="w-16 h-16 sm:w-20 sm:h-20"
                priority
             />
        </Link>
    );
} 