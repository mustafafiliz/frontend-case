type Props = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  size?: "sm" | "md";
  id?: string;
};

const Card = ({ children, title, className = "", size = "md", id }: Props) => {
  return (
    <div data-testid={id}>
      {title && <h6 className="mb-1.5 text-xs text-[#333333B2]">{title}</h6>}
      <div
        data-testid="card"
        className={`${className} ${
          size === "sm" ? "p-2.5" : "p-[15px]"
        }  bg-white shadow-sm`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
