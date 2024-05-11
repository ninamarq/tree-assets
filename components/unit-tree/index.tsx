import { memo } from "react";
import { useSearchParams } from "next/navigation";
import { ComponentDisplay, TreeRender } from "./components";

const UnitTree = () => {
  const searchParams = useSearchParams();

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        margin: "8px",
        padding: "16px",
        backgroundColor: "var(--white)",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <h2>Ativos</h2>
        <span
          style={{
            color: "var(--gray-250)",
          }}
        >
          / {searchParams.get("companyName")}
        </span>
      </div>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gridTemplateRows: "1fr",
          gap: "8px",
          minHeight: "80vh",
        }}
      >
        <TreeRender />
        <ComponentDisplay />
      </section>
    </main>
  );
};

export default memo(UnitTree);
