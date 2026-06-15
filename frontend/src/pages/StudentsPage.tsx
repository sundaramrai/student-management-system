import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useStudents } from "@/hooks/useStudents";
import { StudentFilters } from "@/types";
import { StudentTable } from "@/features/students/StudentTable";
import { StudentFiltersPanel } from "@/features/students/StudentFilters";
import { Button, Pagination, Loader, PageHeader } from "@/components/ui";

export const StudentsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<StudentFilters>({
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading } = useStudents(filters);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Students"
        description={`${data?.totalRecords ?? 0} students enrolled`}
        action={
          <Button
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => navigate("/students/new")}
          >
            Add Student
          </Button>
        }
      />

      <StudentFiltersPanel filters={filters} onChange={setFilters} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StudentTable students={data?.data ?? []} />
          {data && data.totalPages > 1 && (
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              totalRecords={data.totalRecords}
              pageSize={data.pageSize}
              onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
            />
          )}
        </>
      )}
    </div>
  );
};
