import { ICart } from "../../interfaces/Cart/cart.interface";
import Counter from "./Counter";

type Props = {
  item: ICart;
};

const BasketItem = ({ item }: Props) => {
  return (
    <div
      data-testid="basket-item"
      className="flex items-center justify-between"
    >
      <div className="flex flex-col">
        <h6 className="truncate text-xs text-black font-normal max-w-[90px]">
          {item.name}
        </h6>
        <span className="text-[10px] text-primary-500 font-medium">
          {item.price} ₺
        </span>
      </div>
      <Counter key={item.quantity} quantity={item.quantity} id={item.id} />
    </div>
  );
};

export default BasketItem;
