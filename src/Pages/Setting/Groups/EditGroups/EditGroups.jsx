import React, { useEffect, useState } from "react";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { useDispatch } from "react-redux";
import { postGroupsThunk } from "../../../../Redux/Services/thunks/GroupsThunk";
import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { staticToken } from "../../../../Redux/Services/apiServer/ApiServer";

export default function EditGroups() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const { state } = useLocation();
  const recievedGroupData = state?.groupObj;
//   console.log("recievedGroupData is-----------------------" +  JSON.stringify(recievedGroupData)); 
  if (!recievedGroupData) {
    console.error("No group data received" + JSON.stringify(recievedGroupData));
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Profile") {
    } else if (selectedValue === "Setting") {
    }
  };

  const [groupData, setGroupData] = useState({
    groupName: recievedGroupData?.groupName || "",

    Dashboard: {
        ...recievedGroupData?.dashboard, // Spread the existing properties

      },
      
    Leads: {
      ...recievedGroupData?.leads,

    },

    leadFetch: {
      ...recievedGroupData?.leadFetch,

    },

    Contact: {
      ...recievedGroupData?.contact,
    },

    MutualFund: {
      ...recievedGroupData?.mutualFund,

    },

    FreeTrial: {
      ...recievedGroupData?.freeTrial,

    },

    SO: {
      ...recievedGroupData?.so,
  
    },

    Compliance: {
      ...recievedGroupData?.compliance,

    },

    Export: {
      ...recievedGroupData?.export,

    },

    Logs: {
      ...recievedGroupData?.logs,

    },

    Extra: {
        ...recievedGroupData?.extra,

    },

    HRExtra: {
        ...recievedGroupData?.hrExtra,

    },
    SupportModule: {
        ...recievedGroupData?.supportModule,

    },
    CallingModule: {
        ...recievedGroupData?.callingModule,
    },
    Reports: {
        ...recievedGroupData?.reports,
    },
    MIS: {
        ...recievedGroupData?.mis,
    },
    Whatsapp: {
        ...recievedGroupData?.whatsapp,
    },
    FreeTrialDays: recievedGroupData?.freeTrialDays ?? null,
    FreeTrialPerContact: recievedGroupData?.freeTrialPerContact ?? null,
    TotalCRMLeadLimit: recievedGroupData?.totalCRMLeadLimit ?? null,
    LeadFetchRatio: recievedGroupData?.leadFetchRatio ?? null,
    ClientFetchRatio: recievedGroupData?.clientFetchRatio ?? null,
    UnreadFetch: recievedGroupData?.unreadFetch ?? null,
  });
