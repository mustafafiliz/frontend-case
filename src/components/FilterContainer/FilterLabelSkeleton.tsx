const FilterLabelSkeleton = () => {
  return (
    <div
      data-testid="filter-label-skeleton"
      className="animate-pulse flex items-center gap-2"
    >
      <div className="w-4 h-4 bg-gray-200 rounded relative"></div>
      <div className="h-2 bg-gray-200 rounded-full w-2/3"></div>
    </div>
  );
};

export default FilterLabelSkeleton;
