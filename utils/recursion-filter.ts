import { IAsset, ILocation } from "@/types";

type TFilterParams = {
  filterInput: string;
  tree?: Record<string, IAsset>;
  locations?: Array<ILocation>;
  assets?: Array<IAsset>;
};

const getParentPrior = (
  tree: TFilterParams["tree"],
  parent?: IAsset
): Partial<IAsset | undefined> => {
  if (!parent?.id) return {};
  if (tree?.[parent?.id]) {
    tree[parent.id].isOpened = true;
  }

  if (!parent?.parentId && !parent?.locationId) {
    return { [parent.id]: { ...parent, isOpened: true } };
  }

  if (parent?.parentId) {
    return getParentPrior(tree, tree?.[parent?.parentId]);
  }
  if (parent?.locationId) {
    return getParentPrior(tree, tree?.[parent?.locationId]);
  }
};
const findLocationOrAsset = (unit: IAsset, tree: TFilterParams["tree"]) => {
  if (!unit) return {};

  if (unit?.parentId || unit?.locationId) {
    return getParentPrior(tree, unit);
  }

  return { [unit?.id]: tree?.[unit?.id] };
};
const filterAssetsAndLocationsByFilterInput = ({
  tree,
  locations,
  assets,
  filterInput,
}: TFilterParams) => {
  const filteredLocation = locations?.find((location) =>
    location.name.toLowerCase().includes(filterInput.toLowerCase())
  );
  if (filteredLocation && tree?.[filteredLocation?.id]) {
    return findLocationOrAsset(filteredLocation, tree);
  }

  const filteredAsset = assets?.find((asset) =>
    asset.name.toLowerCase().includes(filterInput.toLowerCase())
  );
  if (filteredAsset && tree?.[filteredAsset?.id]) {
    return findLocationOrAsset(filteredAsset, tree);
  }
};

export { filterAssetsAndLocationsByFilterInput };
