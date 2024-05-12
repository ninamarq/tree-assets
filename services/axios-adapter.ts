import { companiesMock, assetsAndLocationsMock } from "@/mocks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 1500 });

type TMockKeyType = "companies" | "assets" | "locations";

mock.onGet().reply((config) => {
  const URL_ROUTE = config?.url?.split("/")?.pop() as TMockKeyType;

  if (URL_ROUTE === "companies") {
    return [200, companiesMock];
  }

  const splittedConfig = config?.url?.split("/") || [];
  const URL_COMPANY_ID = splittedConfig?.[splittedConfig.length - 2] || "";

  return [200, (assetsAndLocationsMock as any)?.[URL_COMPANY_ID]?.[URL_ROUTE]];
});

export default axios;
