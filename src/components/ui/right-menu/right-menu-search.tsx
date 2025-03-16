import Image from 'next/image';

export function RightMenuSearch() {
    return (
        <div className='relative'>
            <input 
                type="search" 
                placeholder="Поиск" 
                className="w-60 h-12 rounded-full bg-white pl-12 pr-4 py-3 border border-gray-300
                          focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                          [&::-webkit-search-cancel-button]:appearance-none
                          [&::-webkit-search-cancel-button]:h-4
                          [&::-webkit-search-cancel-button]:w-4
                          [&::-webkit-search-cancel-button]:bg-[url('/icon/xmark.svg')]
                          [&::-webkit-search-cancel-button]:bg-no-repeat
                          [&::-webkit-search-cancel-button]:bg-center
                          [&::-webkit-search-cancel-button]:cursor-pointer" 
            />

                    <Image 
                        src="/icon/magnifyingglass.svg" 
                        alt="Поиск"
                        width={20}
                        height={20}
                        className="absolute 
                                 left-4 top-1/2 -translate-y-1/2
                                 text-gray-400 
                                 pointer-events-none select-none"
                    />
        </div>
    );
}