import { useSearchParams } from "next/navigation";
import {
  useGetCompanyAssets,
  useGetCompanyAssetsLocations,
  useMapTree,
  useSetSearchParamsQuery,
} from "@/hooks";
import UnitSection from "../unit-section";
import SearchIcon from "@/assets/search.svg";
import { memo, useEffect, useMemo } from "react";
import Image from "next/image";
import { IAsset } from "@/types";
import { debounce } from "@/utils";

const TreeRender = () => {
  const { setSearchParam } = useSetSearchParamsQuery();
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

  const getParentPrior = (parent?: IAsset): Partial<IAsset | undefined> => {
    if (!parent?.id) return {};
    if (tree?.[parent?.id]) {
      tree[parent.id].isOpened = true;
    }

    if (!parent?.parentId && !parent?.locationId) {
      return { [parent.id]: { ...parent, isOpened: true } };
    }

    if (parent?.parentId) {
      return getParentPrior(tree?.[parent?.parentId]);
    }
    if (parent?.locationId) {
      return getParentPrior(tree?.[parent?.locationId]);
    }
  };
  const findLocationOrAsset = (unit: IAsset) => {
    if (!unit) return {};

    if (unit?.parentId || unit?.locationId) {
      return getParentPrior(unit);
    }

    return { [unit?.id]: tree?.[unit?.id] };
  };
  const filteredTree = useMemo(() => {
    const treeCopy = { ...tree };

    if (filterInput) {
      const filteredLocation = locations?.find((location) =>
        location.name.toLowerCase().includes(filterInput.toLowerCase())
      );
      if (filteredLocation && tree?.[filteredLocation?.id]) {
        return findLocationOrAsset(filteredLocation);
      }

      const filteredAsset = assets?.find((asset) =>
        asset.name.toLowerCase().includes(filterInput.toLowerCase())
      );
      if (filteredAsset && tree?.[filteredAsset?.id]) {
        return findLocationOrAsset(filteredAsset);
      }
    }

    for (const unit in treeCopy) {
      if (treeCopy[unit].parentId || treeCopy[unit].locationId) {
        delete treeCopy[unit];
      }
    }
    return treeCopy;
  }, [assets, locations, tree, filterInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) return;
    setSearchParam("filterInput", value);
  };
  const handleInputChangeDebounced = debounce(
    handleInputChange as () => void,
    500
  );

  useEffect(() => {
    setSearchParam("filterInput", "");

    const input = document.getElementById(
      "input-filter-tree"
    ) as HTMLInputElement;
    if (input?.value) {
      input.value = "";
    }
  }, [companyId]);

  return (
    <section
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
        <input
          type="text"
          onChange={handleInputChangeDebounced}
          placeholder="Buscar Ativo ou Local"
          style={{
            width: "100%",
            border: "none",
            padding: "8px",
          }}
        />
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
        {Object.values(filteredTree || {})?.map((value) => (
          <UnitSection key={value?.id} unit={value} />
        ))}
      </div>
    </section>
  );
};

export default memo(TreeRender);
