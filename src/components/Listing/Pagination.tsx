import { useEffect, useState } from "react";
import ChevronLeft from "../Icons/ChevronLeft";
import ChevronRight from "../Icons/ChevronRight";

type Props = {
  page?: number;
  totalPages?: number;
  onPagination: (page: number) => void;
  disabled?: boolean;
};

export default function Pagination({
  page = 1,
  totalPages = 1,
  onPagination,
  disabled = false,
}: Props) {
  const [tempPages, setPages] = useState<number[] | undefined>(undefined);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    filteredPages();
  }, [page, totalPages]);

  const filteredPages = () => {
    const _pages = pages.filter((i) => {
      if (i < page - 2 || i > page + 2) return;
      else return i;
    });
    setPages(_pages);
  };

  const handlePagination = (page: number) => {
    onPagination(page);
  };

  const MoreButtons = () => {
    return (
      <button className="text-[#7a8096] text-sm" disabled>
        ...
      </button>
    );
  };

  const Forward = () => {
    return (
      <button
        disabled={pages[pages?.length - 1] === page || disabled}
        className="rounded bg-white w-8 h-8 flex items-center justify-center"
        onClick={() => handlePagination(page + 1)}
      >
        <ChevronRight />
      </button>
    );
  };

  const Backward = () => {
    return (
      <button
        className="rounded bg-white w-8 h-8 flex items-center justify-center"
        disabled={page === 1 || disabled}
        onClick={() => handlePagination(page - 1)}
      >
        <ChevronLeft />
      </button>
    );
  };

  const PaginationButtons = () => {
    return (
      <>
        {tempPages
          ?.filter((i) => {
            if (i === 1 || i === pages[pages?.length - 1]) return;
            return i;
          })
          .slice(0, 10)
          .map((i, index) => {
            return (
              <button
                disabled={disabled}
                onClick={() => handlePagination(i)}
                key={index}
                className={`${
                  page === i
                    ? "bg-white font-medium text-primary-500"
                    : "font-medium text-[#7a8096]"
                } rounded px-2 py-1 text-sm`}
              >
                {i}
              </button>
            );
          })}
      </>
    );
  };

  const FirstButton = () => {
    return (
      <button
        disabled={disabled}
        onClick={() => handlePagination(1)}
        className={`${
          page === 1
            ? "bg-white font-medium text-primary-500"
            : "text-[#7a8096]"
        } rounded-md px-3 py-1 text-[#7a8096] text-sm`}
      >
        1
      </button>
    );
  };

  const LastButton = () => {
    return (
      <button
        disabled={disabled}
        onClick={() => handlePagination(pages[pages?.length - 1])}
        className={`${
          page === pages[pages?.length - 1]
            ? "bg-white font-medium text-primary-500"
            : "text-[#7a8096]"
        } rounded-md px-3 py-1 text-sm`}
      >
        {pages[pages?.length - 1]}
      </button>
    );
  };

  return totalPages > 1 ? (
    <div data-testid="pagination" className="flex items-center gap-2">
      <Backward />
      <FirstButton />
      {page !== 1 && page !== 2 && page !== 3 && <MoreButtons />}
      <PaginationButtons />
      {page !== pages[pages?.length - 2] &&
        page !== pages[pages?.length - 1] &&
        page !== pages[pages?.length - 3] && <MoreButtons />}
      <LastButton />
      <Forward />
    </div>
  ) : (
    <></>
  );
}
