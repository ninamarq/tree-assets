import Image from "next/image";
import { useGetCompanies, useSetSearchParamsQuery } from "@/hooks";
import TractianLogo from "@/assets/tractian.svg";
import { useEffect, useMemo } from "react";
import { CompanyCard } from "@/components";
import { useSearchParams } from "next/navigation";

const TreeHeader = () => {
  const searchParams = useSearchParams();

  const { updateHeaderParams } = useSetSearchParamsQuery();
  const { data: companies, isFetching } = useGetCompanies();

  const renderCompaniesData = useMemo(() => {
    if (isFetching) {
      return (
        <span
          style={{
            backgroundColor: "var(--secondary-blue-color)",
            padding: "12px",
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
          handleSelectCompany={updateHeaderParams}
        />
      ));
    }

    return;
  }, [companies, isFetching]);

  useEffect(() => {
    if (!companies || companies?.length === 0) return;
    if (!searchParams.get("companyId")) {
      updateHeaderParams(companies[0]);
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
        gap: "16px",
      }}
    >
      <Image
        alt="Tractian Logo header"
        src={TractianLogo}
        priority
        loading="eager"
        width={100}
        height={20}
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
