export interface BigButtonConfig {
    text: string;
    type: "button" | "submit" | "reset";
    color: string;
    hoverColor: string;
    textColor: string;
    borderColor: string;
    onClick?: () => void;
    disabled?: boolean;
}

export function BigButton({text, type, color, hoverColor, textColor, borderColor, onClick, disabled}: BigButtonConfig) {
    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full ${color} ${hoverColor} ${textColor} border ${borderColor} rounded-md px-4 py-3 text-base font-semibold transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {text}
        </button>
    )
} 