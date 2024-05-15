import { useDispatch } from "react-redux";
import { IProduct } from "../../interfaces/Products/product.interface";
import { useState } from "react";
import { addToCart } from "../../redux/slices/appSlice";
import { toast } from "react-toastify";
import { Button } from "../UI";

type Props = {
  item: IProduct;
  className?: string;
};

const AddToCartButton = ({ item, className = "" }: Props) => {
  const dispatch = useDispatch();
  const addToCartDuration = 500;
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      })
    );
    toast.success(`${item.name} added to cart.`);
    setTimeout(() => {
      setLoading(false);
    }, addToCartDuration);
  };
  return (
    <Button
      className={className}
      disabled={loading}
      onClick={handleClick}
      name={loading ? "Added" : "Add to Cart"}
    />
  );
};

export default AddToCartButton;
