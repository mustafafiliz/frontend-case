import { useEffect, useState } from "react";
import { Card } from "../components/UI";
import { getProductDetail } from "../services/Product/product.service";
import { useLocation } from "react-router-dom";
import { IProduct } from "../interfaces/Products/product.interface";
import DetailSkeleton from "../components/Detail/DetailSkeleton";
import AddToCartButton from "../components/AddToCartButton/AddToCartButton";

const Detail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [status, setStatus] = useState("pending");
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          const { data } = await getProductDetail(id);
          setProduct(data);
          setStatus("success");
        } catch (error) {
          setStatus("error");
          return error;
        }
      }
    };
    getData();
  }, [id]);

  if (status === "pending") return <DetailSkeleton />;
  else if (status === "error" || !product) return <>Error</>;

  return (
    <Card className="flex lg:flex-row flex-col gap-2.5" size="sm">
      <img
        className="aspect-[549/422] max-w-[549px] mx-auto rounded"
        src={product.image}
        alt={product.name}
        width="100%"
        height="100%"
      />
      <div className="p-2.5 flex-1 flex flex-col">
        <h1 className="text-black text-2xl font-normal mb-2.5 line-clamp-2">
          {product.name}
        </h1>
        <span className="text-primary-500 font-medium mb-8 text-2xl">
          {product.price} ₺
        </span>
        <AddToCartButton item={product} className="font-medium text-lg" />
        <p className="mt-5 line-clamp-11">{product.description}</p>
      </div>
    </Card>
  );
};

export default Detail;
