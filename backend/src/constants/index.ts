export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

export const UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_MIME_TYPES: ["image/jpeg", "image/jpg", "image/png"] as const,
  UPLOAD_DIR: "uploads",
} as const;

export const ADMISSION = {
  PREFIX: "ADM",
} as const;

export const ACTIVITY_ACTIONS = {
  CREATED: "Student Created",
  UPDATED: "Student Updated",
  DELETED: "Student Deleted",
} as const;
