import { useState } from "react";
import { Activity } from "lucide-react";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { Loader, PageHeader, Pagination, EmptyState } from "@/components/ui";
import { formatDateTime } from "@/utils/format";

const actionColorMap: Record<string, string> = {
  "Student Created": "bg-green-100 text-green-700",
  "Student Updated": "bg-blue-100 text-blue-700",
  "Student Deleted": "bg-red-100 text-red-700",
};

export const ActivityLogsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useActivityLogs(page, 20);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Activity Logs"
        description="Track all changes made to student records."
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
            {(data?.data ?? []).length === 0 ? (
              <EmptyState
                title="No activity yet"
                description="Actions on student records will appear here."
                icon={<Activity className="w-8 h-8" />}
              />
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Action", "Student", "Admission No.", "Timestamp"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data?.data.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            actionColorMap[log.action] ?? "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-900">
                        {log.student.name}
                      </td>
                      <td className="px-5 py-3.5 text-sm font-mono text-gray-500">
                        {log.student.admissionNumber}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-500">
                        {formatDateTime(log.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {data && data.totalPages > 1 && (
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              totalRecords={data.totalRecords}
              pageSize={data.pageSize}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};
