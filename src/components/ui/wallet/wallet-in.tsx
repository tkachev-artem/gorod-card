import Image from 'next/image';

interface WalletInProps {
  icon: string;
  value: number;
  bgColor: string;
  ringColor: string;
  ringColorHover: string;
}

export function WalletIn({ icon, value, bgColor, ringColor, ringColorHover }: WalletInProps) {
    return (
        <div
        className={[
            'w-full rounded-xl ring-inset ring-1 flex items-center justify-center py-6',
            'transition-all duration-300 cursor-pointer',
            `bg-${bgColor}-100`,
            `ring-${ringColor}-400`,
            `hover:ring-${ringColorHover}-600`,
            'hover:ring-2'
        ].join(' ')}
        >
            <div className="flex items-center gap-2">
                <div className="text-gray-900 text-2xl font-semibold">{value}</div>
                <div>
                    <Image src={`/icon/${icon}.svg`} alt="points" width={24} height={24} />
                </div>
            </div>
        </div>
    );
}