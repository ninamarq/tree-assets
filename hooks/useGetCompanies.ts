import { getCompanies } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function useGetCompanies() {
  return useQuery({
    queryKey: ["companies-data"],
    queryFn: () => getCompanies(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
