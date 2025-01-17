import React, { useEffect, useState } from "react";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { useDispatch } from "react-redux";
import { postGroupsThunk } from "../../../../Redux/Services/thunks/GroupsThunk";
import { Alert } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";

export default function AddGroups() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

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
    groupName: "",
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
    LeadFetch: {
      Active: false,
      From: [],
      Ratio: "",
    },
    ClientFetch: {
      Active: false,
      From: [],
      Ratio: "",
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
    LeadTemplate: {
      SendSMSLead: false,
      SendWhatsappLead: false,
      SendEmailLead: false,
    },
    ClientTemplate: {
      SendSMSClient: false,
      SendWhatsappClient: false,
      SendEmailClient: false,
    },
    TeamMembers: {
      List: false,
      Data: false,
    },
    SmsModule: {
      SendSMS: false,
      ViewSMS: false,
    },
    CallingModule: {
      Monitoring: false,
      Reports: false,
      SendSMSViaGateway: false,
      ViewSMSViaGateway: false,
      MissCall: false,
      LiveCall: false,
    },
    Mis: {
      employee: false,
      lead: false,
      client: false,
      sales: false,
      disposeLeads: false,
      preSales: false,
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
      Login: false,
      Extension: false,
    },
    Extra: {
      callingModule: false,
      userModule: false,
      groupModule: false,
      poolsModule: false,
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
    FreeTrialDays: null,
    FreeTrialPerContact: null,
    TotalCRMLeadLimit: null,
    LeadFetchRatio: null,
    ClientFetchRatio: null,
    UnreadFetch: null,
  });
  console.log(groupData);

  const handleChange = (path, value) => {
    setGroupData((prevData) => {
      const newData = { ...prevData };
      const pathArray = path.split(".");

      let current = newData;
      for (let i = 0; i < pathArray.length - 1; i++) {
        const key = pathArray[i];
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }

      // Ensure that 'From' is an array of strings
      if (pathArray[pathArray.length - 1] === "From") {
        current[pathArray[pathArray.length - 1]] = [value]; // Make sure the value is an array
      } else {
        current[pathArray[pathArray.length - 1]] = value;
      }

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
        onChange={(e) => handleChange(path, Number(e.target.value) || 0)}
      />
    </div>
  );

  const renderSection = (title, fields, basePath) => (
    <div className="col-md-6 mb-2">
      <h5 className="fw-semibold">{title}</h5>
      <div
        className="p-3 rounded border border-2 border-grey"
        style={{
          backgroundColor: "white",
          // border: "2px solid #A6AEBF",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);

    const AddGroups = {
      id: 0,
      groupName: groupData.groupName,
      groupId: "",
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
        login: groupData.Logs.Login,
        extension: groupData.Logs.Extension,
      },
      extra: {
        callingModule: groupData.Extra.callingModule,
        userModule: groupData.Extra.userModule,
        groupModule: groupData.Extra.groupModule,
        poolsModule: groupData.Extra.poolsModule,
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
        employee: groupData.Mis.employee,
        lead: groupData.Mis.lead,
        client: groupData.Mis.client,
        sales: groupData.Mis.sales,
        disposeLeads: groupData.Mis.disposeLeads,
        preSales: groupData.Mis.preSales,
      },
      hrExtra: {
        orgChart: groupData.HRExtra.ORGChart,
        scrapBook: groupData.HRExtra.ScrapBook,
        holiday: groupData.HRExtra.Holiday,
      },
      reports: {
        generalReport: groupData.Reports.GeneralReport,
        ftReport: groupData.Reports.FTReport,
        paidClientReport: groupData.Reports.PaidClientReport,
        expiredPaidClientReport: groupData.Reports.ExpiredPaidClientReport,
        userReport: groupData.Reports.UserReport,
        callingReport: groupData.Reports.CallingReport,
        messageReport: groupData.Reports.MessageReport,
        smsReport: groupData.Reports.SMSReport,
        dndReport: groupData.Reports.DNDReport,
        tracksheet: groupData.Reports.Tracksheet,
        researchReport: groupData.Reports.ResearchReport,
      },
      leadFetch: {
        active: groupData.LeadFetch.Active,
        from: groupData.LeadFetch.From,
        ratio: groupData.LeadFetch.Ratio,
      },
      clientFetch: {
        active: groupData.ClientFetch.Active,
        from: groupData.ClientFetch.From,
        ratio: groupData.ClientFetch.Ratio,
      },
      smsModule: {
        sendSMS: groupData.SmsModule.SendSMS,
        viewSMS: groupData.SmsModule.ViewSMS,
      },
      callingModule: {
        monitoring: groupData.CallingModule.Monitoring,
        reports: groupData.CallingModule.Reports,
        sendSMSViaGateway: groupData.CallingModule.SendSMSViaGateway,
        viewSMSViaGateway: groupData.CallingModule.ViewSMSViaGateway,
        missCall: groupData.CallingModule.MissCall,
        liveCall: groupData.CallingModule.LiveCall,
      },
      leadTemplate: {
        sendSMSLead: groupData.LeadTemplate.SendSMSLead,
        sendWhatsappLead: groupData.LeadTemplate.SendWhatsappLead,
        sendEmailLead: groupData.LeadTemplate.SendEmailLead,
      },
      clientTemplate: {
        sendSMSClient: groupData.ClientTemplate.SendSMSClient,
        sendWhatsappClient: groupData.ClientTemplate.SendWhatsappClient,
        sendEmailClient: groupData.ClientTemplate.SendEmailClient,
      },
      supportModule: {
        itAdmin: groupData.SupportModule.ITAdmin,
        hrAdmin: groupData.SupportModule.HRAdmin,
        complianceAdmin: groupData.SupportModule.ComplianceAdmin,
        admin: groupData.SupportModule.Admin,
      },
      teamMembers: {
        list: groupData.TeamMembers.List,
        data: groupData.TeamMembers.Data,
      },
      freeTrialDays: groupData.FreeTrialDays,
      freeTrialPerContact: groupData.FreeTrialPerContact,
      totalCRMLeadLimit: groupData.TotalCRMLeadLimit,
      unreadFetch: groupData.UnreadFetch,
    };

    dispatch(postGroupsThunk(AddGroups))
      .then((response) => {
        console.log("Group added successfully:", response);
      })
      .catch((error) => {
        console.error("Error adding group:", error);
      });
  };

  return (
    <>
      <section
        style={{
          position: "relative",
          // padding: "12px 30px",
          backgroundColor: "#fff",
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
            padding: "18px 16px",
            fontSize: "30px",
            color: "#2D2D2D",
          }}
        >
          <FaUsers
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Groups
        </h2>
      </section>
      <div
        className="mt-2"
        // style={{ padding: "18px 16px" }}
      >
        <div className="border border-2 border-grey">
          <h5
            className="text-dark border border-1 pb-2"
            style={{
              // padding: "18px 16px",
              fontSize: "1.7 rem",
              backgroundColor: "#E8F1F3",
            }}
          >
            <BackButton />
            Add Groups
          </h5>
          <div className="p-2">
            <div>
              {showAlert && (
                <Alert variant="info" className="mt-2 text-center">
                  Group Added Successfully
                </Alert>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fs-5 fw-semibold">
                  Group Name
                </label>
                <input
                  type="text"
                  className="form-control border border-2 border-grey"
                  // style={{ border: "2px solidrgb(48, 93, 192)" }}
                  value={groupData.groupName || ""}
                  onChange={(e) => handleChange("groupName", e.target.value)}
                />
              </div>

              <div className="row">
                {renderSection("Dashboard", groupData.Dashboard, "Dashboard")}
                {renderSection("Free Trial", groupData.FreeTrial, "FreeTrial")}
                {renderSection("Contact", groupData.Contact, "Contact")}
                {renderSection(
                  "Mutual Fund",
                  groupData.MutualFund,
                  "MutualFund"
                )}
                {renderSection(
                  "Compliance",
                  groupData.Compliance,
                  "Compliance"
                )}
                {renderSection("Reports", groupData.Reports, "Reports")}

                {renderSection(
                  "Client Fetch",
                  groupData.ClientFetch,
                  "ClientFetch"
                )}
                {renderSection("Lead Fetch", groupData.LeadFetch, "LeadFetch")}
                {renderSection(
                  "Lead Template",
                  groupData.LeadTemplate,
                  "LeadTemplate"
                )}
                {renderSection(
                  "Client Template",
                  groupData.ClientTemplate,
                  "ClientTemplate"
                )}
                {renderSection(
                  "Team Members",
                  groupData.TeamMembers,
                  "TeamMembers"
                )}
                {renderSection("SMS Module", groupData.SmsModule, "SmsModule")}
                {renderSection(
                  "Calling Module",
                  groupData.CallingModule,
                  "CallingModule"
                )}
                {renderSection("Mis", groupData.Mis, "Mis")}

                {renderSection(
                  "Support Module",
                  groupData.SupportModule,
                  "SupportModule"
                )}
                {renderSection("Logs", groupData.Logs, "Logs")}
                {renderSection("HR Extra", groupData.HRExtra, "HRExtra")}

                {renderSection(
                  "WhatsApp Module",
                  groupData.Whatsapp,
                  "Whatsapp"
                )}
                {renderSection("SO", groupData.SO, "SO")}
                {renderSection("Export", groupData.Export, "Export")}
                {renderSection("Leads", groupData.Leads, "Leads")}
                {renderSection("Extra", groupData.Extra, "Extra")}
              </div>
              <div className="col-md-6 w-100">
                <h5 className="fw-semibold">Other Settings</h5>
                <div
                  className="rounded p-3 border border-2 border-grey"
                  style={{
                    // border: "2px solid #DEE2E6",
                    backgroundColor: "white",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)", // 4 columns of equal width
                      gap: "20px", // space between items
                      alignItems: "center", // aligns items vertically
                    }}
                  >
                    <div className="mb-3">
                      <label className="form-label" htmlFor="FreeTrialDays">
                        Free Trial Days
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="FreeTrialDays"
                        value={groupData.FreeTrialDays}
                        onChange={(e) =>
                          handleChange(
                            "FreeTrialDays",
                            Number(e.target.value) || 0
                          )
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="FreeTrialPerContact"
                      >
                        Free Trial Per Contact
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="FreeTrialPerContact"
                        value={groupData.FreeTrialPerContact}
                        onChange={(e) =>
                          handleChange(
                            "FreeTrialPerContact",
                            Number(e.target.value) || 0
                          )
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="TotalCRMLeadLimit">
                        Total CRM Lead Limit
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="TotalCRMLeadLimit"
                        value={groupData.TotalCRMLeadLimit}
                        onChange={(e) =>
                          handleChange(
                            "TotalCRMLeadLimit",
                            Number(e.target.value) || 0
                          )
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="LeadFetchRatio">
                        Lead Fetch Ratio
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="LeadFetchRatio"
                        value={groupData.LeadFetch.Ratio}
                        onChange={(e) =>
                          handleChange("LeadFetch.Ratio", e.target.value)
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="ClientFetchRatio">
                        Client Fetch Ratio
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="ClientFetchRatio"
                        value={groupData.ClientFetch.Ratio}
                        onChange={(e) =>
                          handleChange("ClientFetch.Ratio", e.target.value)
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="UnreadFetch">
                        Unread Fetch
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="UnreadFetch"
                        value={groupData.UnreadFetch}
                        onChange={(e) =>
                          handleChange(
                            "UnreadFetch",
                            Number(e.target.value) || 0
                          )
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Lead Fetch From</label>
                      <select
                        className="form-select"
                        value={groupData.LeadFetch.From}
                        onChange={(e) =>
                          handleChange("LeadFetch.From", e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select Some Option
                        </option>
                        <option value="DisposePool">Dispose Pool</option>
                        <option value="FreshPool">Fresh Pool</option>
                        <option value="DiamondPoolHNIPool">
                          Diamond Pool HNI Pool
                        </option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client Fetch From</label>
                      <select
                        className="form-select"
                        value={groupData.ClientFetch.From}
                        onChange={(e) =>
                          handleChange("ClientFetch.From", e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select Some Option
                        </option>
                        <option value="DisposePool">Dispose Pool</option>
                        <option value="FreshPool">Fresh Pool</option>
                        <option value="DiamondPoolHNIPool">
                          Diamond Pool HNI Pool
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn mb-2 mt-3 text-white px-4 py-1" style={{backgroundColor:"#009688"}}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
