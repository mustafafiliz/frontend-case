import { CheckIcon } from "../Icons";

type Props = {
  checked: boolean;
  label: string;
  onClick: () => void;
};

const Checkbox = ({ label, checked, onClick }: Props) => {
  return (
    <label
      data-testid="checkbox-container"
      onClick={onClick}
      className="relative flex items-center gap-2 cursor-pointer"
    >
      <div
        data-testid="checkbox"
        className={`${
          checked ? "bg-primary-500" : "bg-transparent"
        } w-4 h-4 border-2 border-primary-500 rounded relative`}
      >
        {checked && (
          <span
            data-testid="checkbox-icon"
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <CheckIcon />
          </span>
        )}
      </div>
      <span className="text-sm text-secondary-500">{label}</span>
    </label>
  );
};

export default Checkbox;
