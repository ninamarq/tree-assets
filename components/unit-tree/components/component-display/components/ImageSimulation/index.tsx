import { IAsset } from "@/types";
import Image from "next/image";
import React, { useMemo } from "react";
import ValveSvg from "@/assets/valve.svg";
import MotorSvg from "@/assets/motor.svg";
import EmptyBoxSvg from "@/assets/empty-box.svg";

interface IImageSimulationProps {
  sensorType: IAsset["sensorType"];
}

const EmptyImageDisplay = () => {
  return (
    <div
      style={{
        width: "336px",
        height: "226px",
        backgroundColor: "var(--terciary-blue-color)",
        border: "2px dashed var(--primary-blue-color)",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        color: "var(--primary-blue-color)",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Image src={EmptyBoxSvg} alt="Empty box svg" width={30} />
      Adicionar imagem do Ativo
    </div>
  );
};

const ImageSimulation: React.FC<IImageSimulationProps> = (
  props: IImageSimulationProps
) => {
  const renderImageBySensor = useMemo(() => {
    if (!props.sensorType) {
      return <EmptyImageDisplay />;
    }

    const imageSimulation = {
      energy: () => (
        <Image
          src={MotorSvg}
          alt="Motor image"
          priority
          loading="eager"
          width={326}
          height={226}
        />
      ),
      vibration: () => (
        <Image
          src={ValveSvg}
          alt="Valve image"
          width={326}
          height={226}
          priority
          loading="eager"
        />
      ),
    };

    return imageSimulation[props.sensorType]();
  }, [props.sensorType]);

  return renderImageBySensor;
};

export default ImageSimulation;
