"use client";

import McqCard from "@/components/mcq-card";
import { DataContext } from "@/context/data-context";
import { useContext } from "react";

export default function MCQsPage() {
  const { data } = useContext(DataContext);

  return (
    <div className="">
      <McqCard questions={data.questions} />
    </div>
  );
}
