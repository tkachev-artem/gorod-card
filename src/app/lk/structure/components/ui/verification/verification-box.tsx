export interface VerificationBoxProps {
    pin: string[];
    setPin: (pin: string[]) => void;
    setIsComplete: (isComplete: boolean) => void;
}

export function VerificationBox({ pin, setPin, setIsComplete }: VerificationBoxProps) {
    const handleChange = (index: number, value: string) => {
        const newPin = [...pin];
        // Убеждаемся, что вводятся только цифры
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        newPin[index] = sanitizedValue;
        setPin(newPin);
        setIsComplete(newPin.every(digit => digit !== ''));

        // Автоматическое переключение на следующее поле
        if (sanitizedValue && index < 5) {
            const nextInput = document.querySelector(
                `input[name="pin-${index + 1}"]`
            ) as HTMLInputElement;
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Переход к предыдущему полю при нажатии Backspace
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            const prevInput = document.querySelector(
                `input[name="pin-${index - 1}"]`
            ) as HTMLInputElement;
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    return (
        <div className="flex gap-2 sm:gap-4 justify-center w-full">
            {[...Array(6)].map((_, index) => (
                <input
                    key={index}
                    name={`pin-${index}`}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={pin[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-center border rounded-lg text-base sm:text-xl 
                             focus:outline-none focus:ring-2 focus:ring-gray-400 
                             transition-all duration-200"
                />
            ))}
        </div>
    );
} 