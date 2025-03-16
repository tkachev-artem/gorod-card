import { useRouter } from "next/navigation";

interface ButtonProps {
    text: string;
    onClick?: () => void;  
    goto?: string;
}

const buttonStyle = "bg-gray-100 text-gray-900 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200";

export function Button({ text, onClick, goto }: ButtonProps) {
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
            className={buttonStyle}
        >
            {text}
        </button>
    );
}