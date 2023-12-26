import { redirect } from "next/navigation";
export default function Home() {
  redirect("/playerList");
  return null;
}
