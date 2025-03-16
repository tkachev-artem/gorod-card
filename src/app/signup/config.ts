export const SignupGridConfig = {
    container: "flex min-h-screen flex-col items-center justify-center sm:mt-0 md:mt-0 lg:mt-0 xl:-mt-20 2xl:-mt-40 3xl:-mt-60",
};

export const HeaderConfig = {
    container: "flex flex-col gap-4 mx-auto my-6 items-center justify-center",
};

export const BodyConfig = {

    container: "w-full max-w-md flex flex-col gap-4 mx-auto my-4 items-center justify-center",

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
        className: "text-gray-500 text-sm font-medium underline",
    },
};

