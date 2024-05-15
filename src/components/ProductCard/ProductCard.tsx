import { Link } from "react-router-dom";
import { Card } from "../UI";
import { IProduct } from "../../interfaces/Products/product.interface";

import AddToCartButton from "../AddToCartButton/AddToCartButton";

type Props = {
  item: IProduct;
};

const ProductCard = ({ item }: Props) => {
  return (
    <Card id="product-card" size="sm" className="relative">
      <Link to={`/detail?id=${item.id}`} className="absolute z-[2] inset-0" />
      <img
        className="aspect-[160/150] object-cover rounded"
        src={item.image}
        alt={item.name}
        width="100%"
        height="100%"
      />
      <div className="flex flex-col mt-[15px] gap-[15px]">
        <span className="text-primary-500 text-sm font-medium">
          {item.price} ₺
        </span>
        <p className="text-black text-sm font-medium line-clamp-2 h-10">
          {item.name}
        </p>
        <AddToCartButton item={item} />
      </div>
    </Card>
  );
};

export default ProductCard;
