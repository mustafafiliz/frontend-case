import { useSelector } from "react-redux";
import { Button, Card } from "../UI";
import BasketItem from "./BasketItem";
import { selectCart, selectTotalCartPrice } from "../../redux/slices/appSlice";

const Basket = () => {
  const data = useSelector(selectCart);
  const totalCartPrice = useSelector(selectTotalCartPrice);

  return (
    <div className="flex flex-col gap-8 w-[213px] sticky top-12">
      <Card size="sm" className="pr-1">
        {data.length === 0 ? (
          <h6 className="text-center text-lg font-medium">
            Your cart is empty.
          </h6>
        ) : (
          <div className="flex flex-col gap-4 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
            {data.map((i, index) => {
              return <BasketItem key={index} item={i} />;
            })}
          </div>
        )}
      </Card>
      <Card className="flex flex-col gap-4" size="sm">
        <h6 className="text-sm font-medium flex items-center gap-2">
          Total Price:
          <span className="text-primary-500 font-bold">{totalCartPrice} ₺</span>
        </h6>
        <Button className="!text-[13px]" name="Checkout" />
      </Card>
    </div>
  );
};

export default Basket;
