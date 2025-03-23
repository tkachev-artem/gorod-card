export const AuthGridConfig = {
    container: "flex min-h-screen flex-col items-center justify-center p-4 sm:p-6",
};

export const HeaderConfig = {
    container: "flex flex-col gap-4 mx-auto mb-6 items-center justify-center w-full max-w-xs sm:max-w-md",
};

export const BodyConfig = {

    container: "w-full max-w-xs sm:max-w-md flex flex-col gap-4 mx-auto items-center justify-center",

    info: {
        heading: "С возвращением!",
        text1: "Пройдите авторизацию, чтобы получить доступ",
        text2: "ко всем возможностям карты горожанина!",
    },

    emailForm: {
        placeholder: "Email",
        type: "email",
    },

    passwordForm: {
        placeholder: "Пароль",
        type: "password",
    },

    button: {
        text: "Войти",
        type: "submit",
        color: "bg-blue-100",
        hoverColor: "hover:bg-blue-300",
        textColor: "text-blue-900",
        borderColor: "border-blue-300",
    },

    link: {
        text: "Нет аккаунта?",
        href: "/signup",
        className: "text-gray-500 text-sm font-medium underline mt-2",
    },
};

