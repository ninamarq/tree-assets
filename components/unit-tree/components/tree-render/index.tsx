import { useSearchParams } from "next/navigation";
import {
  useGetCompanyAssets,
  useGetCompanyAssetsLocations,
  useMapTree,
} from "@/hooks";
import UnitSection from "../unit-section";
import SearchIcon from "@/assets/search.svg";
import { memo, useMemo } from "react";
import Image from "next/image";
import FilterInput from "../filter-input";
import { filterAssetsAndLocationsByFilterInput } from "@/utils/recursion-filter";

const TreeRender = () => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") || "";
  const filterInput = searchParams.get("filterInput") || "";
  const statusFilter = searchParams.get("status") || "";
  const sensorTypeFilter = searchParams.get("sensorType") || "";

  const { data: locations } = useGetCompanyAssetsLocations(companyId);
  const { data: assets } = useGetCompanyAssets(companyId);
  const { data: tree, isPending } = useMapTree({
    locations,
    assets,
    currentCompanyId: companyId,
  });

  const filteredAssetsAndLocationsTree = useMemo(() => {
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
          gap: "8px",
          height: "100%",
          padding: "8px 16px",
          border: "1px solid var(--gray-150)",
        }}
      >
        {isPending ? (
          <span
            style={{
              backgroundColor: "var(--gray-150)",
              padding: "16px",
              borderRadius: "2px",
              width: "100%",
              height: "100%",
              animation: "shimmer 2s infinite",
            }}
          />
        ) : (
          Object.values(filteredAssetsAndLocationsTree || {})?.map((value) => (
            <UnitSection key={value?.id} unit={value} />
          ))
        )}
      </div>
    </div>
  );
};

export default memo(TreeRender);
