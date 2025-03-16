import Image from "next/image";

export const LogoGrid = {
    logo: {
        src: "/logo.png",
        alt: "logo",
        width: 84,
        height: 40,
    },
};

export function Logo() {
    return (
        <div>
             <Image src={LogoGrid.logo.src} alt={LogoGrid.logo.alt} width={LogoGrid.logo.width} height={LogoGrid.logo.height} />
        </div>
    );
} 