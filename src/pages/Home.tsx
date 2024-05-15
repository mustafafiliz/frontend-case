import { useEffect, useState } from "react";
import { FilterContainer, Listing } from "../components";
import { getProducts } from "../services/Product/product.service";
import { useLocation, useNavigate } from "react-router-dom";
import { IProduct } from "../interfaces/Products/product.interface";

const Home = () => {
  const { search } = useLocation();
  const navigation = useNavigate();
  const params = new URLSearchParams(search);
  const limit = import.meta.env.VITE_PAGE_LIMIT || 12;

  const [loading, setLoading] = useState(true);
  const [paginatedProducts, setPaginatedProducts] = useState<IProduct[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const [sortBy, setSortBy] = useState(params.get("sortBy") || undefined);
  const [facets, setFacets] = useState<{
    models: string[];
    brands: string[];
    selectedModels: string[];
    selectedBrands: string[];
  }>({
    models: [],
    selectedModels: params.get("selectedModels")?.split(",") || [],
    brands: [],
    selectedBrands: params.get("selectedBrands")?.split(",") || [],
  });

  const getFilteredData = (
    data: IProduct[],
    selectedBrands: string[],
    selectedModels: string[]
  ): IProduct[] => {
    return data.filter((product) => {
      if (
        (selectedBrands.length === 0 ||
          selectedBrands.includes(product.brand)) &&
        (selectedModels.length === 0 || selectedModels.includes(product.model))
      ) {
        return true;
      }
      return false;
    });
  };

  const getFilteredModels = (
    data: IProduct[],
    selectedBrands: string[]
  ): string[] => {
    const filteredModels: string[] = [];

    selectedBrands.forEach((brand) => {
      const models = data
        .filter((product) => product.brand === brand)
        .map((product) => product.model);
      filteredModels.push(...models);
    });

    const uniqueFilteredModels = Array.from(new Set(filteredModels));

    return uniqueFilteredModels;
  };

  const onPagination = (page: number) => {
    const params = new URLSearchParams(location.search);

    params.set("page", page.toString());

    navigation(`/?${params.toString()}`);
  };

  useEffect(() => {
    const getData = async () => {
      const params = new URLSearchParams(search);
      const orderBy = sortBy?.split("-")?.[0];
      const order = sortBy?.split("-")?.[1];
      const page = params.get("page") || 1;

      try {
        let { data: filteredData } = await getProducts({
          name: params.get("q"),
          orderBy,
          order,
        });

        const uniqueBrands: string[] = Array.from(
          new Set(filteredData.map((product: IProduct) => product.brand))
        );

        const uniqueModels: string[] = getFilteredModels(
          filteredData,
          facets.selectedBrands.length > 0
            ? facets.selectedBrands
            : uniqueBrands
        );

        filteredData = getFilteredData(
          filteredData,
          facets.selectedBrands,
          facets.selectedModels
        );

        const pageCount = Math.ceil(filteredData.length / limit);
        const paginatedData = filteredData.slice(
          (Number(currentPage) - 1) * limit,
          Number(currentPage) * limit
        );

        setFacets({
          ...facets,
          models: uniqueModels,
          brands: uniqueBrands,
        });
        setCurrentPage(page);
        setTotalPages(pageCount);
        setPaginatedProducts(paginatedData);
        setLoading(false);
      } catch (error) {
        return error;
      }
    };

    getData();
  }, [search]);

  return (
    <div className="flex">
      <div className="hidden lg:block pr-7">
        <FilterContainer
          loading={loading}
          facets={facets}
          changeFacets={setFacets}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <div className="flex-1">
        <Listing
          data={paginatedProducts}
          loading={loading}
          limit={limit}
          currentPage={Number(currentPage)}
          totalPages={Number(totalPages)}
          onPagination={onPagination}
        />
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default Home;
