type Props = {
  checked: boolean;
  label: string;
  onChange: () => void;
};

const Radio = ({ label, onChange, checked }: Props) => {
  return (
    <label
      data-testid="radio-container"
      onClick={onChange}
      className="flex items-center gap-2 cursor-pointer"
    >
      <div className="w-4 h-4 border-2 border-primary-500 relative rounded-full">
        <span
          data-testid="radio-button"
          className={`${
            checked ? "bg-primary-500" : "bg-transparent"
          } absolute w-2 h-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full`}
        />
      </div>
      <span className="text-sm text-secondary-500">{label}</span>
    </label>
  );
};

export default Radio;
