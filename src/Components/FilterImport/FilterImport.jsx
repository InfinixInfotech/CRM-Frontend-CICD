import React from "react";
import LeadSourceFilter from "../Filter/LeadSourceFilter/LeadSourceFilter";
import ManagerFilter from "../Filter/ManagerFilter/ManagerFilter";
import SegmentFilter from "../Filter/SegmentFilter/SegmentFilter";
import AssignedFilter from "../Filter/AssignedFilter/AssignedFilter";
import ActionFilter from "../Filter/ActionFilter/ActionFilter";
import StatusFilter from "../Filter/StatusFilter/StatusFilter";

export default function FilterImport() {
  return (
    <div>
      <div
      className="bg-white border border-2 p-4 ps-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)", // 3 columns of equal width
          gridTemplateRows: "repeat(1, auto)", // 2 rows with height based on content
          gap:"5px",
        }}
      >
        <LeadSourceFilter />
        <ManagerFilter />
        <SegmentFilter />
        <AssignedFilter />
        <ActionFilter />
        <StatusFilter />
      </div>
    </div>
  );
}
