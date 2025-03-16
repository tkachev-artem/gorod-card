interface ButtonGridProps {
  buttons: {
    title: string;
    onClick?: () => void;
  }[];
}

export const ButtonGrid = ({ buttons }: ButtonGridProps) => {
  return (
    <div className="w-auto h-[228px] rounded-xl flex-col justify-start items-start gap-4 inline-flex overflow-hidden">
      <div className="self-stretch grow shrink basis-0 justify-start items-center gap-4 inline-flex">
        <div className="grow shrink basis-0 self-stretch p-4 bg-white rounded-xl border border-gray-300 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
          <div className="text-black text-xs font-semibold  leading-none">{buttons[0].title}</div>
        </div>
        <div className="grow shrink basis-0 self-stretch p-4 bg-white rounded-xl border border-gray-300 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
          <div className="text-black text-xs font-semibold  leading-none">{buttons[1].title}</div>
        </div>
      </div>
      <div className="self-stretch grow shrink basis-0 justify-start items-center gap-4 inline-flex">
        <div className="grow shrink basis-0 self-stretch p-4 bg-white rounded-xl border border-gray-300 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
          <div className="text-black text-xs font-semibold leading-none">{buttons[2].title}</div>
        </div>
        <div className="grow shrink basis-0 self-stretch p-4 bg-white rounded-xl border border-gray-300 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
          <div className="text-black text-xs font-semibold leading-none">{buttons[3].title}</div>
        </div>
      </div>
    </div>
  );
}; 