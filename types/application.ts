import { CourseProps } from "./course";

export type ApplicationProps = {
  id?: string;
  course: CourseProps;
  user: { name: string; email: string };
  status?: string;
};
