import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, Activity, Filter, Download, Search } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { emp, staticToken, userHistoryUrl } from "../../Redux/Services/apiServer/ApiServer";

const UserHistory = () => {
  const [leadData, setLeadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("login");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    const fetchLeadHistory = async () => {
      try {

        const response = await fetch(
          `${userHistoryUrl}?Employeecode=${emp}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${staticToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await response.json();
        if (result.success) {
          setLeadData(result.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeadHistory();
  }, []);


  const getStatusBadge = (type) => {
    switch (type) {
      case 'login':
        return 'bg-success text-white';
      case 'logout':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <hr />
          <button
            className="btn btn-outline-danger"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container-fluid">
        {/* Header Section */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="h3 mb-2">Employee Activity Dashboard</h1>
                <div className="d-flex align-items-center gap-2">
                  <User size={16} />
                  <span className="text-muted">Employee Code:</span>
                  <span className="badge bg-secondary">{leadData?.employeeCode}</span>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-lg-end mt-3 mt-lg-0">
                <button className="btn btn-outline-primary me-2 d-flex align-items-center">
                  <Filter size={16} className="me-2" />
                  Filter
                </button>
                <button className="btn btn-outline-primary d-flex align-items-center">
                  <Download size={16} className="me-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control input-box"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <select
                  className="form-select input-box"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row g-4 mb-4">
          <div className="col-sm-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Logins</h6>
                    <h3 className="mb-0">
                      {Object.values(leadData?.loginDateTime || {}).flat().length}
                    </h3>
                  </div>
                  <div className="rounded-circle bg-success bg-opacity-10 p-3">
                    <Activity size={24} className="text-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Logouts</h6>
                    <h3 className="mb-0">
                      {Object.values(leadData?.logoutDateTime || {}).flat().length}
                    </h3>
                  </div>
                  <div className="rounded-circle bg-danger bg-opacity-10 p-3">
                    <Activity size={24} className="text-danger" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Follow-ups</h6>
                    <h3 className="mb-0">{leadData?.followUps?.length || 0}</h3>
                  </div>
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                    <Activity size={24} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Active Days</h6>
                    <h3 className="mb-0">
                      {Object.keys(leadData?.loginDateTime || {}).length}
                    </h3>
                  </div>
                  <div className="rounded-circle bg-info bg-opacity-10 p-3">
                    <Activity size={24} className="text-info" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Tabs and Table */}
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                  onClick={() => setActiveTab("login")}
                >
                  Login Activity
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "logout" ? "active" : ""}`}
                  onClick={() => setActiveTab("logout")}
                >
                  Logout Activity
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "followup" ? "active" : ""}`}
                  onClick={() => setActiveTab("followup")}
                >
                  Follow-ups
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === "login" &&
                    leadData?.loginDateTime &&
                    Object.entries(leadData.loginDateTime).map(([date, times]) =>
                      times.map((time, timeIndex) => (
                        <tr key={`${date}-${timeIndex}`}>
                          <td>
                            <div className="d-flex align-items-center">
                              <Calendar size={16} className="me-2 text-muted" />
                              {date}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Clock size={16} className="me-2 text-muted" />
                              {time}
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadge('login')}`}>
                              Login
                            </span>
                          </td>
                          <td>--</td>
                        </tr>
                      ))
                    )}

                  {activeTab === "logout" && leadData?.followUps && leadData.followUps.length > 0 &&
                    leadData.followUps.map((followUp, index) =>
                      Object.entries(followUp._Leads || {}).map(([date, leads]) => (
                        Array.isArray(leads) ? (
                          leads.map((lead, leadIndex) => (
                            <tr key={`${date}-${leadIndex}`}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <Calendar size={16} className="me-2 text-muted" />
                                  {date}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <Clock size={16} className="me-2 text-muted" />
                                  {lead.leadId}
                                </div>
                              </td>
                              <td>
                                <span className={`badge ${getStatusBadge(lead._LeadStatus)}`}>
                                  {lead._LeadStatus || "N/A"}
                                </span>
                              </td>
                              <td>{lead.segment || "N/A"}</td>
                              <td>{lead.comment || "No Comment"}</td>
                            </tr>
                          ))
                        ) : (
                          <tr key={`${date}-no-leads`}>
                            <td colSpan={5} className="text-center text-muted">No leads available for this date</td>
                          </tr>
                        )
                      ))
                    )}
                  {activeTab === "followup" &&
                    leadData.followUps &&
                    leadData.followUps.map((followUp, index) => (
                      <tr key={index}>
                        <td colSpan="4">
                          <div className="d-flex align-items-center">
                            <Activity size={16} className="me-2 text-muted" />
                            {followUp}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;