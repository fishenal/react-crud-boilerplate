import { PlayerListReq } from "../types";

export async function getPlayers({
  page = "0",
  size = "5",
  team,
}: PlayerListReq) {
  const queryStr = new URLSearchParams({
    page,
    size,
    team,
  }).toString();
  const res = await fetch(`/playerApi?${queryStr}`, {
    method: "GET",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  console.log("🚀 ~ file: fetchPlayers.ts:15 ~ res:", res);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
