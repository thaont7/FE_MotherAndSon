import axiosClient from "../api/axiosClient";
export const createRepo = (resource: string) => ({
  getList: (params?: any) => axiosClient.get(`/${resource}`, { params }),
  create: (data: any) => axiosClient.post(`/${resource}`, data),
  update: (id: number, data: any) =>
    axiosClient.put(`/${resource}/${id}`, data),
  delete: (id: number) => axiosClient.delete(`/${resource}/${id}`),
});
