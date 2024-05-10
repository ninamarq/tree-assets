import { useSearchParams } from "next/navigation";
import {
  useGetCompanyAssets,
  useGetCompanyAssetsLocations,
  useMapTree,
} from "@/hooks";
import UnitSection from "../unit-section";
import SearchIcon from "@/assets/search.svg";
import { memo, useMemo, useState } from "react";
import Image from "next/image";
import { IAsset, ILocation } from "@/types";

const TreeRender = () => {
  const [filter, setFilter] = useState<string>("");

  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") || "";
  const { data: locations } = useGetCompanyAssetsLocations(companyId);
  const { data: assets } = useGetCompanyAssets(companyId);
  const { data: tree } = useMapTree({
    locations,
    assets,
    currentCompanyId: companyId,
  });

  const getParentPrior = (parent?: IAsset): Partial<IAsset | undefined> => {
    if (!parent?.id) return {};
    if (!parent?.parentId && !parent?.locationId) {
      return { [parent.id]: parent };
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

    if (filter) {
      const filteredLocation = locations?.find((location) =>
        location.name.toLowerCase().includes(filter.toLowerCase())
      );
      if (filteredLocation && tree?.[filteredLocation?.id]) {
        return findLocationOrAsset(filteredLocation);
      }

      const filteredAsset = assets?.find((asset) =>
        asset.name.toLowerCase().includes(filter.toLowerCase())
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
  }, [assets, filter, locations, tree]);

  const debounce = (callback: () => void, delay: number) => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, args), delay);
    };
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter(value);
  };
  const handleInputChangeDebounced = debounce(
    handleInputChange as () => void,
    500
  );

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
          <UnitSection
            key={value?.id}
            unit={value}
            needChildrenOpen={filter?.length > 0}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(TreeRender);
