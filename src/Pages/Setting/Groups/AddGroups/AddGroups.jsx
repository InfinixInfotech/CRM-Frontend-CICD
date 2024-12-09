import React, { useEffect, useState } from "react";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupsThunk, getAllGroupsThunk, getByIdGroupsThunk, postGroupsThunk, putGroupsThunk } from "../../../../Redux/Services/thunks/GroupsThunk";

export default function AddGroups() {
  
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.groups);
  useEffect(() => {
    if (data && data.data) {
      console.log("API Data:", data.data);
      setUser(data.data);
    } else {
      console.log("API Data is null or undefined.");
    }
  }, [data]);

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Profile") {
    } else if (selectedValue === "Setting") {
    }
  };
  const [groupData, setGroupData] = useState({
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
    setGroupData((prev) => {
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
  
    const AddGroups = {
      id: 0,  // Replace with actual ID value
      groupName: "string",  // Replace with actual group name
      groupId: "string",  // Replace with actual group ID
      dashboard: {
        salesDashboard: true,
        callingDashboard: true,
      },
      leads: {
        create: true,
        view: true,
        marketingLeads: true,
        edit: true,
        delete: true,
        dispose: true,
        disposeClients: true,
        upload: true,
        internalAssign: true,
        outerAssign: true,
        globalAssign: true,
        viewFollowUp: true,
        deleteFollowUp: true,
        followAssign: true,
        bulkLeadOperation: true,
        leadAction: true,
        leadActionAssign: true,
        createAgreement: true,
        addRPM: true,
      },
      contact: {
        create: true,
        view: true,
        contactAssign: true,
        contactAction: true,
        contactActionAssign: true,
      },
      mutualFund: {
        create: true,
        view: true,
        mutualFundAssign: true,
        mutualFundAction: true,
        mutualFundActionAssign: true,
      },
      freeTrial: {
        create: true,
        view: true,
        edit: true,
        outerAssign: true,
      },
      so: {
        create: true,
        view: true,
        edit: true,
        approveSO: true,
        invoice: true,
        paymentPortal: true,
        paymentApproval: true,
        paymentEdit: true,
        delete: true,
        serviceActivation: true,
        paidClientAssign: true,
        paidClientAction: true,
        paidClientActionAssign: true,
      },
      compliance: {
        kyc: true,
        riskProfile: true,
        agreement: true,
        agreementApproved: true,
        viewRPM: true,
        editRPM: true,
        invoice: true,
        soReport: true,
        taxReport: true,
      },
      leadTemplate: {
        sendSMSLead: true,
        sendWhatsappLead: true,
        sendEmailLead: true,
      },
      clientTemplate: {
        sendSMSClient: true,
        sendWhatsappClient: true,
        sendEmailClient: true,
      },
      hrExtra: {
        orgChart: true,
        scrapBook: true,
        holiday: true,
      },
      supportModule: {
        itAdmin: true,
        hrAdmin: true,
        complianceAdmin: true,
        admin: true,
      },
      teamMembers: {
        list: true,
        data: true,
      },
      smsModule: {
        sendSMS: true,
        viewSMS: true,
      },
      callingModule: {
        monitoring: true,
        reports: true,
        sendSMSViaGateway: true,
        viewSMSViaGateway: true,
        missCall: true,
        liveCall: true,
      },
      reports: {
        generalReport: true,
        ftReport: true,
        paidClientReport: true,
        expiredPaidClientReport: true,
        userReport: true,
        callingReport: true,
        messageReport: true,
        smsReport: true,
        dndReport: true,
        tracksheet: true,
        researchReport: true,
      },
      logs: {
        client: true,
        sms: true,
        chat: true,
        whatsapp: true,
        login: true,
        extension: true,
      },
      extra: {
        callingModule: true,
        userModule: true,
        groupModule: true,
        poolsModule: true,
        leadStatusModule: true,
        segmentModule: true,
        soModule: true,
        fetchingReport: true,
        mailDelete: true,
        forecast: true,
        brokerage: true,
        liveUpdates: true,
        policy: true,
        leadApproval: true,
        groupDesignation: true,
        groupDepartment: true,
        groupHierarchy: true,
        customSMS: true,
        notification: true,
        notificationUpdate: true,
        leaderDashboardUpdate: true,
        groupChat: true,
      },
      mis: {
        employee: true,
        lead: true,
        client: true,
        sales: true,
        disposeLeads: true,
        preSales: true,
      },
      whatsapp: {
        showWhatsapp: true,
        sendAttachment: true,
      },
      export: {
        leads: true,
        contacts: true,
        freeTrial: true,
        followUp: true,
        clients: true,
        salesOrder: true,
        smsLogs: true,
        chatLogs: true,
      },
      freeTrialDays: 0,  // Set the actual free trial days
      freeTrialPerContact: 0,  // Set the actual value
      totalCRMLeadLimit: 0,  // Set the actual limit
      leadFetch: {
        active: true,
        from: ["string"], // Replace with actual sources
        ratio: "string", // Provide the actual ratio
      },
      clientFetch: {
        active: true,
        from: ["string"], // Replace with actual sources
        ratio: "string", // Provide the actual ratio
      },
      unreadFetch: 0,  // Set the actual unread fetch value
    };
  
    dispatch(postGroupsThunk(AddGroups))
      .then((response) => {
        console.log("Group added successfully:", response);
      })
      .catch((error) => {
        console.error("Error adding group:", error);
      });
  };
  

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

  // style={{background:"rgb(227,227,227)"}}

  return (
    <>
      <div style={{ marginTop: "4rem" }}>
        <h2 className="mb-1 text-center bg-dark text-white py-2 ">
          Add Groups
        </h2>
        <BackButton />
        <div className="container-fluid border border-2 border-gray mt-0 w-100 mt-3 pb-3">
          <div style={{ paddingLeft: "24px", paddingTop: "32px" }}>
            <form className="row g-3 container-flued" onSubmit={handleSubmit}>
              {/* Dashboard */}
              <div className="row" style={{ background: "rgb(227,227,227)" , border:"2px solid gray"}}>
                <div className="col-12 mb-4 mt-2">
                 <label className="fs-5 fw-semibold">Group Name</label>
                  <input
                    style={{ border: "1px solid #A6AEBF" }}
                    type="text"
                    id="groupName"
                    className="form-control"
                    value={groupData.GroupName}
                    onChange={(e) =>
                      handleChange("GroupName", null, null, e.target.value)
                    }
                    placeholder="Enter Group Name"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Dashboard
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className=" bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2">Dashboard</legend> */}
                    {renderFields("Dashboard", groupData.Dashboard)}
                  </fieldset>
                </div>
                <div className="col-md-6 mb-3">
                  {/* Free Trial */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Free Trial
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12  bg-white p-3 rounded flex-wrap d-flex gap-2 "
                  >
                    {/* <legend className="float-none w-auto px-2 ">Free Trial</legend> */}
                    {renderFields("FreeTrial", groupData.FreeTrial)}
                  </fieldset>
                </div>

                <div className="col-md-6 mb-3">
                  {/* Contact */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Contact
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12  bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2 ">Contact</legend> */}
                    {renderFields("Contact", groupData.Contact)}
                  </fieldset>
                </div>
                <div className="col-md-6 mb-3">
                  {/* Mutual Fund */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Mutual Fund
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2">Mutual Fund</legend> */}
                    {renderFields("MutualFund", groupData.MutualFund)}
                  </fieldset>
                </div>
                <div className="col-md-6 mb-3">
                  {/* Leads */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Leads
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2 fs-8">Leads</legend> */}
                    {renderFields("Leads", groupData.Leads)}
                  </fieldset>
                </div>

                <div className="col-md-6 mb-3">
                  {/* SO */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    SO
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2">SO</legend> */}
                    {renderFields("SO", groupData.SO)}
                  </fieldset>
                </div>
                <div className="col-md-6 mb-3">
                  {/* Compliance */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Compliance
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2">Compliance</legend> */}
                    {renderFields("Compliance", groupData.Compliance)}
                  </fieldset>
                </div>

                <div className="col-md-6 mb-3">
                  {/* Export */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Export
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2 fs-8">Export</legend> */}
                    {renderFields("Export", groupData.Export)}
                  </fieldset>
                </div>
                <div className="col-md-6 mb-3">
                  {/* Logs */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Logs
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2 fs-8">Logs</legend> */}
                    {renderFields("Logs", groupData.Logs)}
                  </fieldset>
                </div>

                <div className="col-md-6 mb-3">
                  {/* Export */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    HR Extra
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2 fs-8">HR Extra</legend> */}
                    {renderFields("HRExtra", groupData.HRExtra)}
                  </fieldset>
                </div>
                <div className="col-md-6 mb-3">
                  {/* Export */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Support Module
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2 fs-8">
                Support Module
              </legend> */}
                    {renderFields("SupportModule", groupData.SupportModule)}
                  </fieldset>
                </div>
                <div className="col-md-6 mb-3">
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    WhatsApp Module
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2 fs-8">
                WhatsApp Module
              </legend> */}
                    {renderFields("WhatsApp", groupData.Whatsapp)}
                  </fieldset>
                </div>
                <div className="col-md-6 mb-3">
                  {/* Export */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Reports
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2 fs-8">Reports</legend> */}
                    {renderFields("Reports", groupData.Reports)}
                  </fieldset>
                </div>
                <div className="col-md-6 mb-3">
                  {/* Export */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Extra
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2 fs-8">Extra</legend> */}
                    {renderFields("Extra", groupData.Extra)}
                  </fieldset>
                </div>

                <div className="col-md-6 mb-3">
                  {/* Numeric Fields */}
                  <label style={{ fontWeight: "600", fontSize: "18px" }}>
                    Other Settings
                  </label>
                  <fieldset
                    style={{ border: "1px solid #A6AEBF" }}
                    className="col-12 bg-white p-3 rounded flex-wrap d-flex gap-2"
                  >
                    {/* <legend className="float-none w-auto px-2">Other Settings</legend> */}
                    <div className="mb-3 ">
                      <label htmlFor="freeTrialDays" className="form-label">
                        Free Trial Days
                      </label>
                      <input
                        type="number"
                        id="freeTrialDays"
                        className="form-control"
                        value={groupData.FreeTrialDays}
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
                      <label
                        htmlFor="freeTrialPerContact"
                        className="form-label"
                      >
                        Free Trial Per Contact
                      </label>
                      <input
                        type="number"
                        id="freeTrialPerContact"
                        className="form-control"
                        value={groupData.FreeTrialPerContact}
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
                        value={groupData.TotalCRMLeadLimit}
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
                        value={groupData.TotalCRMLeadLimit}
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
                        value={groupData.TotalCRMLeadLimit}
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
                        value={groupData.TotalCRMLeadLimit}
                        // onChange={(e) =>
                        //     handleChange(null, "TotalCRMLeadLimit", null, parseInt(e.target.value) || 0)
                        // }
                      />
                    </div>
                  </fieldset>
                </div>
                <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary mb-3 mt-4">
                  Submit
                </button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
