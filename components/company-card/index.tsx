import { ICompany } from "@/types";
import React from "react";
import TreeIcon from "@/assets/tree.svg";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface ICompanyCardProps {
  company: ICompany;
  handleSelectCompany: (company: ICompany) => void;
}

const CompanyCard: React.FC<ICompanyCardProps> = (props: ICompanyCardProps) => {
  const searchParams = useSearchParams();
  const isCompanySelected = (id: string) =>
    searchParams.get("companyId") === id;

  return (
    <div
      key={props.company?.id}
      style={{
        backgroundColor: isCompanySelected(props.company?.id)
          ? "var(--primary-blue-color)"
          : "var(--secondary-blue-color)",
        padding: "4px 8px 4px 8px",
        color: "var(--white)",
        fontWeight: 600,
        fontSize: "0.9rem",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "2px",
        cursor: "pointer",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.opacity = "0.8";
        event.currentTarget.style.transition = "0.5s";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.opacity = "1";
        event.currentTarget.style.transition = "0.5s";
      }}
      onClick={() => props.handleSelectCompany(props.company)}
    >
      <Image alt="Company icon" src={TreeIcon} width={14} />
      {props.company?.name}
    </div>
  );
};

export default CompanyCard;
