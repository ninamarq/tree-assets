import axios from "@/services/axios-adapter";
import { IAsset, ICompany, ILocation } from "@/types";

const getCompanies = async (): Promise<Array<ICompany>> => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies`;
  const response = await axios.get(URL);

  return response.data;
};

const getCompanyAssets = async (companyId: string): Promise<Array<IAsset>> => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/${companyId}/assets`;
  const response = await axios.get(URL);

  return response.data;
};

const getCompanyAssetsLocations = async (
  companyId: string
): Promise<Array<ILocation>> => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/${companyId}/locations`;
  const response = await axios.get(URL);

  return response.data;
};

export { getCompanies, getCompanyAssets, getCompanyAssetsLocations };
