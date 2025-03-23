import { ChangeEvent } from 'react';

export interface FormConfig {
    placeholder: string;
    type: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormConfig = {
    container: "w-full p-3 text-start rounded-md border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm sm:text-base",
    containerInput: "w-full",
}

export function Form({placeholder, type, value, onChange}: FormConfig) {
    return (
        <div className={FormConfig.containerInput}>
            <input 
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={FormConfig.container}
                autoComplete={type === "password" ? "current-password" : type === "email" ? "email" : "off"}
            />
        </div>
    )
} 