import { memo } from "react";
import { ComponentDisplay, TreeRender, UnitHeader } from "./components";

const UnitTree = () => {
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
      <UnitHeader />
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
