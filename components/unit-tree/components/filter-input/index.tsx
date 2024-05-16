import { useSearchParamsQuery } from "@/hooks";
import { debounce } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const FilterInput = () => {
  const searchParams = useSearchParams();
  const { setSearchParam } = useSearchParamsQuery();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchParam("name", value);
  };
  const handleInputChangeDebounced = debounce(
    handleInputChange as () => void,
    500
  );

  useEffect(() => {
    const nameInputValue = searchParams.get("name");
    if (nameInputValue) {
      const input = document.getElementById(
        "input-filter-tree"
      ) as HTMLInputElement;
      input.value = nameInputValue;
    }
  }, []);

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
        backgroundColor: "var(--white)",
        color: "var(--primary-black-color)",
      }}
    />
  );
};

export default FilterInput;
