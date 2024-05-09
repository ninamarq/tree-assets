import Image from "next/image";
import { useGetCompanies } from "@/hooks";
import TractianLogo from "@/assets/tractian.svg";
import { useEffect, useMemo } from "react";
import { CompanyCard } from "@/components";
import { ICompany } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TreeHeader = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data: companies, isFetching } = useGetCompanies();

  const handleCompanySelect = (company: ICompany) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("companyId", company.id);
    params.set("companyName", company.name);
    const NEW_URL = `${pathname}?${params.toString()}`;

    router.push(NEW_URL);
  };
  const renderCompaniesData = useMemo(() => {
    if (isFetching) {
      return (
        <span
          style={{
            backgroundColor: "var(--secondary-blue-color)",
            padding: "16px",
            height: "20px",
            borderRadius: "2px",
            width: "300px",
            animation: "shimmer 2s infinite",
          }}
        />
      );
    }

    const companiesLength = companies?.length || 0;
    if (!isFetching && companiesLength > 0) {
      return companies?.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          handleSelectCompany={handleCompanySelect}
        />
      ));
    }

    return;
  }, [companies, isFetching]);

  useEffect(() => {
    if (!companies || companies?.length === 0) return;

    if (!searchParams.get("companyId")) {
      handleCompanySelect(companies[0]);
    }
  }, [companies]);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "var(--main-header-background)",
        padding: "16px",
      }}
    >
      <Image
        alt="Tractian Logo header"
        src={TractianLogo}
        priority
        loading="eager"
        width={100}
      />
      <div
        id="companies-card-container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {renderCompaniesData}
      </div>
    </header>
  );
};

export default TreeHeader;
