import { useSetSearchParamsQuery } from "@/hooks";
import { debounce } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const FilterInput = () => {
  const { setSearchParam } = useSetSearchParamsQuery();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") || "";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchParam("filterInput", value);
  };
  const handleInputChangeDebounced = debounce(
    handleInputChange as () => void,
    500
  );

  useEffect(() => {
    setSearchParam("filterInput", "");

    const input = document.getElementById(
      "input-filter-tree"
    ) as HTMLInputElement;
    if (input?.value) {
      input.value = "";
    }
  }, [companyId]);

  return (
    <input
      id="input-filter-tree"
      type="text"
      onChange={handleInputChangeDebounced}
      placeholder="Buscar Ativo ou Local"
      style={{
        width: "100%",
        border: "none",
        padding: "8px",
      }}
    />
  );
};

export default FilterInput;
