import { Users, Activity } from "lucide-react";
import { useStudents } from "@/hooks/useStudents";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { StatCard, Loader } from "@/components/ui";
import { formatDateTime } from "@/utils/format";

export const DashboardPage = () => {
  const { data: studentsData, isLoading: studentsLoading } = useStudents({
    page: 1,
    pageSize: 1,
  });
  const { data: logsData, isLoading: logsLoading } = useActivityLogs(1, 5);

  if (studentsLoading) return <Loader />;

  const total = studentsData?.totalRecords ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={total}
          icon={<Users className="w-6 h-6" />}
          color="indigo"
          trend="All enrolled students"
        />
        <StatCard
          title="Activity Logs"
          value={logsData?.totalRecords ?? 0}
          icon={<Activity className="w-6 h-6" />}
          color="amber"
          trend="Total recorded actions"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-xs">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Recent Activity</h3>
        </div>
        {logsLoading ? (
          <Loader />
        ) : (
          <ul className="divide-y divide-gray-50">
            {(logsData?.data ?? []).length === 0 ? (
              <li className="px-6 py-8 text-center text-sm text-gray-400">
                No activity yet
              </li>
            ) : (
              (logsData?.data ?? []).map((log) => (
                <li key={log.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500">
                      {log.student.name} ({log.student.admissionNumber})
                    </p>
                  </div>
                  <time className="text-xs text-gray-400 shrink-0">
                    {formatDateTime(log.createdAt)}
                  </time>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
