import { useSearchParams } from "next/navigation";
import { useMapTree, useSearchParamsQuery } from "@/hooks";
import SearchIcon from "@/assets/search.svg";
import ProgressIcon from "@/assets/progress.svg";
import { memo, useMemo } from "react";
import Image from "next/image";
import { filterTreeByParams } from "@/utils";
import { IAsset } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getCompanyAssets, getCompanyAssetsLocations } from "@/services";
import { FilterInput, UnitSection } from "@/components/unit-tree/components";

const TreeRender = () => {
  const { getFiltersParams } = useSearchParamsQuery();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") || "";
  const filtersParams = getFiltersParams();

  const { data: locations } = useQuery({
    queryKey: ["company-locations-data", { companyId }],
    queryFn: () => getCompanyAssetsLocations(companyId || ""),
    enabled: !!companyId,
  });
  const { data: assets } = useQuery({
    queryKey: ["company-assets-data", { companyId }],
    queryFn: () => getCompanyAssets(companyId || ""),
    enabled: !!companyId,
  });
  const { data: tree, isPending } = useMapTree({
    locations,
    assets,
    currentCompanyId: companyId,
  });

  const filteredAssetsAndLocationsTree = useMemo((): Record<string, IAsset> => {
    let filteredTree = { ...tree };

    for (let key in filtersParams) {
      if (!filtersParams[key]) continue;

      const copyFilteredTreeToBeFiltered = structuredClone(filteredTree);
      const filteredTreeByParam = filterTreeByParams({
        tree: copyFilteredTreeToBeFiltered,
        filter: { type: key, value: filtersParams[key] },
      });

      filteredTree = { ...filteredTree, ...filteredTreeByParam };
    }

    for (const unit in filteredTree) {
      if (filteredTree[unit].parentId || filteredTree[unit].locationId) {
        delete filteredTree[unit];
      }
    }

    return filteredTree;
  }, [tree, filtersParams]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          border: "1px solid var(--gray-150)",
          borderBottom: "none",
          padding: "12px",
        }}
      >
        <FilterInput />
        <Image src={SearchIcon} alt="Search filter icon" width={16} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isPending ? "center" : "flex-start",
          justifyContent: "flex-start",
          gap: "8px",
          height: "80vh",
          overflowY: "auto",
          padding: "8px 16px",
          border: "1px solid var(--gray-150)",
        }}
      >
        {isPending ? (
          <Image
            alt="Progress bar tree"
            src={ProgressIcon}
            style={{
              width: "30px",
              height: "100%",
              animation: "progress 2s infinite",
            }}
          />
        ) : (
          Object.values(filteredAssetsAndLocationsTree || {})?.map((value) => (
            <UnitSection key={`${value?.id}-${value?.isOpened}`} unit={value} />
          ))
        )}
      </div>
    </div>
  );
};

export default memo(TreeRender);
