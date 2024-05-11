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
      <section id="display-unit-tree">
        <TreeRender />
        <ComponentDisplay />
      </section>
    </main>
  );
};

export default memo(UnitTree);
