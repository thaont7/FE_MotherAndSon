import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useList = <TData, TParams = unknown>(
  key: string,
  fn: (params?: TParams) => Promise<AxiosResponse<TData>>,
  params?: TParams,
) =>
  useQuery({
    queryKey: [key, params],
    queryFn: async () => {
      const res = await fn(params);
      return res.data;
    },
  });

export const useCrud = <T, TId extends string | number = number>(
  key: string,
  service: {
    create: (data: any) => Promise<T>;
    update: (id: TId, data: any) => Promise<T>;
    delete: (id: TId) => Promise<void>;
  },
) => {
  const qc = useQueryClient();

  return {
    create: useMutation({
      mutationFn: service.create,
      onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
    }),

    update: useMutation({
      mutationFn: ({ id, data }: { id: TId; data: any }) =>
        service.update(id, data),
      onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
    }),

    delete: useMutation({
      mutationFn: (id: TId) => service.delete(id),
      onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
    }),
  };
};
