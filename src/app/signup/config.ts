export const SignupGridConfig = {
    container: "flex min-h-screen flex-col items-center justify-center p-4 sm:p-6",
};

export const HeaderConfig = {
    container: "flex flex-col gap-4 mx-auto mb-6 items-center justify-center w-full max-w-xs sm:max-w-md",
};

export const BodyConfig = {

    container: "w-full max-w-xs sm:max-w-md flex flex-col gap-4 mx-auto items-center justify-center",

    info: {
        heading: "Приветствуем!",
        text1: "Пройдите регистрацию, чтобы получить доступ",
        text2: "ко всем возможностям карты горожанина!",
    },

    surnameForm: {
        placeholder: "Фамилия",
        type: "text",
    },

    nameForm: {
        placeholder: "Имя",
        type: "text",
    },

    emailForm: {
        placeholder: "Email",
        type: "email",
    },

    button: {
        text: "Зарегистрироваться",
        type: "submit",
        color: "bg-green-100",
        hoverColor: "hover:bg-green-300",
        textColor: "text-green-900",
        borderColor: "border-green-300",
    },

    link: {
        text: "Уже есть аккаунт?",
        href: "/auth",
        className: "text-gray-500 text-sm font-medium underline mt-2",
    },
};

