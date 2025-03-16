export const LkConfig = {
    container: "w-full min-h-screen p-4 md:p-6 bg-white flex flex-col gap-6",
    
    header: {
        container: "w-full flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6",
        logo: {
            container: "w-full lg:w-[250px] flex items-center gap-4",
            title: "text-black text-base"
        },
        navigation: {
            container: "flex-1 flex flex-wrap items-center gap-2",
            activeButton: "px-4 py-2 bg-gray-100 rounded-xl flex items-center gap-2",
            button: "px-4 py-2 bg-white rounded-xl flex items-center gap-2",
            activeText: "text-black text-xl",
            text: "text-gray-900 text-xl"
        },
        profile: {
            container: "flex items-center gap-4 relative"
        }
    },
    
    content: {
        container: "w-full flex-1 flex flex-col lg:flex-row gap-6 items-start",
        
        leftColumn: {
            container: "w-full lg:w-[250px] flex flex-col gap-6 sticky top-6",
            
            accounts: {
                container: "p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4",
                item: {
                    container: "flex items-center gap-4",
                    icon: {
                        ruble: "w-12 h-12 py-[3px] bg-emerald-100 rounded-[10px] border border-emerald-500 flex justify-center items-center",
                        bonus: "w-12 h-12 py-[3px] bg-amber-100 rounded-[10px] border border-amber-400 flex justify-center items-center"
                    },
                    info: {
                        container: "flex flex-col gap-1",
                        title: "text-black text-base",
                        value: "text-black text-xl"
                    }
                }
            },
            
            shop: {
                container: "p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4",
                header: {
                    container: "flex items-center gap-4",
                    icon: "w-12 h-[72px] py-[3px] bg-white rounded-[10px] border border-sky-400 flex justify-center items-center",
                    info: {
                        container: "flex flex-col gap-2",
                        title: "text-black text-base",
                        subtitle: "text-black text-xs"
                    }
                },
                button: {
                    container: "flex justify-end",
                    button: "px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2",
                    text: "text-black text-xs font-medium"
                }
            },
            
            routes: {
                container: "p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4",
                header: {
                    container: "flex items-center gap-4",
                    icon: "w-12 h-[72px] py-[3px] bg-white rounded-[10px] border border-red-400 flex justify-center items-center",
                    info: {
                        container: "flex flex-col gap-2",
                        title: "text-black text-base",
                        subtitle: "text-black text-xs"
                    }
                },
                button: {
                    container: "flex justify-end",
                    button: "px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2",
                    text: "text-black text-xs font-medium"
                }
            },
            
            physicalCard: {
                container: "p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4",
                header: {
                    container: "flex items-center gap-4",
                    icon: "w-12 h-[72px] py-[3px] bg-white rounded-[10px] border border-gray-900 flex justify-center items-center",
                    info: {
                        container: "flex flex-col gap-2",
                        title: "text-black text-base",
                        subtitle: "text-black text-xs"
                    }
                },
                button: {
                    container: "flex justify-end",
                    button: "px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2",
                    text: "text-black text-xs font-medium"
                }
            }
        },
        
        rightColumn: {
            container: "flex-1 flex flex-col gap-6",
            
            topRow: {
                container: "w-full flex flex-col md:flex-row gap-6",
                
                tickets: {
                    container: "flex-1 p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4",
                    header: {
                        container: "flex items-center gap-2.5",
                        title: "text-black text-base"
                    },
                    content: {
                        container: "flex-1 p-4 bg-red-100 rounded-xl flex flex-col justify-between",
                        title: "text-black text-base",
                        subtitle: "text-black text-xs mt-2",
                        button: {
                            container: "rounded-xl flex items-center gap-2",
                            text: "text-black text-[10px] font-semibold"
                        }
                    },
                    button: {
                        container: "px-4 py-2 bg-gray-100 rounded-xl border border-gray-300 flex justify-center items-center gap-2",
                        text: "text-black text-sm"
                    }
                },
                
                myTickets: {
                    container: "flex-1 p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4",
                    header: {
                        container: "flex items-center gap-2.5",
                        title: "text-black text-base"
                    },
                    content: {
                        container: "flex-1 p-4 bg-gray-100 rounded-xl flex flex-col gap-4",
                        title: "text-black text-sm",
                        subtitle: "text-black text-xs mt-2"
                    }
                }
            },
            
            bottomRow: {
                container: "w-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4",
                header: {
                    container: "flex justify-between items-center",
                    title: "text-black text-base",
                    button: {
                        container: "px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2",
                        text: "text-black text-xs font-medium"
                    }
                },
                content: {
                    container: "flex flex-wrap gap-4",
                    item: {
                        container: "w-full sm:w-[calc(33.33%-1rem)] flex flex-col gap-2.5",
                        image: "w-full aspect-video bg-gray-200 rounded-xl",
                        title: "text-black text-sm",
                        subtitle: "text-black text-xs"
                    }
                }
            }
        }
    }
};
