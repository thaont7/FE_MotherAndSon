import { createRepo } from "../repositories/crudFactory";
const repo = createRepo("projects");
export const projectService = repo;
