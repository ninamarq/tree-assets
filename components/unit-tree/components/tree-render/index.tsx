import { useSearchParams } from "next/navigation";
import { useMapTree } from "@/hooks";
import UnitSection from "../unit-section";
import SearchIcon from "@/assets/search.svg";
import ProgressIcon from "@/assets/progress.svg";
import { memo, useMemo } from "react";
import Image from "next/image";
import FilterInput from "../filter-input";
import { filterAssetsAndLocationsByFilterInput } from "@/utils";
import { IAsset } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getCompanyAssets, getCompanyAssetsLocations } from "@/services";

const TreeRender = () => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") || "";
  const filterInput = searchParams.get("filterInput") || "";
  const statusFilter = searchParams.get("status") || "";
  const sensorTypeFilter = searchParams.get("sensorType") || "";

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
    const filteredTree = { ...tree };

    if (statusFilter) {
      for (const unit in filteredTree) {
        if (filteredTree[unit]?.status !== statusFilter) {
          delete filteredTree[unit];
        }
      }
    }
    if (sensorTypeFilter) {
      for (const unit in filteredTree) {
        if (filteredTree[unit]?.sensorType !== sensorTypeFilter) {
          delete filteredTree[unit];
        }
      }
    }

    if (filterInput) {
      const copyFilteredTreeToBeFiltered = structuredClone(filteredTree);

      return filterAssetsAndLocationsByFilterInput({
        tree: copyFilteredTreeToBeFiltered,
        filterInput,
      });
    }

    if (!sensorTypeFilter && !statusFilter) {
      for (const unit in filteredTree) {
        if (filteredTree[unit].parentId || filteredTree[unit].locationId) {
          delete filteredTree[unit];
        }
      }
    }
    return filteredTree;
  }, [tree, filterInput, statusFilter, sensorTypeFilter]);

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
