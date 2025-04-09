import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllleadInfoThunk } from "../../../Redux/Services/thunks/AdditionalApiThunk"
import { Info } from 'lucide-react';
export default function LeadInfo() {
  const [LeadInfoData, setLeadInfoData] = useState([])
  const { data, loading, error } = useSelector((state) => state.additional);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllleadInfoThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      setLeadInfoData(data?.data)
    }
  }, [data])
  // console.log("LeadInfoDta",LeadInfoDta)
  return (

    <>
      <section
        style={{
          // position: "relative",
          // z-index: 1;
          zIndex: "1",
          // padding: "12px 30px",
          background: "#2c3e50",

          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "0px",
          marginBottom: "5px",
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-5 mb-2"
          style={{
            padding: "8px 10px",
            fontSize: "28px",
            color: "white",
          }}
        >
          <Info
            className="fs-1"
            style={{ marginRight: "8px", color: "white" }}
          />
          Lead Information
        </h2>
      </section>

      <div >
        <div className="table-responsive">
          <table
            id="table-dataOne"
            className="table table-responsive table-bordered table-hover  mt-2"
            style={{ fontSize: "12px" }}
          >
            <thead className="thead-dark">
              <tr>
                <th>Lead Source</th>
                <th>Total Count</th>
                <th>Assigned</th>
                <th>Unassigned</th>
              </tr>
            </thead>
            <tbody>
              {LeadInfoData?.leadSources &&
                Object.entries(LeadInfoData.leadSources).map(([source, details]) => (
                  <tr key={source}>
                    <td className="fs-md-6 fs-sm-7">{source}</td>
                    <td className="fs-md-6 fs-sm-7">{details.totalCount}</td>
                    <td className="fs-md-6 fs-sm-7">{details.assigned}</td>
                    <td className="fs-md-6 fs-sm-7">{details.unassigned}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>

  )
}
