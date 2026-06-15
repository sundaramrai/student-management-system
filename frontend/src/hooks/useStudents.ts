import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "@/services/student.service";
import { StudentFilters, CreateStudentPayload, UpdateStudentPayload } from "@/types";

export const STUDENT_KEYS = {
  all: ["students"] as const,
  lists: () => [...STUDENT_KEYS.all, "list"] as const,
  list: (filters: StudentFilters) => [...STUDENT_KEYS.lists(), filters] as const,
  details: () => [...STUDENT_KEYS.all, "detail"] as const,
  detail: (id: string) => [...STUDENT_KEYS.details(), id] as const,
  courses: () => [...STUDENT_KEYS.all, "courses"] as const,
};

export const useStudents = (filters: StudentFilters) => {
  return useQuery({
    queryKey: STUDENT_KEYS.list(filters),
    queryFn: () => studentService.getAll(filters),
  });
};

export const useStudent = (id: string) => {
  return useQuery({
    queryKey: STUDENT_KEYS.detail(id),
    queryFn: () => studentService.getById(id),
    enabled: !!id,
  });
};

export const useCourses = () => {
  return useQuery({
    queryKey: STUDENT_KEYS.courses(),
    queryFn: () => studentService.getCourses(),
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateStudentPayload) =>
      studentService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: STUDENT_KEYS.lists() });
      void queryClient.invalidateQueries({ queryKey: STUDENT_KEYS.courses() });
    },
  });
};

export const useUpdateStudent = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateStudentPayload) =>
      studentService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: STUDENT_KEYS.lists() });
      void queryClient.invalidateQueries({ queryKey: STUDENT_KEYS.detail(id) });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => studentService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: STUDENT_KEYS.lists() });
      void queryClient.invalidateQueries({ queryKey: STUDENT_KEYS.courses() });
    },
  });
};
