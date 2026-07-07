interface ButtonCancelProps{
  children: React.ReactNode;
}
export default function ButtonCancel({ children } : ButtonCancelProps) {
    return (
        <button className="
         cursor-pointer
         w-full
        rounded-xl
        bg-[#C3C6D6]
        py-4
        text-[#434654]
        font-semibold
        transition
        hover:bg-[#BFC3D1]
      ">
        {children}
        </button>
    )
}