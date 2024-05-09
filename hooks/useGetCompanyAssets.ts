import { getCompanyAssets } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function useGetCompanyAssets(companyId: string) {
  return useQuery({
    queryKey: ["company-assets-data", { companyId }],
    queryFn: () => getCompanyAssets(companyId || ""),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!companyId,
  });
}
