import AssetIcon from "@/assets/assets.svg";
import { IAsset } from "@/types";
import Image from "next/image";
import React from "react";

interface IAssetUnitProps {
  asset: IAsset;
}

const AssetUnit: React.FC<IAssetUnitProps> = (props: IAssetUnitProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "8px",
      }}
    >
      <Image
        alt="Asset icon"
        src={AssetIcon}
        width={16}
        loading="eager"
        priority
      />
      {props.asset.name}
    </div>
  );
};

export default AssetUnit;
