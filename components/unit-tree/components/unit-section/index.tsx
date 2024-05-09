import React, { memo, useState } from "react";
import LocationIcon from "@/assets/location.svg";
import AssetsIcon from "@/assets/assets.svg";
import Arrow from "@/assets/down-arrow.svg";
import Image from "next/image";

interface IUnitSectionProps {
  unit: any;
}

const UnitSection: React.FC<IUnitSectionProps> = (props: IUnitSectionProps) => {
  const [isChildrenVisible, setIsChildrenVisible] = useState<boolean>(false);
  const hasChildren = props.unit?.children?.length > 0;
  const iconHash = {
    location: (
      <Image
        alt="Location icon"
        src={LocationIcon}
        width={16}
        loading="eager"
        priority
      />
    ),
    asset: (
      <Image
        alt="Asset icon"
        src={AssetsIcon}
        width={16}
        loading="eager"
        priority
      />
    ),
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
            alt="Location icon"
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
        {iconHash[props.unit.typeHash]}
        {props.unit.name}
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
            props.unit?.children?.map((child: any) => (
              <UnitSection key={child.id} unit={child} />
            ))}
        </div>
      )}
    </div>
  );
};

export default memo(UnitSection);
