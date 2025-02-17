"use client";

import McqCard from "@/components/mcq-card";
import { DataContext } from "@/context/data-context";
import { useContext } from "react";

export default function MCQsPage() {
  const { data } = useContext(DataContext);

  return (
    <div>
      <McqCard questions={data.questions} topic={data.topic} />
    </div>
  );
}
