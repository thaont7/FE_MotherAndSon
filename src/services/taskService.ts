import { createRepo } from "../repositories/crudFactory";
const repo = createRepo("tasks");
export const taskService = repo;
