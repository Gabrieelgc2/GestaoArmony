import Modal from "./Modal";
import type { ReactNode } from "react";

interface MessageProps {
  open: boolean;
  onClose: () => void;

  title: string;
  description: string;
  buttonText: string;

  icon: ReactNode;
}

export default function SchedulingMessage({
  open,
  onClose,
  title,
  description,
  icon,
  buttonText
}: MessageProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-6 pt-2 text-center">
        <div className="flex justify-center">
          {icon}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#191C1E]">
            {title}
          </h2>

          <p className="text-base text-[#434654]">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-blue-800 py-3 font-semibold text-white transition hover:bg-blue-900"
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
}
