import { getCompanyAssetsLocations } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function useGetCompanyAssetsLocations(companyId: string) {
  return useQuery({
    queryKey: ["company-locations-data", { companyId }],
    queryFn: () => getCompanyAssetsLocations(companyId || ""),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!companyId,
  });
}
