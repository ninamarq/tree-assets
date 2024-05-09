import { useSearchParams } from "next/navigation";
import {
  useGetCompanyAssets,
  useGetCompanyAssetsLocations,
  useMapTree,
} from "@/hooks";
import UnitSection from "../unit-section";

const TreeRender = () => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") || "";
  const { data: locations } = useGetCompanyAssetsLocations(companyId);
  const { data: assets } = useGetCompanyAssets(companyId);
  const { data: tree } = useMapTree({
    locations,
    assets,
    currentCompanyId: companyId,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "8px 16px",
        border: "1px solid var(--gray-150)",
      }}
    >
      {Object.values(tree || {})?.map((value) => (
        <UnitSection key={value.id} unit={value} />
      ))}
    </div>
  );
};

export default TreeRender;
