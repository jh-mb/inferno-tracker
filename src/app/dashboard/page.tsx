import React from "react";
import { DataTableDemo } from "./datatable";
import prisma from "@/lib/prisma";

async function DashboardPage() {
  const trackers = await prisma.tracker.findMany();

  console.log(trackers);
  return (
    <div>
      {/* <div>hola</div> */}
      <DataTableDemo data={trackers} />
    </div>
  );
}

export default DashboardPage;
