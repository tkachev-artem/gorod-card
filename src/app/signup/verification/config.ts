export const VerificationGridConfig = {
    container: "flex min-h-screen flex-col items-center justify-center sm:mt-0 md:mt-0 lg:mt-0 xl:-mt-20 2xl:-mt-40 3xl:-mt-60",
};

export const HeaderConfig= {
    container: "flex flex-col gap-4 mx-auto my-4 items-center justify-center",
};

export const BodyConfig = {
    container: "flex flex-col gap-8 mx-auto my-6 items-center justify-center",

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
