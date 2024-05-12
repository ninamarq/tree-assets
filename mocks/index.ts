import { companiesMock } from "./companies";
import assetsAndLocationsMock from "./api-data.json";
import { IAsset } from "@/types";

const getEquipmentTypeMock = (sensorType: IAsset["sensorType"]) => {
  if (!sensorType) return "Sem informação";

  const sensorHash = {
    energy: "Motor Elétrico (Trifásico)",
    vibration: "Sensor de Vibração Motorizada",
  };
  return sensorHash[sensorType];
};
const getResponsibleLabelMock = (sensorType: IAsset["sensorType"]) => {
  if (!sensorType) return "Sem informação";

  const sensorHash = {
    energy: "Elétrica",
    vibration: "Mecânica",
  };
  return sensorHash[sensorType];
};

export {
  companiesMock,
  assetsAndLocationsMock,
  getEquipmentTypeMock,
  getResponsibleLabelMock,
};
