export const AuthGridConfig = {
    container: "flex min-h-screen flex-col items-center justify-center sm:mt-0 md:mt-0 lg:mt-0 xl:-mt-20 2xl:-mt-40 3xl:-mt-60",
};

export const HeaderConfig = {
    container: "flex flex-col gap-4 mx-auto my-6 items-center justify-center",
};

export const BodyConfig = {

    container: "w-full max-w-md flex flex-col gap-4 mx-auto my-4 items-center justify-center",

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
        className: "text-gray-500 text-sm font-medium underline",
    },
};

