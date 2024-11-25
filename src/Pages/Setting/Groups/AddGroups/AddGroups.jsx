import React, { useState } from "react";
import BackButton from "../../../../Components/Button/BackButton/BackButton";

export default function AddGroups() {
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;

    // Navigate to the route based on the selected value
    if (selectedValue === "Profile") {
    } else if (selectedValue === "Setting") {
    }
  };
  const [data, setData] = useState({
    GroupName: "",
    Dashboard: {
      SalesDashboard: false,
      CallingDashboard: false,
    },
    Leads: {
      Create: false,
      View: false,
      MarketingLeads: false,
      Edit: false,
      Delete: false,
      Dispose: false,
      DisposeClients: false,
      Upload: false,
      InternalAssign: false,
      OuterAssign: false,
      GlobalAssign: false,
      ViewFollowUp: false,
      DeleteFollowUp: false,
      FollowAssign: false,
      BulkLeadOperation: false,
      LeadAction: false,
      LeadActionAssign: false,
      CreateAgreement: false,
      AddRPM: false,
    },
    Contact: {
      Create: false,
      View: false,
      ContactAssign: false,
      ContactAction: false,
      ContactActionAssign: false,
    },
    MutualFund: {
      Create: false,
      View: false,
      MutualFundAssign: false,
      MutualFundAction: false,
      MutualFundActionAssign: false,
    },
    FreeTrial: {
      Create: false,
      View: false,
      Edit: false,
      OuterAssign: false,
    },
    SO: {
      Create: false,
      View: false,
      Edit: false,
      ApproveSO: false,
      Invoice: false,
      PaymentPortal: false,
      PaymentApproval: false,
      PaymentEdit: false,
      Delete: false,
      ServiceActivation: false,
      PaidClientAssign: false,
      PaidClientAction: false,
      PaidClientActionAssign: false,
    },
    Compliance: {
      KYC: false,
      RiskProfile: false,
      Agreement: false,
      AgreementApproved: false,
      ViewRPM: false,
      EditRPM: false,
      Invoice: false,
      SOReport: false,
      TaxReport: false,
    },
    Export: {
      Leads: false,
      Contact: false,
      Freetrial: false,
      FollowUp: false,
      Clients: false,
      SalesOrder: false,
      SmaLogs: false,
      ChatLogs: false,
    },
    Logs: {
      Client: false,
      Sms: false,
      Chat: false,
      Whatsapp: false,
      Extension: false,
    },
    Extra: {
      callingModule: false,
      userModule: false,
      groupModule: false,
      pools: false,
      leadStatusModule: false,
      segmentModule: false,
      soModule: false,
      fetchingReport: false,
      mailDelete: false,
      forecast: false,
      brokerage: false,
      liveUpdates: false,
      policy: false,
      leadApproval: false,
      groupDesignation: false,
      groupDepartment: false,
      groupHierarchy: false,
      customSMS: false,
      notification: false,
      notificationUpdate: false,
      leaderDashboardUpdate: false,
      groupChat: false,
    },
    HRExtra: {
      ORGChart: false,
      ScrapBook: false,
      Holiday: false,
    },
    SupportModule: {
      ITAdmin: false,
      HRAdmin: false,
      ComplianceAdmin: false,
      Admin: false,
    },
    CallingModule: {
      Monitoring: false,
      Reports: false,
      SendSMSViaGateway: false,
      ViewSMSViaGateway: false,
      MissCall: false,
      LiveCall: false,
    },
    Reports: {
      GeneralReport: false,
      FTReport: false,
      PaidClientReport: false,
      ExpiredPaidClientReport: false,
      UserReport: false,
      CallingReport: false,
      MessageReport: false,
      SMSReport: false,
      DNDReport: false,
      Tracksheet: false,
      ResearchReport: false,
    },
    MIS: {
      Employee: false,
      Lead: false,
      Client: false,
      Sales: false,
      DisposeLeads: false,
      PreSales: false,
    },
    Whatsapp: {
      ShowWhatsapp: false,
      SendAttachment: false,
    },
    FreeTrialDays: 0,
    FreeTrialPerContact: 0,
    TotalCRMLeadLimit: 0,
  });

  // Update State
  const handleChange = (category, key, subKey, value) => {
    setData((prev) => {
      const updated = { ...prev };
      if (subKey) {
        updated[category][key][subKey] = value;
      } else if (key) {
        updated[category][key] = value;
      } else {
        updated[category] = value;
      }
      return updated;
    });
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", data);
  };

  // Render Form Fields Dynamically
  const renderFields = (category, fields) => {
    return Object.keys(fields).map((key) => {
      const value = fields[key];
      if (typeof value === "boolean") {
        return (
          <label key={key}>
            <input
              style={{ height: "12px", marginRight: "2px" }}
              className="text-center"
              type="checkbox"
              checked={value}
              onChange={(e) =>
                handleChange(category, key, null, e.target.checked)
              }
            />
            {key}
          </label>
        );
      } else if (typeof value === "number") {
        return (
          <label key={key}>
            {key}:
            <input
              type="number"
              value={value}
              onChange={(e) =>
                handleChange(category, key, null, parseInt(e.target.value) || 0)
              }
            />
          </label>
        );
      } else if (typeof value === "object") {
        return (
          <fieldset key={key} className="me-3">
            <legend>{key}</legend>
            {renderFields(category, value)}
          </fieldset>
        );
      }
      return null;
    });
  };

  return (
    <div className="  " style={{ marginTop: "4rem" }}>
      <h2 className="mb-4 text-center bg-dark text-white py-2 ">Add Groups</h2>
      <BackButton />
      <form
        className="row g-3 bg-light py-4 container-flued"
        onSubmit={handleSubmit}
      >
        {/* Dashboard */}
        <div className="row">
          <div className="col-12 mb-2">
            <label htmlFor="groupName" className="form-label ">
              <h4>Group Name</h4>
            </label>
            <input
              type="text"
              id="groupName"
              className="form-control border border-dark "
              value={data.GroupName}
              onChange={(e) =>
                handleChange("GroupName", null, null, e.target.value)
              }
              placeholder="Enter Group Name"
            />
          </div>

          <div className="col-md-6">
            <fieldset className="border border-dark bg-white p-3 rounded flex-wrap d-flex gap-2">
              <legend className="float-none w-auto px-2">Dashboard</legend>
              {renderFields("Dashboard", data.Dashboard)}
            </fieldset>
          </div>
          <div className="col-md-6">
            {/* Free Trial */}
            <fieldset className="col-12 border border-dark bg-white p-3 rounded flex-wrap d-flex gap-2 ">
              <legend className="float-none w-auto px-2 ">Free Trial</legend>
              {renderFields("FreeTrial", data.FreeTrial)}
            </fieldset>
          </div>

          <div className="col-md-6">
            {/* Contact */}
            <fieldset className="col-12 border border-dark bg-white p-3 rounded flex-wrap d-flex gap-2">
              <legend className="float-none w-auto px-2 ">Contact</legend>
              {renderFields("Contact", data.Contact)}
            </fieldset>
          </div>
          <div className="col-md-6">
            {/* Mutual Fund */}
            <fieldset className="col-12 border border-dark bg-white p-3 rounded flex-wrap d-flex gap-2">
              <legend className="float-none w-auto px-2">Mutual Fund</legend>
              {renderFields("MutualFund", data.MutualFund)}
            </fieldset>
          </div>
          <div className="col-md-6">
            {/* Leads */}
            <fieldset
              className=" border border-dark p-2 rounded bg-white d-flex flex-wrap gap-2 "
              style={{ fontSize: "14px" }}
            >
              <legend className="float-none w-auto px-2 fs-8">Leads</legend>
              {renderFields("Leads", data.Leads)}
            </fieldset>
          </div>

          <div className="col-md-6">
            {/* SO */}
            <fieldset className=" border border-dark p-2  bg-white rounded d-flex flex-wrap gap-2">
              <legend className="float-none w-auto px-2">SO</legend>
              {renderFields("SO", data.SO)}
            </fieldset>
          </div>
          <div className="col-md-6">
            {/* Compliance */}
            <fieldset className=" border border-dark p-2 bg-white rounded d-flex flex-wrap gap-2">
              <legend className="float-none w-auto px-2">Compliance</legend>
              {renderFields("Compliance", data.Compliance)}
            </fieldset>
          </div>

          <div className="col-md-6">
            {/* Export */}
            <fieldset
              className=" border border-dark p-2 rounded bg-white d-flex flex-wrap gap-2 "
              style={{ fontSize: "14px" }}
            >
              <legend className="float-none w-auto px-2 fs-8">Export</legend>
              {renderFields("Export", data.Export)}
            </fieldset>
          </div>
          <div className="col-md-6 mb-2">
            {/* Export */}
            <fieldset
              className=" border border-dark p-2 rounded bg-white d-flex flex-wrap gap-2 "
              style={{ fontSize: "14px" }}
            >
              <legend className="float-none w-auto px-2 fs-8">Logs</legend>
              {renderFields("Logs", data.Logs)}
            </fieldset>
          </div>

          <div className="col-md-6 mb-2">
            {/* Export */}
            <fieldset
              className=" border border-dark p-2 rounded bg-white d-flex flex-wrap gap-2 "
              style={{ fontSize: "14px" }}
            >
              <legend className="float-none w-auto px-2 fs-8">HR Extra</legend>
              {renderFields("HRExtra", data.HRExtra)}
            </fieldset>
          </div>
          <div className="col-md-6">
            {/* Export */}
            <fieldset
              className=" border border-dark p-2 rounded bg-white d-flex flex-wrap gap-2 "
              style={{ fontSize: "14px" }}
            >
              <legend className="float-none w-auto px-2 fs-8">
                Support Module
              </legend>
              {renderFields("SupportModule", data.SupportModule)}
            </fieldset>
          </div>
          <div className="col-md-6 mb-2">
            <fieldset
              className=" border border-dark p-2 rounded bg-white d-flex flex-wrap gap-2 "
              style={{ fontSize: "14px" }}
            >
              <legend className="float-none w-auto px-2 fs-8">
                WhatsApp Module
              </legend>
              {renderFields("WhatsApp", data.Whatsapp)}
            </fieldset>
          </div>
          <div className="col-md-6">
            {/* Export */}
            <fieldset
              className=" border border-dark p-2 rounded bg-white d-flex flex-wrap gap-2 "
              style={{ fontSize: "14px" }}
            >
              <legend className="float-none w-auto px-2 fs-8">Reports</legend>
              {renderFields("Reports", data.Reports)}
            </fieldset>
          </div>
          <div className="col-md-6">
            {/* Export */}
            <fieldset
              className=" border border-dark p-2 rounded bg-white d-flex flex-wrap gap-2 "
              style={{ fontSize: "14px" }}
            >
              <legend className="float-none w-auto px-2 fs-8">Extra</legend>
              {renderFields("Extra", data.Extra)}
            </fieldset>
          </div>

          <div className="col-md-6">
            {/* Numeric Fields */}
            <fieldset className=" border border-dark p-2 bg-white rounded d-flex flex-wrap gap-4">
              <legend className="float-none w-auto px-2">Other Settings</legend>
              <div className="mb-3">
                <label htmlFor="freeTrialDays" className="form-label">
                  Free Trial Days
                </label>
                <input
                  type="number"
                  id="freeTrialDays"
                  className="form-control"
                  value={data.FreeTrialDays}
                  onChange={(e) =>
                    handleChange(
                      null,
                      "FreeTrialDays",
                      null,
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="freeTrialPerContact" className="form-label">
                  Free Trial Per Contact
                </label>
                <input
                  type="number"
                  id="freeTrialPerContact"
                  className="form-control"
                  value={data.FreeTrialPerContact}
                  onChange={(e) =>
                    handleChange(
                      null,
                      "FreeTrialPerContact",
                      null,
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="crmLeadLimit" className="form-label">
                  Total CRM Lead Limit
                </label>
                <input
                  type="number"
                  id="crmLeadLimit"
                  className="form-control"
                  value={data.TotalCRMLeadLimit}
                  onChange={(e) =>
                    handleChange(
                      null,
                      "TotalCRMLeadLimit",
                      null,
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="crmLeadLimit" className="form-label">
                  Total CRM Lead Limit
                </label>
                <select
                  className="form-select form-control form-select-sm"
                  onChange={handleDropdownChange}
                >
                  <option selected>Select Some Option</option>
                  <option>fresh pool</option>
                  <option>Diamond pool HNI pool</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor=""> Lead Fetch Ratio</label>
                <input
                  type="number"
                  id="crmLeadLimit"
                  className="form-control"
                  value={data.TotalCRMLeadLimit}
                  // onChange={(e) =>
                  //     handleChange(null, "TotalCRMLeadLimit", null, parseInt(e.target.value) || 0)
                  // }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="">Client Fetch Ratio</label>
                <input
                  type="number"
                  id="clientfetch"
                  className="form-control"
                  value={data.TotalCRMLeadLimit}
                  // onChange={(e) =>
                  //     handleChange(null, "TotalCRMLeadLimit", null, parseInt(e.target.value) || 0)
                  // }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="">Unread Fetch </label>
                <input
                  type="number"
                  id="unreadtfetch"
                  className="form-control"
                  value={data.TotalCRMLeadLimit}
                  // onChange={(e) =>
                  //     handleChange(null, "TotalCRMLeadLimit", null, parseInt(e.target.value) || 0)
                  // }
                />
              </div>
            </fieldset>
          </div>
        </div>
        {/* Submit Button */}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
