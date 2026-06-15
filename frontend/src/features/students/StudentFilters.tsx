import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Select, Button, SearchInput } from "@/components/ui";
import { Gender, StudentFilters as Filters } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { useCourses } from "@/hooks/useStudents";

const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const yearOptions = [1, 2, 3, 4, 5, 6].map((y) => ({
  value: String(y),
  label: `Year ${y}`,
}));

interface StudentFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export const StudentFiltersPanel = ({ filters, onChange }: StudentFiltersProps) => {
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  const debouncedSearch = useDebounce(searchInput, 400);
  const { data: courses = [] } = useCourses();

  useEffect(() => {
    onChange({ ...filters, search: debouncedSearch || undefined, page: 1 });
  }, [debouncedSearch]);

  const courseOptions = courses.map((c) => ({ value: c, label: c }));

  const hasActiveFilters =
    !!filters.search || !!filters.course || !!filters.gender || !!filters.year;

  const clearAll = () => {
    setSearchInput("");
    onChange({ page: 1, pageSize: filters.pageSize });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs space-y-4">
      <SearchInput
        placeholder="Search by name, admission number, email, or course..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onClear={() => setSearchInput("")}
      />
      <div className="flex flex-wrap gap-3 items-end">
        <div className="w-48">
          <Select
            placeholder="All Courses"
            options={courseOptions}
            value={filters.course ?? ""}
            onChange={(e) =>
              onChange({ ...filters, course: e.target.value || undefined, page: 1 })
            }
          />
        </div>
        <div className="w-36">
          <Select
            placeholder="All Genders"
            options={genderOptions}
            value={filters.gender ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                gender: (e.target.value as Gender) || undefined,
                page: 1,
              })
            }
          />
        </div>
        <div className="w-32">
          <Select
            placeholder="All Years"
            options={yearOptions}
            value={filters.year ? String(filters.year) : ""}
            onChange={(e) =>
              onChange({
                ...filters,
                year: e.target.value ? Number(e.target.value) : undefined,
                page: 1,
              })
            }
          />
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            icon={<Filter className="w-4 h-4" />}
            onClick={clearAll}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};
