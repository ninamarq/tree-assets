import { useQuery } from "@tanstack/react-query";

export default function useMapTree({
  currentCompanyId,
  locations,
  assets,
}: {
  currentCompanyId: string;
  locations: any;
  assets: any;
}) {
  const getMappedTree = () => {
    const mappedHash: Record<string, any> = {};

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

      if (currentUnit.parentId) {
        const currentParent = mappedHash[currentUnit.parentId];
        if (currentParent) {
          currentParent.children?.push(currentUnit);
        }
      }

      if (currentUnit.locationId) {
        const currentLocation = mappedHash[currentUnit.locationId];
        if (currentLocation) {
          currentLocation.children?.push(currentUnit);
        }
      }
    }
    for (const unit in mappedHash) {
      if (mappedHash[unit].parentId || mappedHash[unit].locationId) {
        delete mappedHash[unit];
      }
    }

    return mappedHash;
  };

  return useQuery({
    queryKey: ["mapped-tree", { currentCompanyId }],
    queryFn: () => getMappedTree(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: Boolean(currentCompanyId && locations && assets),
  });
}
