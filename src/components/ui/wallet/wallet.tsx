import { WalletIn } from './wallet-in';

export function Wallet() {
    return (
        <div className='grid grid-cols-2 gap-6 w-full'>
            <WalletIn icon="rublesign.circle.fill" value={1000} bgColor="emerald" ringColor="emerald" ringColorHover="emerald" />
            <WalletIn icon="rhombus.fill" value={100} bgColor="amber" ringColor="amber" ringColorHover="amber" />
        </div>
    );
}