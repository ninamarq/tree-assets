import { useMapTree } from "@/hooks";
import { SensorIcon } from "@/utils";
import { useSearchParams } from "next/navigation";
import SensorSvg from "@/assets/sensor.svg";
import ReceptorSvg from "@/assets/receptor.svg";
import Image from "next/image";
import { ImageSimulation } from "./components";
import { getEquipmentTypeMock, getResponsibleLabelMock } from "@/mocks";

const ComponentDisplay = () => {
  const searchParams = useSearchParams();
  const { data: tree } = useMapTree({
    currentCompanyId: searchParams.get("companyId") || "",
  });
  const currentComponent = tree?.[searchParams.get("selectedUnit") || ""];
  const statusColor =
    currentComponent?.status === "operating"
      ? "var(--primary-green-color)"
      : "var(--primary-red-color)";
  const responsibleMock = getResponsibleLabelMock(currentComponent?.sensorType);

  return (
    <div style={{ border: "1px solid var(--gray-150)" }}>
      <header
        style={{
          padding: "16px",
          borderBottom: "1px solid var(--gray-150)",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "8px",
        }}
      >
        {currentComponent && (
          <>
            <h3>{currentComponent?.name}</h3>
            <SensorIcon
              sensorType={currentComponent?.sensorType!}
              statusColor={statusColor}
            />
          </>
        )}
      </header>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "32px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gridTemplateRows: "1fr",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <ImageSimulation sensorType={currentComponent?.sensorType} />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <span
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <h4>Tipo de equipamento</h4>
              <p style={{ color: "var(--gray-350)" }}>
                {getEquipmentTypeMock(currentComponent?.sensorType)}
              </p>
            </span>
            <hr
              style={{
                backgroundColor: "var(--gray-150)",
                height: "1px",
                border: "none",
              }}
            />
            <span
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <h4>Responsáveis</h4>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  color: "var(--gray-350)",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    color: "var(--white)",
                    backgroundColor: "var(--primary-blue-color)",
                    padding: "4px",
                    borderRadius: "100%",
                    width: "24px",
                    height: "24px",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  {responsibleMock[0]?.toUpperCase()}
                </div>
                {responsibleMock}
              </span>
            </span>
          </div>
        </div>
        <hr
          style={{
            backgroundColor: "var(--gray-150)",
            height: "1px",
            border: "none",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <h4>Sensor</h4>
            <span
              style={{ display: "flex", color: "var(--gray-350)", gap: "8px" }}
            >
              <Image src={SensorSvg} width={20} alt="Sensor icon" />
              {currentComponent?.sensorId || "Sem informação"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <h4>Receptor</h4>
            <span
              style={{ display: "flex", color: "var(--gray-350)", gap: "8px" }}
            >
              <Image src={ReceptorSvg} width={20} alt="Sensor icon" />
              {currentComponent?.gatewayId || "Sem informação"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentDisplay;
