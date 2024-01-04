export type TeamName =
  | "MEX"
  | "ARG"
  | "KSA"
  | "GHA"
  | "JPN"
  | "QAT"
  | "ECU"
  | "BRA"
  | "AUS"
  | "ESP"
  | "KOR"
  | "URU"
  | "CMR"
  | "CRC"
  | "WAL"
  | "CAN"
  | "USA"
  | "ENG"
  | "POR"
  | "TUN"
  | "MAR"
  | "SUI"
  | "IRN"
  | "NED"
  | "POL"
  | "CRO"
  | "SEN"
  | "BEL"
  | "GER"
  | "FRA"
  | "DEN"
  | "SRB";
export interface PlayerItem {
  position: string;
  birthDate: string;
  jerseyNum: number;
  name: string;
  picture: string;
  weight: number;
  height: number;
  country: string;
  age: number;
}

export interface PlayerItemWithID extends PlayerItem {
  id: string;
}
export interface PlayerListReq {
  team: TeamName;
  page?: string;
  size?: string;
}

export interface PlayerAddReq extends PlayerItem {}

export interface PlayerEditReq extends PlayerItem {
  id: string;
}
export interface PlayerDeleteReq {
  id: string;
}
