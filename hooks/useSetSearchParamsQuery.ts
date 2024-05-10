import { ICompany } from "@/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function useSetSearchParamsQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    const NEW_URL = `${pathname}?${params.toString()}`;
    router.push(NEW_URL);
  };

  const updateHeaderParams = (company: ICompany) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("companyId", company.id);
    params.set("companyName", company.name);
    params.set("filterInput", "");

    const input = document.getElementById(
      "input-filter-tree"
    ) as HTMLInputElement;
    if (input?.value) {
      input.value = "";
    }

    const NEW_URL = `${pathname}?${params.toString()}`;
    router.push(NEW_URL);
  };

  return { setSearchParam, updateHeaderParams };
}
