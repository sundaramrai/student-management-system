import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

type PageItem =
  | { type: "page"; value: number }
  | { type: "ellipsis"; key: string };

export const Pagination = ({
  page,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRecords);

  const pages: PageItem[] = [];

  if (totalPages <= 7) {
    pages.push(
      ...Array.from({ length: totalPages }, (_, i) => ({
        type: "page" as const,
        value: i + 1,
      }))
    );
  } else {
    pages.push({ type: "page", value: 1 });

    if (page > 3) {
      pages.push({ type: "ellipsis", key: "left-ellipsis" });
    }

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push({ type: "page", value: i });
    }

    if (page < totalPages - 2) {
      pages.push({ type: "ellipsis", key: "right-ellipsis" });
    }

    pages.push({ type: "page", value: totalPages });
  }

  return (
    <div className="flex items-center justify-between px-1">
      <p className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-medium">
          {start}–{end}
        </span>{" "}
        of <span className="font-medium">{totalRecords}</span> results
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((item) =>
          item.type === "ellipsis" ? (
            <span
              key={item.key}
              className="px-2 text-sm text-gray-400"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={item.value}
              type="button"
              onClick={() => onPageChange(item.value)}
              className={clsx(
                "min-w-8 h-8 rounded-lg text-sm font-medium transition-colors border cursor-pointer",
                item.value === page
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              )}
              aria-current={item.value === page ? "page" : undefined}
            >
              {item.value}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};