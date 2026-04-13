import { createRepo } from "../repositories/crudFactory";
const repo = createRepo("users");
export const userService = repo;
