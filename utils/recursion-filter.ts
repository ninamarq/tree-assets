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
    return { ...parent, isOpened: true };
  }

  const parentId = parent.parentId || parent.locationId || "";
  return getPriorParentRecursion(tree, tree?.[parentId]);
};
const filterChildrenRecursion = (filterInput: string, child: IAsset) => {
  if (child && child?.children?.length === 0) return;

  const newChildren: Array<IAsset> = [];
  for (const element of child?.children) {
    if (element.children.length > 0) {
      filterChildrenRecursion(filterInput, element);
    }

    if (element.name.toLowerCase().includes(filterInput)) {
      newChildren.push(element);
    }
  }

  child.children = newChildren;
};

const getFilteredTree = (unit?: IAsset, tree?: TFilterParams["tree"]) => {
  if (!unit) return {};

  if (unit?.parentId || unit?.locationId) {
    return getPriorParentRecursion(tree, unit);
  }

  if (unit.children.length > 0) {
    unit.isOpened = true;
  }

  return tree?.[unit?.id];
};

const filterAssetsAndLocationsByFilterInput = ({
  tree,
  filterInput,
}: TFilterParams): Record<string, IAsset> => {
  if (!tree) return {};

  const filterInputToLowerCase = filterInput.toLowerCase();
  const filteredUnits = Object.values(tree)?.filter((unit) =>
    unit?.name?.toLocaleLowerCase().includes(filterInputToLowerCase)
  );

  let treeFiltered = {};
  for (let unit of filteredUnits) {
    const parentId = unit.parentId || unit.locationId || "";
    const unitToAnalyse = parentId ? tree?.[parentId] : unit;

    if (unitToAnalyse?.children?.length > 0) {
      filterChildrenRecursion(filterInput, unitToAnalyse as IAsset);
    }

    const parentPrior = getFilteredTree(unitToAnalyse, tree);
    if (parentPrior && parentPrior.id) {
      treeFiltered = { ...treeFiltered, [parentPrior.id]: parentPrior };
    }
  }

  return treeFiltered;
};

export { filterAssetsAndLocationsByFilterInput };
