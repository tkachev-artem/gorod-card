export interface InfoConfig {
    heading: string;
    text1: string;
    text2: string;
}

export const InfoConfig = {
    container: "flex flex-col gap-3 sm:gap-4 items-center justify-center w-full",
    textContainer: "flex flex-col gap-1 sm:gap-2 items-center justify-center w-full",
    heading: "text-center text-gray-900 text-xl sm:text-2xl font-semibold",
    text1: "text-center text-gray-900 text-sm sm:text-base font-medium",
    text2: "text-center text-gray-900 text-sm sm:text-base font-medium",
}

export function Info({heading, text1="", text2=""}: InfoConfig) {
    return (
        <div className={InfoConfig.container}>
            <h1 className={InfoConfig.heading}>{heading}</h1>
            <div className={InfoConfig.textContainer}>
                <p className={InfoConfig.text1}>{text1}</p>
                <p className={InfoConfig.text2}>{text2}</p>
            </div>
        </div>
    )
} 