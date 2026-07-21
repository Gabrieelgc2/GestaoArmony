interface ButtonCancelProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function ButtonCancel({ children, onClick }: ButtonCancelProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
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