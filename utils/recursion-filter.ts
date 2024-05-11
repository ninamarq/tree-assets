import { IAsset } from "@/types";

type TFilterParams = {
  filterInput: string;
  tree?: Record<string, IAsset>;
};

const getPriorParentRecursion = (
  tree: TFilterParams["tree"],
  parent?: IAsset
): Partial<IAsset | undefined> => {
  if (!parent?.id || !tree) return {};
  if (tree?.[parent?.id]) {
    tree[parent.id].isOpened = true;
  }

  if (!parent?.parentId && !parent?.locationId) {
    return { [parent.id]: { ...parent, isOpened: true } };
  }

  const parentId = parent.parentId || parent.locationId || "";
  if (tree[parentId]) {
    tree[parentId].children = [parent];
  }

  return getPriorParentRecursion(tree, tree?.[parentId]);
};

const getFilteredTree = (unit?: IAsset, tree?: TFilterParams["tree"]) => {
  if (!unit) return {};

  if (unit?.parentId || unit?.locationId) {
    return getPriorParentRecursion(tree, unit);
  }

  return { [unit?.id]: tree?.[unit?.id] };
};

const filterAssetsAndLocationsByFilterInput = ({
  tree,
  filterInput,
}: TFilterParams) => {
  if (!tree) return {};

  const filterInputToLowerCase = filterInput.toLowerCase();
  const filteredUnit = Object.values(tree)?.find((unit) =>
    unit?.name?.toLocaleLowerCase().includes(filterInputToLowerCase)
  );

  return getFilteredTree(filteredUnit, tree);
};

export { filterAssetsAndLocationsByFilterInput };
