import ProductCard from "../ProductCard/ProductCard";
import { IProduct } from "../../interfaces/Products/product.interface";
import Pagination from "./Pagination";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";

type Props = {
  loading: boolean;
  data: IProduct[];
  currentPage: number;
  totalPages: number;
  onPagination: (page: number) => void;
  limit: number;
};

const Listing = ({
  data,
  currentPage,
  onPagination,
  totalPages,
  loading,
  limit,
}: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px] lg:gap-[20px] gap-2 mt-[7px]">
        {loading
          ? Array.from({ length: limit }, (_, index) => index).map(
              (_, index) => {
                return <ProductCardSkeleton key={index} />;
              }
            )
          : data.map((item, index) => {
              return <ProductCard key={index} item={item} />;
            })}
      </div>
      <div className="mt-9 flex justify-center w-full">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPagination={onPagination}
        />
      </div>
    </>
  );
};

export default Listing;
