import { useSetSearchParamsQuery } from "@/hooks";
import { useSearchParams } from "next/navigation";

const BoltOutlinedSvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9999 5.27216H9.06594L12.6034 0.802516C12.6767 0.707874 12.6106 0.570374 12.4909 0.570374H5.64273C5.59273 0.570374 5.54451 0.597159 5.51951 0.641802L0.892729 8.63287C0.837371 8.72752 0.905228 8.84716 1.01594 8.84716H4.13023L2.5338 15.2329C2.49987 15.3722 2.66773 15.4704 2.7713 15.3704L13.0981 5.5168C13.1909 5.4293 13.1284 5.27216 12.9999 5.27216ZM4.61059 11.9364L5.68737 7.63287H2.87666L6.26237 1.78645H10.2731L6.55344 6.48823H10.3213L4.61059 11.9364Z"
        fill={color}
      />
    </svg>
  );
};
const InfoSvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0C3.13437 0 0 3.13437 0 7C0 10.8656 3.13437 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13437 10.8656 0 7 0ZM7 12.8125C3.79063 12.8125 1.1875 10.2094 1.1875 7C1.1875 3.79063 3.79063 1.1875 7 1.1875C10.2094 1.1875 12.8125 3.79063 12.8125 7C12.8125 10.2094 10.2094 12.8125 7 12.8125Z"
        fill={color}
      />
      <path
        d="M6.24976 9.75C6.24976 9.94891 6.32877 10.1397 6.46943 10.2803C6.61008 10.421 6.80084 10.5 6.99976 10.5C7.19867 10.5 7.38943 10.421 7.53009 10.2803C7.67074 10.1397 7.74976 9.94891 7.74976 9.75C7.74976 9.55109 7.67074 9.36032 7.53009 9.21967C7.38943 9.07902 7.19867 9 6.99976 9C6.80084 9 6.61008 9.07902 6.46943 9.21967C6.32877 9.36032 6.24976 9.55109 6.24976 9.75ZM6.62476 8H7.37476C7.44351 8 7.49976 7.94375 7.49976 7.875V3.625C7.49976 3.55625 7.44351 3.5 7.37476 3.5H6.62476C6.55601 3.5 6.49976 3.55625 6.49976 3.625V7.875C6.49976 7.94375 6.55601 8 6.62476 8Z"
        fill={color}
      />
    </svg>
  );
};

const UnitHeader = () => {
  const searchParams = useSearchParams();
  const { setSearchParam } = useSetSearchParamsQuery();
  const commonSpanStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };
  const selectedColors = {
    backgroundColor: "var(--primary-blue-color)",
    color: "var(--white)",
  };

  return (
    <div style={{ ...commonSpanStyle, justifyContent: "space-between" }}>
      <span style={commonSpanStyle}>
        <h2>Ativos</h2>
        <p
          style={{
            color: "var(--gray-250)",
          }}
        >
          / {searchParams.get("companyName")}
        </p>
      </span>
      <div style={commonSpanStyle}>
        <button
          className="filter-button-tree"
          style={{
            ...(searchParams.get("sensorType") === "energy" && selectedColors),
          }}
          onClick={() => {
            if (searchParams.get("sensorType")) {
              setSearchParam("sensorType", "");
              return;
            }
            setSearchParam("sensorType", "energy");
          }}
        >
          <BoltOutlinedSvg color={selectedColors.color} />
          <h3>Sensor de energia</h3>
        </button>
        <button
          className="filter-button-tree"
          style={{
            ...(searchParams.get("status") === "alert" && selectedColors),
          }}
          onClick={() => {
            if (searchParams.get("status")) {
              setSearchParam("status", "");
              return;
            }
            setSearchParam("status", "alert");
          }}
        >
          <InfoSvg color={selectedColors.color} />
          <h3>Crítico</h3>
        </button>
      </div>
    </div>
  );
};

export default UnitHeader;
