export const LkConfig = {
    container: "w-full min-h-screen p-3 sm:p-4 md:p-6 bg-white flex flex-col gap-4 sm:gap-6",
    
    header: {
        container: "w-full flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6",
        logo: {
            container: "w-full lg:w-[250px] flex items-center gap-3 sm:gap-4",
            title: "text-black text-sm sm:text-base"
        },
        navigation: {
            container: "w-full overflow-x-auto scrollbar-hide flex-1 flex items-center gap-1 sm:gap-2 py-2",
            activeButton: "px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 flex-shrink-0",
            button: "px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 flex-shrink-0",
            activeText: "text-black text-sm sm:text-base md:text-lg font-semibold",
            text: "text-gray-500 text-sm sm:text-base md:text-lg font-semibold"
        },
        profile: {
            container: "flex items-center gap-3 sm:gap-4 justify-end relative mt-3 md:mt-0"
        }
    },
    
    content: {
        container: "w-full flex-1 flex flex-col gap-4 sm:gap-6 items-start",
        
        leftColumn: {
            container: "w-full lg:w-[250px] flex flex-col gap-4 sm:gap-6 lg:sticky lg:top-6",
            
            accounts: {
                container: "p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-300 flex flex-col gap-3 sm:gap-4",
                item: {
                    container: "flex items-center gap-3 sm:gap-4",
                    icon: {
                        ruble: "w-10 sm:w-12 h-10 sm:h-12 py-[3px] bg-emerald-100 rounded-[8px] sm:rounded-[10px] border border-emerald-500 flex justify-center items-center",
                        bonus: "w-10 sm:w-12 h-10 sm:h-12 py-[3px] bg-amber-100 rounded-[8px] sm:rounded-[10px] border border-amber-400 flex justify-center items-center"
                    },
                    info: {
                        container: "flex flex-col gap-0.5 sm:gap-1",
                        title: "text-black text-sm sm:text-base",
                        value: "text-black text-lg sm:text-xl"
                    }
                }
            },
            
            shop: {
                container: "p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-300 flex flex-col gap-3 sm:gap-4",
                header: {
                    container: "flex items-center gap-3 sm:gap-4",
                    icon: "w-10 sm:w-12 h-[60px] sm:h-[72px] py-[3px] bg-white rounded-[8px] sm:rounded-[10px] border border-sky-400 flex justify-center items-center",
                    info: {
                        container: "flex flex-col gap-1 sm:gap-2",
                        title: "text-black text-sm sm:text-base",
                        subtitle: "text-black text-[10px] sm:text-xs"
                    }
                },
                button: {
                    container: "flex justify-end",
                    button: "px-2 sm:px-3 py-1 bg-gray-100 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2",
                    text: "text-black text-[10px] sm:text-xs font-medium"
                }
            },
            
            routes: {
                container: "p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-300 flex flex-col gap-3 sm:gap-4",
                header: {
                    container: "flex items-center gap-3 sm:gap-4",
                    icon: "w-10 sm:w-12 h-[60px] sm:h-[72px] py-[3px] bg-white rounded-[8px] sm:rounded-[10px] border border-red-400 flex justify-center items-center",
                    info: {
                        container: "flex flex-col gap-1 sm:gap-2",
                        title: "text-black text-sm sm:text-base",
                        subtitle: "text-black text-[10px] sm:text-xs"
                    }
                },
                button: {
                    container: "flex justify-end",
                    button: "px-2 sm:px-3 py-1 bg-gray-100 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2",
                    text: "text-black text-[10px] sm:text-xs font-medium"
                }
            },
            
            physicalCard: {
                container: "p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-300 flex flex-col gap-3 sm:gap-4",
                header: {
                    container: "flex items-center gap-3 sm:gap-4",
                    icon: "w-10 sm:w-12 h-[60px] sm:h-[72px] py-[3px] bg-white rounded-[8px] sm:rounded-[10px] border border-gray-900 flex justify-center items-center",
                    info: {
                        container: "flex flex-col gap-1 sm:gap-2",
                        title: "text-black text-sm sm:text-base",
                        subtitle: "text-black text-[10px] sm:text-xs"
                    }
                },
                button: {
                    container: "flex justify-end",
                    button: "px-2 sm:px-3 py-1 bg-gray-100 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2",
                    text: "text-black text-[10px] sm:text-xs font-medium"
                }
            }
        },
        
        rightColumn: {
            container: "w-full flex flex-col gap-4 sm:gap-6",
            
            topRow: {
                container: "w-full flex flex-col md:flex-row gap-4 sm:gap-6",
                
                tickets: {
                    container: "flex-1 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-300 flex flex-col gap-3 sm:gap-4",
                    header: {
                        container: "flex items-center gap-2",
                        title: "text-black text-sm sm:text-base"
                    },
                    content: {
                        container: "flex-1 p-3 sm:p-4 bg-red-100 rounded-lg sm:rounded-xl flex flex-col justify-between",
                        title: "text-black text-sm sm:text-base",
                        subtitle: "text-black text-[10px] sm:text-xs mt-1 sm:mt-2",
                        button: {
                            container: "rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2",
                            text: "text-black text-[8px] sm:text-[10px] font-semibold"
                        }
                    },
                    button: {
                        container: "px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-lg sm:rounded-xl border border-gray-300 flex justify-center items-center gap-1 sm:gap-2",
                        text: "text-black text-xs sm:text-sm"
                    }
                },
                
                myTickets: {
                    container: "flex-1 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-300 flex flex-col gap-3 sm:gap-4",
                    header: {
                        container: "flex items-center gap-2",
                        title: "text-black text-sm sm:text-base"
                    },
                    content: {
                        container: "flex-1 p-3 sm:p-4 bg-gray-100 rounded-lg sm:rounded-xl flex flex-col gap-3 sm:gap-4",
                        title: "text-black text-xs sm:text-sm",
                        subtitle: "text-black text-[10px] sm:text-xs mt-1 sm:mt-2"
                    }
                }
            },
            
            bottomRow: {
                container: "w-full p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-300 flex flex-col gap-3 sm:gap-4",
                header: {
                    container: "flex justify-between items-center",
                    title: "text-black text-sm sm:text-base",
                    button: {
                        container: "px-2 sm:px-3 py-1 bg-gray-100 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2",
                        text: "text-black text-[10px] sm:text-xs font-medium"
                    }
                },
                content: {
                    container: "flex flex-wrap gap-3 sm:gap-4",
                    item: {
                        container: "w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.33%-1rem)] flex flex-col gap-2",
                        image: "w-full aspect-video bg-gray-200 rounded-lg sm:rounded-xl",
                        title: "text-black text-xs sm:text-sm",
                        subtitle: "text-black text-[10px] sm:text-xs"
                    }
                }
            }
        }
    }
};
