import {
  PlayerAddReq,
  PlayerDeleteReq,
  PlayerEditReq,
  PlayerListReq,
} from "../types";

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
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function deletePlayer({ id }: PlayerDeleteReq) {
  const res = await fetch(`/playerApi`, {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function addPlayer(params: PlayerAddReq) {
  const res = await fetch(`/playerApi`, {
    method: "POST",
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function editPlayer(params: PlayerEditReq) {
  const res = await fetch(`/playerApi/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
