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

  const { data: locations } = useGetCompanyAssetsLocations(companyId);
  const { data: assets } = useGetCompanyAssets(companyId);
  const { data: tree } = useMapTree({
    locations,
    assets,
    currentCompanyId: companyId,
  });

  const filteredAssetsAndLocationsTree = useMemo(() => {
    const treeCopy = { ...tree };

    if (filterInput) {
      return filterAssetsAndLocationsByFilterInput({
        assets,
        locations,
        tree,
        filterInput,
      });
    }

    for (const unit in treeCopy) {
      if (treeCopy[unit].parentId || treeCopy[unit].locationId) {
        delete treeCopy[unit];
      }
    }
    return treeCopy;
  }, [assets, locations, tree, filterInput]);

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
        {Object.values(filteredAssetsAndLocationsTree || {})?.map((value) => (
          <UnitSection key={value?.id} unit={value} />
        ))}
      </div>
    </div>
  );
};

export default memo(TreeRender);
