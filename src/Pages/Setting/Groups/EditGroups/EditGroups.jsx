import React, { useEffect, useState } from "react";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { useDispatch } from "react-redux";
import { postGroupsThunk, putGroupsThunk } from "../../../../Redux/Services/thunks/GroupsThunk";
import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { staticToken } from "../../../../Redux/Services/apiServer/ApiServer";
import { FaUsers } from "react-icons/fa";

export default function EditGroups() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const { state } = useLocation();
  const recievedGroupData = state?.groupObj;
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
    id: recievedGroupData?.id,
    groupId: recievedGroupData?.groupId,
    groupName: recievedGroupData?.groupName || "",

    Dashboard: {
      ...recievedGroupData?.dashboard, // Spread the existing properties
    },

    Leads: {
      ...recievedGroupData?.leads,
    },

    LeadFetch: {
      Active: recievedGroupData?.LeadFetch?.active ,
      From: recievedGroupData?.LeadFetch?.from,
      Ratio: recievedGroupData?.LeadFetch?.ratio,
    },

    ClientFetch: {
      Active: recievedGroupData?.ClientFetch?.active,
      From: recievedGroupData?.ClientFetch?.from,
      Ratio: recievedGroupData?.ClientFetch?.ratio,
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
    LeadTemplate: {
      ...recievedGroupData?.leadTemplate,
    },
    ClientTemplate: {
      ...recievedGroupData?.clientTemplate,
    },
    TeamMembers: {
      ...recievedGroupData?.teamMembers,
    },
    SmsModule: {
      ...recievedGroupData?.smsModule,
    },
    CallingModule: {
      ...recievedGroupData?.callingModule,
    },
    Mis: {
      ...recievedGroupData?.mis,
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
        const key = pathArray[i];
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }

      // Ensure that 'From' is an array of strings
      if (pathArray[pathArray.length - 1] === "From") {
        current[pathArray[pathArray.length - 1]] = [value];
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
        className="form-control input-box"
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
        id: recievedGroupData?.id || "",
        groupId: recievedGroupData?.groupId || "",
        groupName: recievedGroupData?.groupName || "",

        Dashboard: {
          ...recievedGroupData?.dashboard,
        },

        Leads: {
          ...recievedGroupData?.leads,
        },

        LeadFetch: {
          Active: recievedGroupData?.LeadFetch?.active ?? false,
          From: recievedGroupData?.LeadFetch?.from || [],
          Ratio: recievedGroupData?.LeadFetch?.ratio || "string",
        },

        ClientFetch: {
          Active: recievedGroupData?.ClientFetch?.active ?? false,
          From: recievedGroupData?.ClientFetch?.from || [],
          Ratio: recievedGroupData?.ClientFetch?.ratio || "string",
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

        LeadTemplate: {
          ...recievedGroupData?.leadTemplate,
        },
        ClientTemplate: {
          ...recievedGroupData?.clientTemplate,
        },
        TeamMembers: {
          ...recievedGroupData?.teamMembers,
        },
        SmsModule: {
          ...recievedGroupData?.smsModule,
        },
        CallingModule: {
          ...recievedGroupData?.callingModule,
        },
        Mis: {
          ...recievedGroupData?.mis,
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
  }, [recievedGroupData]);

  // console.log("groupData.Compliance.kyc--------------------",groupData.Compliance.Kyc);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true); // Show the alert

    const groupId = recievedGroupData.groupId; // Ensure the `id` exists in the user object
    const AddGroups = {
      id: groupData.id,
      groupId: groupData.groupId,
      groupName: groupData.groupName,
      dashboard: {
        salesDashboard: groupData.Dashboard.salesDashboard,
        callingDashboard: groupData.Dashboard.callingDashboard,
      },
      leads: {
        create: groupData.Leads.create,
        view: groupData.Leads.view,
        marketingLeads: groupData.Leads.marketingLeads,
        edit: groupData.Leads.edit,
        delete: groupData.Leads.delete,
        dispose: groupData.Leads.dispose,
        disposeClients: groupData.Leads.disposeClients,
        upload: groupData.Leads.upload,
        internalAssign: groupData.Leads.internalAssign,
        outerAssign: groupData.Leads.outerAssign,
        globalAssign: groupData.Leads.globalAssign,
        viewFollowUp: groupData.Leads.viewFollowUp,
        deleteFollowUp: groupData.Leads.deleteFollowUp,
        followAssign: groupData.Leads.followAssign,
        bulkLeadOperation: groupData.Leads.bulkLeadOperation,
        leadAction: groupData.Leads.leadAction,
        leadActionAssign: groupData.Leads.leadActionAssign,
        createAgreement: groupData.Leads.createAgreement,
        addRPM: groupData.Leads.addRPM,
      },
      contact: {
        create: groupData.Contact.create,
        view: groupData.Contact.view,
        contactAssign: groupData.Contact.contactAssign,
        contactAction: groupData.Contact.contactAction,
        contactActionAssign: groupData.Contact.contactActionAssign,
      },
      mutualFund: {
        create: groupData.MutualFund.create,
        view: groupData.MutualFund.view,
        mutualFundAssign: groupData.MutualFund.mutualFundAssign,
        mutualFundAction: groupData.MutualFund.mutualFundAction,
        mutualFundActionAssign: groupData.MutualFund.mutualFundActionAssign,
      },
      freeTrial: {
        create: groupData.FreeTrial.create,
        view: groupData.FreeTrial.view,
        edit: groupData.FreeTrial.edit,
        outerAssign: groupData.FreeTrial.outerAssign,
      },
      so: {
        create: groupData.SO.create,
        view: groupData.SO.view,
        edit: groupData.SO.edit,
        approveSO: groupData.SO.approveSO,
        invoice: groupData.SO.invoice,
        paymentPortal: groupData.SO.paymentPortal,
        paymentApproval: groupData.SO.paymentApproval,
        paymentEdit: groupData.SO.paymentEdit,
        delete: groupData.SO.delete,
        serviceActivation: groupData.SO.serviceActivation,
        paidClientAssign: groupData.SO.paidClientAssign,
        paidClientAction: groupData.SO.paidClientAction,
        paidClientActionAssign: groupData.SO.paidClientActionAssign,
      },
      compliance: {
        kyc: groupData.Compliance.kyc,
        riskProfile: groupData.Compliance.riskProfile,
        agreement: groupData.Compliance.agreement,
        agreementApproved: groupData.Compliance.agreementApproved,
        viewRPM: groupData.Compliance.viewRPM,
        editRPM: groupData.Compliance.editRPM,
        invoice: groupData.Compliance.invoice,
        soReport: groupData.Compliance.soReport,
        taxReport: groupData.Compliance.taxReport,
      },
      logs: {
        client: groupData.Logs.client,
        sms: groupData.Logs.sms,
        chat: groupData.Logs.chat,
        whatsapp: groupData.Logs.whatsapp,
        login: groupData.Logs.login,
        extension: groupData.Logs.extension,
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
        showWhatsapp: groupData.Whatsapp.showWhatsapp,
        sendAttachment: groupData.Whatsapp.sendAttachment,
      },
      export: {
        leads: groupData.Export.leads,
        contacts: groupData.Export.contacts,
        freeTrial: groupData.Export.freeTrial,
        followUp: groupData.Export.followUp,
        clients: groupData.Export.clients,
        salesOrder: groupData.Export.salesOrder,
        smsLogs: groupData.Export.smsLogs,
        chatLogs: groupData.Export.chatLogs,
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
        orgChart: groupData.HRExtra.orgChart,
        scrapBook: groupData.HRExtra.scrapBook,
        holiday: groupData.HRExtra.holiday,
      },
      reports: {
        generalReport: groupData.Reports.generalReport,
        ftReport: groupData.Reports.ftReport,
        paidClientReport: groupData.Reports.paidClientReport,
        expiredPaidClientReport: groupData.Reports.expiredPaidClientReport,
        userReport: groupData.Reports.userReport,
        callingReport: groupData.Reports.callingReport,
        messageReport: groupData.Reports.messageReport,
        smsReport: groupData.Reports.smsReport,
        dndReport: groupData.Reports.dndReport,
        tracksheet: groupData.Reports.tracksheet,
        researchReport: groupData.Reports.researchReport,
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
        sendSMS: groupData.SmsModule.sendSMS,
        viewSMS: groupData.SmsModule.viewSMS,
      },
      callingModule: {
        monitoring: groupData.CallingModule.monitoring,
        reports: groupData.CallingModule.reports,
        sendSMSViaGateway: groupData.CallingModule.sendSMSViaGateway,
        viewSMSViaGateway: groupData.CallingModule.viewSMSViaGateway,
        missCall: groupData.CallingModule.missCall,
        liveCall: groupData.CallingModule.liveCall,
      },
      leadTemplate: {
        sendSMSLead: groupData.LeadTemplate.sendSMSLead,
        sendWhatsappLead: groupData.LeadTemplate.sendWhatsappLead,
        sendEmailLead: groupData.LeadTemplate.sendEmailLead,
      },
      clientTemplate: {
        sendSMSClient: groupData.ClientTemplate.sendSMSClient,
        sendWhatsappClient: groupData.ClientTemplate.sendWhatsappClient,
        sendEmailClient: groupData.ClientTemplate.sendEmailClient,
      },
      supportModule: {
        itAdmin: groupData.SupportModule.itAdmin,
        hrAdmin: groupData.SupportModule.hrAdmin,
        complianceAdmin: groupData.SupportModule.complianceAdmin,
        admin: groupData.SupportModule.admin,
      },
      teamMembers: {
        list: groupData.TeamMembers.list,
        data: groupData.TeamMembers.data,
      },
      freeTrialDays: groupData.FreeTrialDays,
      freeTrialPerContact: groupData.FreeTrialPerContact,
      totalCRMLeadLimit: groupData.TotalCRMLeadLimit,
      unreadFetch: groupData.UnreadFetch,
    };

    // try {
    //   const token = staticToken;
    //   const response = await fetch(
    //     `/api/Groups/UpdateByIdGroups?id=${groupData.id}&groupId=${groupId}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify(AddGroups),
    //     }
    //   );

    //   if (!response.ok) throw new Error("Failed to update user.");
    //   const result = await response.json();
    //   console.log("User updated successfully:", result);

    //   alert("User updated successfully!");
    //   setShowAlert(false);
    // } catch (error) {
    //   console.error("Error updating user:", error);
    //   alert("Failed to update user.");
    // }

    dispatch(putGroupsThunk(AddGroups))
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
            style={{ marginRight: "8px", color: "#2c3e50" }}
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
                        className="form-control input-box"
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
                        className="form-control input-box"
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
                        className="form-control input-box"
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
                        type="text"
                        className="form-control input-box"
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
                        className="form-control input-box"
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
                        className="form-control input-box"
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
                        className="form-select input-box"
                        value={groupData.LeadFetch.From}
                        onChange={(e) =>
                          handleChange("LeadFetch.From", e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select Some Option
                        </option>
                  <option value="Additional Pool">Additional Pool</option>
                  <option value="Fresh Pool">Fresh Pool</option>
                        <option value="HNI Pool">HNI Pool</option>
                        <option value="Platinum Pool">Platinum Pool</option>
                        <option value="Diamond Pool">Diamond Pool </option>
                        <option value="Dispose Pool">Dispose Pool</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client Fetch From</label>
                      <select
                        className="form-select input-box"
                        value={groupData.ClientFetch.From}
                        onChange={(e) =>
                          handleChange("ClientFetch.From", e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select Some Option
                        </option>
                  <option value="Additional Pool">Additional Pool</option>
                  <option value="Fresh Pool">Fresh Pool</option>
                        <option value="HNI Pool">HNI Pool</option>
                        <option value="Platinum Pool">Platinum Pool</option>
                        <option value="Diamond Pool">Diamond Pool  </option>
                        <option value="Dispose Pool">Dispose Pool</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn mb-2 mt-3 text-white px-4 py-1" style={{backgroundColor:"#2c3e50"}}>
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
