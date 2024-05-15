import { IAsset, ILocation } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useMapTree({
  currentCompanyId,
  locations,
  assets,
}: {
  currentCompanyId: string;
  locations?: Array<ILocation>;
  assets?: Array<IAsset>;
}) {
  const getMappedTree = () => {
    if (!locations || !assets) return {};
    const mappedHash: Record<string, IAsset> = {};

    for (const location of locations) {
      mappedHash[location.id] = {
        ...location,
        children: [],
        typeHash: "location",
      };
    }
    for (const asset of assets) {
      mappedHash[asset.id] = {
        ...asset,
        children: [],
        typeHash: asset?.sensorType ? "component" : "asset",
      };
    }

    for (const unitId in mappedHash) {
      const currentUnit = mappedHash[unitId];
      const parentId = currentUnit?.parentId || currentUnit?.locationId || "";

      if (parentId) {
        const currentParent = mappedHash[parentId];
        if (currentParent) {
          currentParent.children?.push(currentUnit);
        }
      }
    }

    return mappedHash;
  };

  return useQuery({
    queryKey: ["mapped-tree", { currentCompanyId }],
    queryFn: () => getMappedTree(),
    enabled: Boolean(currentCompanyId && locations && assets),
  });
}
