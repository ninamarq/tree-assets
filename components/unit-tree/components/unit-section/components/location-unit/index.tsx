import LocationIcon from "@/assets/location.svg";
import { ILocation } from "@/types";
import Image from "next/image";
import React from "react";

interface ILocationUnitProps {
  location: ILocation;
}

const LocationUnit: React.FC<ILocationUnitProps> = (
  props: ILocationUnitProps
) => {
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
        alt="Location icon"
        src={LocationIcon}
        width={16}
        loading="eager"
        priority
      />
      {props.location.name}
    </div>
  );
};

export default LocationUnit;
