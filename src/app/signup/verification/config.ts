export const VerificationGridConfig = {
    container: "flex min-h-screen flex-col items-center justify-center p-4 sm:p-6",
};

export const HeaderConfig= {
    container: "flex flex-col gap-4 mx-auto mb-6 items-center justify-center w-full max-w-xs sm:max-w-md",
};

export const BodyConfig = {
    container: "w-full max-w-xs sm:max-w-md flex flex-col gap-6 mx-auto items-center justify-center",

    info: {
        heading: "Введите пин-код",
        text: "На вашу почту был отправлен код подтверждения!",
    },

    button: {
        text: "Продолжить",
        type: "button" as "button" | "submit" | "reset",
        color: "bg-blue-100",
        hoverColor: "hover:bg-blue-400",
        textColor: "text-black",
        borderColor: "border-blue-400",
        onClick: () => {},
        disabled: false,
    },
};
