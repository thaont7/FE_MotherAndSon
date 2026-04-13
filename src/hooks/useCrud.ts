import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export const useList = (key: string, fn: any, params?: any) =>
  useQuery({ queryKey: [key, params], queryFn: () => fn(params) });
export const useCrud = (key: string, service: any) => {
  const qc = useQueryClient();
  return {
    create: useMutation({
      mutationFn: service.create,
      onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
    }),
    update: useMutation({
      mutationFn: ({ id, data }: any) => service.update(id, data),
      onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
    }),
    delete: useMutation({
      mutationFn: service.delete,
      onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
    }),
  };
};
