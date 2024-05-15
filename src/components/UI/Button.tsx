type Props = {
  name: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ name, className = "", onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${
        disabled ? "bg-gray-400" : "bg-primary-500"
      } transition-all py-2 px-4 rounded text-white z-10 relative lg:text-base text-xs disabled:cursor-not-allowed`}
    >
      {name}
    </button>
  );
};

export default Button;
