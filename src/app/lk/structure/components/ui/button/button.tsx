import { useRouter } from "next/navigation";

interface ButtonProps {
    text: string;
    onClick?: () => void;  
    goto?: string;
    className?: string;
}

const buttonStyle = "w-full xs:w-auto bg-gray-100 text-gray-900 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200 text-sm sm:text-base transition-colors";

export function Button({ text, onClick, goto, className }: ButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (goto) {
            router.push(goto);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={className ? `${buttonStyle} ${className}` : buttonStyle}
            type="button"
        >
            {text}
        </button>
    );
} 