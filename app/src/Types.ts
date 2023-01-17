import { type ApplicationTableType } from "~/controllers/application.server";

export interface DataTableProps extends ApplicationTableType {
  due_date?: Date;
}
