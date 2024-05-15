import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/slices/appSlice";
import { useState } from "react";

type Props = {
  quantity: number;
  id: string;
};

const Counter = ({ quantity, id }: Props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(quantity);

  const handleClick = (type = "decrease" || "increase") => {
    if (type === "decrease") {
      dispatch(decreaseQuantity(id));
      setValue(value - 1);
    } else {
      dispatch(increaseQuantity(id));
      setValue(value + 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        data-testid="counter-minus"
        onClick={() => handleClick("decrease")}
        className="text-lg font-medium flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-500 rounded"
      >
        -
      </button>
      <span
        data-testid="counter-quantity"
        data-quantity={value}
        className="bg-primary-500 text-white text-lg font-medium flex items-center justify-center w-8 h-8"
      >
        {value}
      </span>
      <button
        data-testid="counter-plus"
        onClick={() => handleClick("increase")}
        className="text-lg font-medium flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-500 rounded"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
