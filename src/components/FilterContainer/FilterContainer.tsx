import { useEffect, useState } from "react";
import { sorts } from "../../mocks/static";
import { Card, Input, Radio } from "../UI";
import Checkbox from "../UI/Checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import FilterLabelSkeleton from "./FilterLabelSkeleton";

type Props = {
  facets: {
    models: string[];
    brands: string[];
    selectedModels: string[];
    selectedBrands: string[];
  };
  loading: boolean;
  changeFacets: React.Dispatch<
    React.SetStateAction<{
      models: string[];
      brands: string[];
      selectedModels: string[];
      selectedBrands: string[];
    }>
  >;
  sortBy?: string;
  setSortBy: (sortBy: string) => void;
};

export const labelSkeletonLimit = 4;

const FilterContainer = ({
  facets,
  sortBy,
  setSortBy,
  changeFacets,
  loading,
}: Props) => {
  const [_facets, setFacets] = useState(facets);
  const navigation = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState({ models: "", brands: "" });

  const onSearch = (value: string, type: "brands" | "models") => {
    setSearch({ ...search, [type]: value });
    filterFacets(value, type);
  };

  const filterFacets = (value: string, type: "brands" | "models") => {
    const filtered = facets[type].filter((facet) =>
      facet.toLowerCase().includes(value.toLowerCase())
    );
    setFacets({ ..._facets, [type]: filtered });
  };

  const handleSort = (value: string) => {
    const searchParams = new URLSearchParams(location.search);
    const currentSortBy = searchParams.get("sortBy");

    if (currentSortBy !== value || !currentSortBy) {
      setSortBy(value);
      searchParams.set("sortBy", value);
    } else {
      searchParams.delete("sortBy");
      setSortBy("");
    }

    navigation(`/?${searchParams.toString()}`);
  };

  const handleFilterFacets = (
    value: string,
    type: "selectedBrands" | "selectedModels"
  ) => {
    const updatedFacets = { ...facets };

    const index = updatedFacets[type].indexOf(value);
    if (index === -1) {
      updatedFacets[type] = [...updatedFacets[type], value];
    } else {
      updatedFacets[type] = updatedFacets[type].filter(
        (item: string) => item !== value
      );
    }

    changeFacets(updatedFacets);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", "1");

    if (updatedFacets[type].length === 0) {
      searchParams.delete(type);
    } else {
      searchParams.set(type, updatedFacets[type].join(","));
    }

    navigation(`/?${searchParams.toString()}`);
  };

  useEffect(() => {
    setFacets(facets);
  }, [facets]);

  return (
    <div className="w-[220px] flex flex-col gap-5 sticky top-10">
      <Card className="flex flex-col gap-4" title="Sort By">
        {sorts.map((i, index) => {
          return (
            <Radio
              key={index}
              checked={i.value === sortBy}
              label={i.label}
              onChange={() => handleSort(i.value)}
            />
          );
        })}
      </Card>
      <Card className="flex flex-col gap-4" title="Brands">
        <Input
          id="search-brands"
          value={search.brands}
          onChange={(value) => onSearch(value, "brands")}
          size="sm"
          variant="dark"
        />
        <div
          data-testid="brands-container"
          className="flex flex-col gap-4 h-[90px] overflow-y-auto custom-scrollbar"
        >
          {loading ? (
            Array.from({ length: labelSkeletonLimit }, (_, index) => index).map(
              (_, index) => {
                return <FilterLabelSkeleton key={index} />;
              }
            )
          ) : (
            <>
              {_facets.brands.length > 0 ? (
                _facets.brands.map((i) => {
                  return (
                    <Checkbox
                      key={i}
                      onClick={() => handleFilterFacets(i, "selectedBrands")}
                      checked={facets.selectedBrands.includes(i)}
                      label={i}
                    />
                  );
                })
              ) : (
                <h6 className="text-sm text-center pt-5 font-medium">
                  No data available
                </h6>
              )}
            </>
          )}
        </div>
      </Card>
      <Card className="flex flex-col gap-4" title="Models">
        <Input
          id="search-models"
          value={search.models}
          onChange={(value) => onSearch(value, "models")}
          size="sm"
          variant="dark"
        />
        <div
          data-testid="models-container"
          className="flex flex-col gap-4 h-[90px] overflow-y-auto custom-scrollbar"
        >
          {loading ? (
            Array.from({ length: labelSkeletonLimit }, (_, index) => index).map(
              (_, index) => {
                return <FilterLabelSkeleton key={index} />;
              }
            )
          ) : (
            <>
              {_facets.models.length > 0 ? (
                _facets.models.map((i) => {
                  return (
                    <Checkbox
                      key={i}
                      onClick={() => handleFilterFacets(i, "selectedModels")}
                      checked={facets.selectedModels.includes(i)}
                      label={i}
                    />
                  );
                })
              ) : (
                <h6 className="text-sm text-center pt-5 font-medium">
                  No data available
                </h6>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FilterContainer;
