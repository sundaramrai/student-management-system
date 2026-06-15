import { Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { StudentsPage } from "@/pages/StudentsPage";
import { AddStudentPage } from "@/pages/AddStudentPage";
import { EditStudentPage } from "@/pages/EditStudentPage";
import { StudentDetailPage } from "@/pages/StudentDetailPage";
import { ActivityLogsPage } from "@/pages/ActivityLogsPage";

export const AppRouter = () => (
  <AppLayout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/students/new" element={<AddStudentPage />} />
      <Route path="/students/:id" element={<StudentDetailPage />} />
      <Route path="/students/:id/edit" element={<EditStudentPage />} />
      <Route path="/activity-logs" element={<ActivityLogsPage />} />
    </Routes>
  </AppLayout>
);
