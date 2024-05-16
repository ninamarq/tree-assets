import React, { memo, useEffect, useMemo, useState } from "react";
import Arrow from "@/assets/down-arrow.svg";
import Image from "next/image";
import { LocationUnit, AssetUnit, ComponentUnit } from "./components";
import { IAsset, ILocation } from "@/types";
import { useSearchParamsQuery } from "@/hooks";

interface IUnitSectionProps {
  unit: ILocation | IAsset;
}

const UnitSection: React.FC<IUnitSectionProps> = (props: IUnitSectionProps) => {
  const { getFiltersParams } = useSearchParamsQuery();
  const filtersParams = getFiltersParams();

  const [isChildrenVisible, setIsChildrenVisible] = useState<boolean>(false);

  const hasChildren = props.unit?.children?.length > 0;
  const typeHashRender = {
    location: () => <LocationUnit location={props.unit as ILocation} />,
    asset: () => <AssetUnit asset={props.unit as IAsset} />,
    component: () => <ComponentUnit component={props.unit as IAsset} />,
  };
  const hideUnit = useMemo(() => {
    const unit = props.unit as IAsset | undefined;

    if (!unit) {
      return true;
    }

    for (let key in filtersParams) {
      const currentKey = key as keyof IAsset;

      const unitValueToLowerCase = String(unit[currentKey])?.toLowerCase();
      const filterValueToLowerCase = filtersParams[currentKey].toLowerCase();

      if (
        !unitValueToLowerCase.includes(filterValueToLowerCase) &&
        !unit.isOpened
      ) {
        return true;
      }
    }

    return false;
  }, [filtersParams]);

  useEffect(() => {
    if (!filtersParams) return;

    if (props.unit.isOpened) {
      setIsChildrenVisible(true);
      return;
    }
  }, [filtersParams]);

  return (
    <div
      style={{
        display: hideUnit ? "none" : "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        gap: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "8px",
          width: "100%",
        }}
      >
        {hasChildren && (
          <Image
            alt="Arrow drop children icon"
            src={Arrow}
            onClick={() => {
              setIsChildrenVisible((prevState) => !prevState);
            }}
            width={12}
            priority
            loading="eager"
            style={{
              ...(!isChildrenVisible && { transform: "rotate(-90deg)" }),
              cursor: "pointer",
              transition: "0.5s",
            }}
          />
        )}
        {typeHashRender[props.unit.typeHash]()}
      </div>
      {hasChildren && isChildrenVisible && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "8px 0 8px 24px",
          }}
        >
          {props.unit?.children?.map((child) => (
            <UnitSection key={child.id} unit={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(UnitSection);