//   console.log(groupData);

  const handleChange = (path, value) => {
    setGroupData((prevData) => {
      const newData = { ...prevData };
      const pathArray = path.split(".");

      let current = newData;
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      current[pathArray[pathArray.length - 1]] = value;

      return newData;
    });
  };

  const renderCheckbox = (label, path, checked) => (
    <div className="form-check form-check-inline mb-2" key={path}>
      <input
        className="form-check-input"
        type="checkbox"
        id={path}
        checked={checked}
        onChange={(e) => handleChange(path, e.target.checked)}
      />
      <label className="form-check-label" htmlFor={path}>
        {label}
      </label>
    </div>
  );

  const renderNumberInput = (label, path, value) => (
    <div className="mb-3" key={path}>
      <label className="form-label" htmlFor={path}>
        {label}
      </label>
      <input
        type="number"
        className="form-control"
        id={path}
        value={value}
        onChange={(e) => handleChange(path, parseInt(e.target.value) || 0)}
      />
    </div>
  );

  const renderSection = (title, fields, basePath) => (
    <div className="col-md-6 mb-3">
      <h5 className="fw-semibold">{title}</h5>
      <div
        className="p-3 rounded"
        style={{
          border: "2px solid #DEE2E6",
          backgroundColor: "white",
          border: "2px solid #A6AEBF",
        }}
      >
        {Object.entries(fields).map(([key, value]) => {
          const path = `${basePath}.${key}`;
          if (typeof value === "boolean") {
            return renderCheckbox(key, path, value);
          } else if (typeof value === "number") {
            return renderNumberInput(key, path, value);
          } else if (typeof value === "object" && value !== null) {
            return (
              <div key={key} className="mb-3">
                <h6 className="mb-2">{key}</h6>
                <div className="ms-3">
                  {Object.entries(value).map(([subKey, subValue]) => {
                    const subPath = `${path}.${subKey}`;
                    if (typeof subValue === "boolean") {
                      return renderCheckbox(subKey, subPath, subValue);
                    } else if (typeof subValue === "number") {
                      return renderNumberInput(subKey, subPath, subValue);
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );

  useEffect(() => {
    if (recievedGroupData) {
      setGroupData({
        groupName: recievedGroupData?.groupName || "",

        Dashboard: {
          ...recievedGroupData?.dashboard,
        },

        Leads: {
          ...recievedGroupData?.leads,
        },

        leadFetch: {
          ...recievedGroupData?.leadFetch,
     
        },

        Contact: {
          ...recievedGroupData?.contact,

        },

        MutualFund: {
          ...recievedGroupData?.mutualFund,

        },

        FreeTrial: {
          ...recievedGroupData?.freeTrial,

        },

        SO: {
          ...recievedGroupData?.so,

        },

        Compliance: {
          ...recievedGroupData?.compliance,

        },

        Export: {
          ...recievedGroupData?.export,

        },

        Logs: {
          ...recievedGroupData?.logs,

        },

        Extra: {
          ...recievedGroupData?.extra,

        },

        HRExtra: {
          ...recievedGroupData?.hrExtra,

        },
        SupportModule: {
          ...recievedGroupData?.supportModule,

        },
        CallingModule: {
          ...recievedGroupData?.callingModule,

        },
        Reports: {
          ...recievedGroupData?.reports,
        },
        MIS: {
          ...recievedGroupData?.mis,
        },
        Whatsapp: {
          ...recievedGroupData?.whatsapp,
        },
        FreeTrialDays: recievedGroupData?.freeTrialDays ?? null,
        FreeTrialPerContact: recievedGroupData?.freeTrialPerContact ?? null,
        TotalCRMLeadLimit: recievedGroupData?.totalCRMLeadLimit ?? null,
        LeadFetchRatio: recievedGroupData?.leadFetchRatio ?? null,
        ClientFetchRatio: recievedGroupData?.clientFetchRatio ?? null,
        UnreadFetch: recievedGroupData?.unreadFetch ?? null,
      });
    }
  },[recievedGroupData]);



const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true); // Show the alert
  
  const groupId = recievedGroupData.id; // Ensure the `id` exists in the user object
  const AddGroups = {
    id: 0,
    groupName: groupData.groupName,
    groupId: "string",
    dashboard: {
      salesDashboard: groupData.Dashboard.SalesDashboard,
      callingDashboard: groupData.Dashboard.CallingDashboard,
    },
    leads: {
      create: groupData.Leads.Create,
      view: groupData.Leads.View,
      marketingLeads: groupData.Leads.MarketingLeads,
      edit: groupData.Leads.Edit,
      delete: groupData.Leads.Delete,
      dispose: groupData.Leads.Dispose,
      disposeClients: groupData.Leads.DisposeClients,
      upload: groupData.Leads.Upload,
      internalAssign: groupData.Leads.InternalAssign,
      outerAssign: groupData.Leads.OuterAssign,
      globalAssign: groupData.Leads.GlobalAssign,
      viewFollowUp: groupData.Leads.ViewFollowUp,
      deleteFollowUp: groupData.Leads.DeleteFollowUp,
      followAssign: groupData.Leads.FollowAssign,
      bulkLeadOperation: groupData.Leads.BulkLeadOperation,
      leadAction: groupData.Leads.LeadAction,
      leadActionAssign: groupData.Leads.LeadActionAssign,
      createAgreement: groupData.Leads.CreateAgreement,
      addRPM: groupData.Leads.AddRPM,
    },
    leadFetch: {
      active: groupData.leadFetch.active,
      from: groupData.leadFetch.from,
      ratio: groupData.leadFetch.ratio,
    },
    contact: {
      create: groupData.Contact.Create,
      view: groupData.Contact.View,
      contactAssign: groupData.Contact.ContactAssign,
      contactAction: groupData.Contact.ContactAction,
      contactActionAssign: groupData.Contact.ContactActionAssign,
    },
    mutualFund: {
      create: groupData.MutualFund.Create,
      view: groupData.MutualFund.View,
      mutualFundAssign: groupData.MutualFund.MutualFundAssign,
      mutualFundAction: groupData.MutualFund.MutualFundAction,
      mutualFundActionAssign: groupData.MutualFund.MutualFundActionAssign,
    },
    freeTrial: {
      create: groupData.FreeTrial.Create,
      view: groupData.FreeTrial.View,
      edit: groupData.FreeTrial.Edit,
      outerAssign: groupData.FreeTrial.OuterAssign,
    },
    so: {
      create: groupData.SO.Create,
      view: groupData.SO.View,
      edit: groupData.SO.Edit,
      approveSO: groupData.SO.ApproveSO,
      invoice: groupData.SO.Invoice,
      paymentPortal: groupData.SO.PaymentPortal,
      paymentApproval: groupData.SO.PaymentApproval,
      paymentEdit: groupData.SO.PaymentEdit,
      delete: groupData.SO.Delete,
      serviceActivation: groupData.SO.ServiceActivation,
      paidClientAssign: groupData.SO.PaidClientAssign,
      paidClientAction: groupData.SO.PaidClientAction,
      paidClientActionAssign: groupData.SO.PaidClientActionAssign,
    },
    compliance: {
      kyc: groupData.Compliance.KYC,
      riskProfile: groupData.Compliance.RiskProfile,
      agreement: groupData.Compliance.Agreement,
      agreementApproved: groupData.Compliance.AgreementApproved,
      viewRPM: groupData.Compliance.ViewRPM,
      editRPM: groupData.Compliance.EditRPM,
      invoice: groupData.Compliance.Invoice,
      soReport: groupData.Compliance.SOReport,
      taxReport: groupData.Compliance.TaxReport,
    },
    logs: {
      client: groupData.Logs.Client,
      sms: groupData.Logs.Sms,
      chat: groupData.Logs.Chat,
      whatsapp: groupData.Logs.Whatsapp,
      extension: groupData.Logs.Extension,
    },
    extra: {
      callingModule: groupData.Extra.callingModule,
      userModule: groupData.Extra.userModule,
      groupModule: groupData.Extra.groupModule,
      pools: groupData.Extra.pools,
      leadStatusModule: groupData.Extra.leadStatusModule,
      segmentModule: groupData.Extra.segmentModule,
      soModule: groupData.Extra.soModule,
      fetchingReport: groupData.Extra.fetchingReport,
      mailDelete: groupData.Extra.mailDelete,
      forecast: groupData.Extra.forecast,
      brokerage: groupData.Extra.brokerage,
      liveUpdates: groupData.Extra.liveUpdates,
      policy: groupData.Extra.policy,
      leadApproval: groupData.Extra.leadApproval,
      groupDesignation: groupData.Extra.groupDesignation,
      groupDepartment: groupData.Extra.groupDepartment,
      groupHierarchy: groupData.Extra.groupHierarchy,
      customSMS: groupData.Extra.customSMS,
      notification: groupData.Extra.notification,
      notificationUpdate: groupData.Extra.notificationUpdate,
      leaderDashboardUpdate: groupData.Extra.leaderDashboardUpdate,
      groupChat: groupData.Extra.groupChat,
    },
    Whatsapp: {
      showWhatsapp: groupData.Whatsapp.ShowWhatsapp,
      sendAttachment: groupData.Whatsapp.SendAttachment,
    },
    export: {
      leads: groupData.Export.Leads,
      contacts: groupData.Export.Contact,
      freeTrial: groupData.Export.Freetrial,
      followUp: groupData.Export.FollowUp,
      clients: groupData.Export.Clients,
      salesOrder: groupData.Export.SalesOrder,
      smsLogs: groupData.Export.SmaLogs,
      chatLogs: groupData.Export.ChatLogs,
    },
    mis: {
      employee: false,
      lead: false,
      client: false,
      sales: false,
      disposeLeads: false,
      preSales: false,
    },
    hrExtra: {
      orgChart: false,
      scrapBook: false,
      holiday: false,
    },
    reports: {
      generalReport: false,
      ftReport: false,
      paidClientReport: false,
      expiredPaidClientReport: false,
      userReport: false,
      callingReport: false,
      messageReport: false,
      smsReport: false,
      dndReport: false,
      tracksheet: false,
      researchReport: false,
    },
    leadFetch: {
      active: false,
      from: [],
      ratio: "string",
    },
    clientFetch: {
      active: false,
      from: [],
      ratio: "string",
    },
    smsModule: {
      sendSMS: false,
      viewSMS: false,
    },
    callingModule: {
      monitoring: false,
      reports: false,
      sendSMSViaGateway: false,
      viewSMSViaGateway: false,
      missCall: false,
      liveCall: false,
    },
    leadTemplate: {
      sendSMSLead: false,
      sendWhatsappLead: false,
      sendEmailLead: false,
    },
    clientTemplate: {
      sendSMSClient: false,
      sendWhatsappClient: false,
      sendEmailClient: false,
    },
    supportModule: {
      itAdmin: false,
      hrAdmin: false,
      complianceAdmin: false,
      admin: false,
    },
    teamMembers: {
      list: false,
      data: false,
    },
    freeTrialDays: groupData.FreeTrialDays,
    freeTrialPerContact: groupData.FreeTrialPerContact,
    totalCRMLeadLimit: groupData.TotalCRMLeadLimit,
    unreadFetch: groupData.UnreadFetch,
  };

    try {
        const token = staticToken;
        const response = await fetch(`/api/Groups/UpdateByIdGroups?id=${groupId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(AddGroups),
        });

        if (!response.ok) throw new Error("Failed to update user.");
        const result = await response.json();
        console.log("User updated successfully:", result);

        alert("User updated successfully!");
        setShowAlert(false);
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user.");
    }
};


  return (
    <>
      <h2 className="mb-1 text-center bg-dark text-white py-2 mt-5">
        Edit Groups
      </h2>
      <BackButton />
      <div
        className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}
      >
        <div
          className="container-fluid p-4"
          style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
        >
          <div>
            {showAlert && (
              <Alert variant="info" className="mt-2 text-center">
                Group Added Successfully
              </Alert>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fs-5 fw-semibold">Group Name</label>
              <input
                type="text"
                className="form-control"
                style={{ border: "2px solid #A6AEBF" }}
                value={groupData.groupName || ""}
                onChange={(e) => handleChange("groupName", e.target.value)}
              />
            </div>

            <div className="row">
              {renderSection("Dashboard", groupData.Dashboard, "Dashboard")}
              {renderSection("Free Trial", groupData.FreeTrial, "FreeTrial")}
              {renderSection("Contact", groupData.Contact, "Contact")}
              {renderSection("Mutual Fund", groupData.MutualFund, "MutualFund")}
              {renderSection("Leads", groupData.Leads, "Leads")}
              {renderSection("SO", groupData.SO, "SO")}
              {renderSection("Compliance", groupData.Compliance, "Compliance")}
              {renderSection("Export", groupData.Export, "Export")}
              {renderSection("Logs", groupData.Logs, "Logs")}
              {renderSection("HR Extra", groupData.HRExtra, "HRExtra")}
              {renderSection(
                "Support Module",
                groupData.SupportModule,
                "SupportModule"
              )}
              {renderSection("WhatsApp Module", groupData.Whatsapp, "Whatsapp")}
              {renderSection("Reports", groupData.Reports, "Reports")}
              {renderSection("Extra", groupData.Extra, "Extra")}

              <div className="col-md-6">
                <h5 className="fw-semibold">Other Settings</h5>
                <div
                  className="rounded p-3"
                  style={{
                    border: "2px solid #DEE2E6",
                    border: "2px solid #A6AEBF",
                    backgroundColor: "white",
                  }}
                >
                  {renderNumberInput(
                    "Free Trial Days",
                    "FreeTrialDays",
                    groupData.FreeTrialDays
                  )}
                  {renderNumberInput(
                    "Free Trial Per Contact",
                    "FreeTrialPerContact",
                    groupData.FreeTrialPerContact
                  )}
                  {renderNumberInput(
                    "Total CRM Lead Limit",
                    "TotalCRMLeadLimit",
                    groupData.TotalCRMLeadLimit
                  )}
                  {renderNumberInput(
                    "Lead Fetch Ratio",
                    "LeadFetchRatio",
                    groupData.LeadFetchRatio
                  )}
                  {renderNumberInput(
                    "Client Fetch Ratio",
                    "ClientFetchRatio",
                    groupData.ClientFetchRatio
                  )}
                  {renderNumberInput(
                    "Unread Fetch",
                    "UnreadFetch",
                    groupData.UnreadFetch
                  )}

                  <div>
                    <label className="form-label">Lead Fetch From</label>
                    <select
                      className="form-select"
                      value={groupData.leadFetch.from}
                      onChange={(e) =>
                        handleChange("leadFetch.from", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Some Option
                      </option>
                      <option value="dispose pool">Dispose Pool</option>
                      <option value="fresh pool">Fresh Pool</option>
                      <option value="Diamond pool HNI pool">
                        Diamond Pool HNI Pool
                      </option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Lead Fetch Ratio</label>
                    <input
                      type="text"
                      className="form-control"
                      value={groupData.leadFetch.ratio}
                      onChange={(e) =>
                        handleChange("leadFetch.ratio", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary mb-3 mt-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
