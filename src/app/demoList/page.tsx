"use client";
import { useState } from "react";

export default function NewPages() {
  const [num] = useState(15);
  return <main>new Pages {num}</main>;
}
