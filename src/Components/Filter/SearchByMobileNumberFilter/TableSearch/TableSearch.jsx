import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetLeadByMobileOrLeadIdThunk } from "../../../../Redux/Services/thunks/GetLeadByMobileOrLeadIdThunk";
import { useLocation } from "react-router-dom";

const TableSearch = () => {
  const { state } = useLocation();
  const SearchData = state?.SearchData;
  console.log("SearchDataReciver----------------",SearchData);
  
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.GetLeadByMobileOrLeadId);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetLeadByMobileOrLeadIdThunk());
    };
    fetchData();
  }, [dispatch]);

  //!----------------------------------------------------------------------------------------------<---SET DATA FROM API ------------->------------------------------------------------------

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setSearchData(data.data);
    }
  }, [data]);
  

  return (
    <div className="mt-5">
      <table
        id="table-dataOne"
        className="table table-bordered table-striped text-center mt-2"
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Client Name</th>
            <th>Mobile</th>
            <th>Assigned To</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {SearchData && Object.keys(SearchData).length > 0 ? (
            <tr>
              <td>{SearchData.id}</td>
              <td>{SearchData.clientName}</td>
              <td>{SearchData.mobile}</td>
              <td>{SearchData.assignedTo}</td>
              <td>{SearchData.leadSource || "N/A"}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSearch;
