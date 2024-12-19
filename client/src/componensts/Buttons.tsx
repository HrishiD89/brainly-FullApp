import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" ;
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullwidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-blue-700 text-white hover:bg-blue-800",
  secondary: "bg-blue-100 text-purple-600 hover:bg-blue-50",
};

const defaultStyles =
  "px-4 py-2  rounded-md item-center font-light flex items-center";

const Buttons = ({
  variant,
  text,
  startIcon,
  onClick,
  fullwidth,
  loading,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={variantClasses[variant] + " " + defaultStyles + " " + `${fullwidth && "w-full flex justify-center items-center"} ${loading && "opacity-45"}`}
      disabled={loading}
    >
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
};

export default Buttons;
