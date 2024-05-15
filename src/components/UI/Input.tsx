import { SearchIcon } from "../Icons";

type Props = {
  variant?: "light" | "dark";
  size?: "sm" | "md";
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  id?: string;
};

const Input = ({
  variant = "light",
  size = "md",
  value,
  onChange,
  onSubmit,
  id,
}: Props) => {
  return (
    <label
      className={`${
        variant === "dark" ? "bg-[#fafafb]" : "bg-white"
      } relative h-10 py-2 pl-11 pr-2 max-w-[408px] block`}
    >
      <button
        onClick={onSubmit}
        className="absolute top-1/2 left-3 -translate-y-1/2"
      >
        <SearchIcon />
      </button>
      <input
        data-testid={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Search"
        className={`${
          size === "sm" ? "text-sm" : "text-lg"
        } h-full w-full text-[#626b8b] placeholder:text-[#626b8b] outline-none bg-transparent`}
      />
    </label>
  );
};

export default Input;
