import React, { memo, useState } from "react";
import Arrow from "@/assets/down-arrow.svg";
import Image from "next/image";
import LocationUnit from "../location-unit";
import AssetUnit from "../asset-unit";
import ComponentUnit from "../component-unit";
import { IAsset, ILocation } from "@/types";

interface IUnitSectionProps {
  unit: ILocation | IAsset;
}

const UnitSection: React.FC<IUnitSectionProps> = (props: IUnitSectionProps) => {
  const [isChildrenVisible, setIsChildrenVisible] = useState<boolean>(false);
  const hasChildren = props.unit?.children?.length > 0;
  const typeHashRender = {
    location: () => <LocationUnit location={props.unit as ILocation} />,
    asset: () => <AssetUnit asset={props.unit as IAsset} />,
    component: () => <ComponentUnit component={props.unit as IAsset} />,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "8px",
        }}
      >
        {hasChildren && (
          <Image
            alt="Arrow drop children icon"
            src={Arrow}
            onClick={() => setIsChildrenVisible((prevState) => !prevState)}
            width={12}
            style={{
              ...(!isChildrenVisible && { transform: "rotate(-90deg)" }),
              cursor: "pointer",
              transition: "0.5s",
            }}
          />
        )}
        {typeHashRender[props.unit.typeHash]()}
      </div>
      {isChildrenVisible && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "8px",
            padding: "8px 0 8px 24px",
          }}
        >
          {hasChildren &&
            props.unit?.children?.map((child) => (
              <UnitSection key={child.id} unit={child} />
            ))}
        </div>
      )}
    </div>
  );
};

export default memo(UnitSection);
