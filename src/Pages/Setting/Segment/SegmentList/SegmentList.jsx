import React, { useEffect, useState } from "react";
import "./SegmentList.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { DeleteButton } from "../../../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import { postSegmentListThunk } from "../../../../Redux/Services/thunks/SegmentListThunk";



const SegmentList = () => {
  const [formData, setFormData] = useState({
    segmentName: "",
    segmentType: "Equity",
    segmentCategory: "High Risk",
    status: false,
  });
  const [segments, setSegments] = useState([]);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.segmentlist);



  useEffect(() => {
    if (data?.data) {
      setSegments(data.data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleCreate = () => {
    dispatch(postSegmentListThunk(formData));
    setFormData({
      segmentName: "",
      TradeSegmentName: "",
      segmentType: "Equity",
      segmentCategory: "High Risk",
      highRisk: true,
      status: false,
    });
  };

  const handleStatusToggle = (index) => {
    dispatch(toggleSegmentStatus(index));
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Segments
      </h2>
      <BackButton />
      <div className="segment-container">
        <div className="add-segment">
          <h4 className="addLeadsinput border border-black p-2 mb-2 text-white ">
            Add New Segment
          </h4>
          <form>
            <div className="form-row">
              <label>Segment Name</label>
              <input
                type="text"
                name="segmentName"
                value={formData.segmentName}
                onChange={handleChange}
                placeholder="Trade Segment Name"
              />
            </div>
            <div className="form-row">
              <label>Segment Type</label>
              <select
                name="segmentType"
                value={formData.segmentType}
                onChange={handleChange}
              >
                <option value="Equity">Equity</option>
                <option value="FNO">FNO</option>
                <option value="Commodity">Commodity</option>
                <option value="Forex">Forex</option>
              </select>
            </div>
            <div className="form-row">
              <label>Segment Category</label>
              <select
                name="segmentCategory"
                value={formData.segmentCategory}
                onChange={handleChange}
              >
                <option value="High Risk">High Risk</option>
                <option value="Moderate Risk">Moderate Risk</option>
                <option value="Low Risk">Low Risk</option>
              </select>
            </div>
            <div className="form-row">
              <label>Status</label>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
              />{" "}
              Active
            </div>
            <button type="button" onClick={handleCreate}>
              Create
            </button>
            <p>{msg}</p>
          </form>
        </div>

        <div className="view-segment">
          <h4>View Segments</h4>
          <CopyButton />
          <CsvButton />
          <PdfButton />
          <PrintButton />
          <table>
            <thead>
              <tr>
                <th>Segment Type</th>
                <th>Segment Name</th>
                <th>Segment Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((segment, index) => (
                <tr key={index}>
                  <td>{segment.segmentType}</td>
                  <td>{segment.segmentName}</td>
                  <td>{segment.segmentCategory}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={segment.status}
                      onChange={() => handleStatusToggle(index)}
                    />
                  </td>
                  <td>
                    <EditButton />
                    <DeleteButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SegmentList;
