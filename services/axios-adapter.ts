import { companiesMock, assetsMock, locationsMock } from "@/mocks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 1000 });

type TMockKeyType = "companies" | "assets" | "locations";
const mockList: Record<TMockKeyType, any> = {
  companies: companiesMock,
  assets: assetsMock,
  locations: locationsMock,
};

mock.onGet().reply((config) => {
  const URL_ROUTE = config?.url?.split("/")?.pop() as TMockKeyType;

  if (URL_ROUTE === "companies") {
    return [200, mockList.companies];
  }

  const splittedConfig = config?.url?.split("/") || [];
  const URL_COMPANY_ID: string =
    splittedConfig?.[splittedConfig.length - 2] || "";

  return [200, mockList?.[URL_ROUTE]?.[URL_COMPANY_ID]];
});

export default axios;
