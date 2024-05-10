interface ICompany {
  id: string;
  name: string;
}

type TTypeHash = "location" | "asset" | "component";
type TStatusAsset = "alert" | "operating" | null;
type TSensorType = "vibration" | "energy" | null;

interface ILocation {
  id: string;
  name: string;
  parentId: string | null;
  typeHash: TTypeHash;
  children: Array<ILocation | IAsset>;
}

interface IAsset {
  id: string;
  name: string;
  parentId?: string | null;
  sensorId?: string | null;
  sensorType?: TSensorType;
  status?: TStatusAsset;
  gatewayId?: string | null;
  locationId?: string | null;
  typeHash: TTypeHash;
  children: Array<ILocation | IAsset>;
}

export type { ICompany, ILocation, IAsset };
