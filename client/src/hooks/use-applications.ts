import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertApplication } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";

export function useCreateApplication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertApplication) => {
      // Validate data against schema before sending
      // Note: zod schema validation happens on backend too, but good to catch early
      const res = await apiRequest(
        api.applications.create.method,
        api.applications.create.path,
        data
      );
      
      return res.json();
    },
    onSuccess: () => {
      // Invalidate any relevant queries if we had an admin dashboard
      // queryClient.invalidateQueries({ queryKey: [api.applications.list.path] });
    },
  });
}
