interface CheckboxProps {
  label: string;
}

export default function Checkbox({
  label,
}: CheckboxProps) {
  return (
    <label className="flex items-center gap-2">

      <input type="checkbox" />

      <span className="text-sm">
        {label}
      </span>

    </label>
  );
}