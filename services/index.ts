import axios from "@/services/axios-adapter";
import { ICompany } from "@/types";

const getCompanies = async (): Promise<Array<ICompany>> => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies`;
  const response = await axios.get(URL);

  return response.data;
};

const getCompanyAssets = async (companyId: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/${companyId}/assets`;
  const response = await axios.get(URL);

  return response.data;
};

const getCompanyAssetsLocations = async (companyId: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/${companyId}/locations`;
  const response = await axios.get(URL);

  return response.data;
};

export { getCompanies, getCompanyAssets, getCompanyAssetsLocations };
