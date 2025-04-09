import React, { useEffect, useState } from "react";
import "./ViewLeads.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import { StatusButton } from "../../../Components/Button/StatusButton/StatusButton";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { fetchAllUploadBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import { getByIdUploadBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import { useLocation, useNavigate } from "react-router-dom";
import { DisposeDataUrl, emp, getAllPoolAccessUrl, GetcampaignNameByEmpCodeUrl, staticToken, storedUsername } from "../../../Redux/Services/apiServer/ApiServer";
import { UpdateBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import ExportData from "../../../Components/Button/DataButton/ExportButton";
import { FaEye } from "react-icons/fa";
import FilterImport from "../../../Components/FilterImport/FilterImport";
import { PRButton } from "../../../Components/Button/PRButton/PRButton";
import { LucideChevronLeft, LucideChevronRight, LucidePencil, PhoneCall } from "lucide-react";
import { getAllAgeFilterThunk } from "../../../Redux/Services/thunks/AgeFilterThunk";
import { getAllEmpCodeNameThunk, getExtensionEmpThunk, postCallingEmpThunk } from "../../../Redux/Services/thunks/AdditionalApiThunk";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { GrAdd } from "react-icons/gr";
import { AiOutlineUserAdd } from "react-icons/ai";
const ViewLeads = () => {
  // window.scrollTo({ top: 0, behavior: "smooth" });
  // window.scrollTo(0, 0);
  const [editAddLead, setEditAddLead] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [leads, setLeads] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemperPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [addSegment, setaddSegment] = useState("");
  const [addComment, setaddComment] = useState("");
  const [addstatus, setaddStatus] = useState("");
  const [addfreeTrialStartDate, setAddFreeTrialStartDate] = useState("");
  const [addfreeTrialEndDate, setAddFreeTrialEndDate] = useState("");
  const [addFollowUpDate, setAddFollowUpDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showFreeTrialPopup, setShowFreeTrialPopup] = useState(false);
  const [showFollowUpPopup, setShowFollowUpPopup] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [CampaignNames, setcampaignNames] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [firstCampaign, setFirstCampaign] = useState('');
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.uploadbulklead);
  const { data: additionalData, loading: additionalLoading, error: additionalError } = useSelector((state) => state.additional);
  // const CampaignNamesUrl = GetcampaignNameByEmpCodeUrl;
  // const todayDate = new Date().toISOString().split('T')[0];
  // const { mobile, setMobile } = useState("")
  const [extensionNumber, setExtensionNumber] = useState("");
  const { emplist, } = useSelector((state) => state.additional);
  const [options, setOptions] = useState([]);
  const ExtensionEmp = emp;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDateTime = selectedDate
    ? moment(selectedDate).format("DD/MM/YYYY hh:mm a")
    : null;

  const pageOptions = [10, 20, 30, 50, 70, 100];
  const Navigate = useNavigate()


  const handleNavigateToAddUser = () => {
    Navigate(`/addleads`);
  };



  useEffect(() => {
    dispatch(getAllEmpCodeNameThunk());
  }, [dispatch]);

  useEffect(() => {
    if (emplist && Array.isArray(emplist.data)) {

      const transformedOptions = emplist.data.map((item) => ({
        id: item.employeeCode,
        employeeCode: item.employeeCode,
        employeeName: item.employeeName,
        label: `${item.employeeCode} - ${item.employeeName}`,
      }));

      setOptions(transformedOptions);
    } else {

    }
  }, [emplist]);


  useEffect(() => {
    dispatch(getExtensionEmpThunk(ExtensionEmp));
  }, [dispatch]);


  useEffect(() => {
    if (additionalData?.data) {
      setExtensionNumber(additionalData?.data?.extensionNumber);
    }
  }, [additionalData]);



  const handleCalling = (mobileNumber, leadId, clientName) => {
    const params = {
      mobile: mobileNumber,
      extension: extensionNumber,
      leadid: leadId,
      ContactName: clientName,
    };
    dispatch(postCallingEmpThunk(params)).then(() => {
      // console.log("Call initiated with:", params);
    });
  };
  const handleCampaignNames = (event) => {
    setSelectedCampaign(event.target.value);
    if (event.target.value === "all") {
    }
  };


  useEffect(() => {
    fetch(getAllPoolAccessUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${staticToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Sorting based on poolRatio in descending order
          const sortedCampaigns = data.data.sort((a, b) => b.poolRatio - a.poolRatio);
          setcampaignNames(sortedCampaigns);

          // Set first campaign as default
          if (sortedCampaigns.length > 0) {
            setSelectedCampaign(sortedCampaigns[0].poolName);
          }
        } else {
          console.error("Error:", data.message);
        }
      })
      .catch((err) => {
        console.error("An error occurred while fetching campaign names", err);
      });
  }, []);
  const [updateStatus, setUpdateStatus] = useState({
    1: "BUSY",
    2: "FUTURE FOLLOWUP",
    3: "INSTERESTED",
    4: "NOT INSTERESTED",
    5: "NOT REACHABLE",
    6: "NPC",
    7: "PAID CLIENT",
    8: "SWITCH OFF",
  });

  const leadStatusMap = {
    1: "BUSY",
    2: "FUTURE FOLLOWUP",
    3: "INTERESTED",
    4: "NOT INTERESTED",
    5: "NOT REACHABLE",
    6: "NPC",
    7: "PAID CLIENT",
    8: "SWITCH OFF",
  };



  const handleOpenPopup = (fromWhere) => {
    const popupStates = {
      segment: setShowPopup,
      comment: setShowCommentPopup,
      freeTrial: setShowFreeTrialPopup,
      followUp: setShowFollowUpPopup,
      status: setShowStatusPopup
    };

    setShowPopup(false);
    setShowCommentPopup(false);
    setShowFreeTrialPopup(false);
    setShowFollowUpPopup(false);
    setShowStatusPopup(false);

    if (popupStates[fromWhere]) {
      popupStates[fromWhere](true);
    }
  };


  const handleClosePopup = () => {
    setShowPopup(false);
    setShowCommentPopup(false);
    setShowFreeTrialPopup(false);
    setShowFollowUpPopup(false);
    setShowStatusPopup(false);
  };


  //?<-----------------------------------------------------------Status DropDown----------------------------------------------------------------------->
  const handleChangedropdown = (event, field) => {
    const value = event.target.value;

    if (field === "status") {
      const statusKey = Object.keys(updateStatus).find(
        (key) => updateStatus[key] === value
      );

      setaddStatus(statusKey || value);
    } else if (field === "segment") {
      setaddSegment(value);
    }
  };



  const handleChangeInput = (event) => {
    setaddComment(event.target.value);
  };
  const handleChangeDate = (event, field) => {
    const value = event.target.value;
    if (field === "start") {
      setAddFreeTrialStartDate(value);
    } else if (field === "end") {
      setAddFreeTrialEndDate(value);
    } else if (field === "followUp") {
      setAddFollowUpDate(value);
    }
  };


  const handleDisposeLead = async (leadId) => {

    const apiUrl = `${DisposeDataUrl}?LeadId=${leadId}&EmployeeCode=${"INFADMIN2901"}&LeadSource=${"Dispose Pool"}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${staticToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Lead disposed successfully");
        dispatch(getByIdUploadBulkLeadThunk(requestData));
      } else {
        console.error("Failed to dispose lead");
      }
    } catch (error) {
      console.error("Error disposing lead:", error);
    }
  };


  const handleupdate = async () => {
    if (!selectedLeadId) {
      console.error("Please select a lead first.");
      return;
    }
    const lead = leads.find(
      (leadObj) => leadObj.lead.leadId === selectedLeadId
    )?.lead;
    if (!lead) {
      return;
    }
    const addNewLead = {
      id: lead.id,
      leadId: lead.leadId,
      campaignName: lead.campaignName,
      clientName: lead.clientName,
      assignedTo: lead.assignedTo,
      employeeCode: lead.employeeCode,
      leadSource: lead.leadSource,
      mobile: lead.mobile,
      alternateMobile: lead.alternateMobile,
      otherMobile1: lead.otherMobile1,
      otherMobile2: lead.otherMobile2,
      email: lead.email,
      city: lead.city,
      state: lead.state,
      dob: lead.dob ? new Date(lead.dob).toISOString().split('T')[0] : null,
      investmentDetail: {
        investment: lead.investmentDetail?.investment,
        profile: lead.investmentDetail?.profile,
        trading: lead.investmentDetail?.trading,
        lot: 0,
        tradingExp: lead.investmentDetail?.tradingExp,
        annualIncome: lead.investmentDetail?.annualIncome,
        investmentGoal: lead.investmentDetail?.investmentGoal,
        marketValue: lead.investmentDetail?.marketValue,
        minInvestment: lead.investmentDetail?.minInvestment,
        sourceOfIncome: lead.investmentDetail?.sourceOfIncome,
        panNo: lead.investmentDetail?.panNo,
        uidAadhaar: lead.investmentDetail?.uidAadhaar,
        amountCapping: lead.investmentDetail?.amountCapping,
      },
      language: lead.language,
      followupDetail: {
        leadStatus:
          addstatus !== "" ? addstatus : lead.followupDetail?.leadStatus || "",
        segment:
          addSegment !== "" ? addSegment : lead.followupDetail?.segment || "",
        followUpDate:
          addFollowUpDate !== ""
            ? addFollowUpDate
            : lead.followupDetail?.followUpDate || null,
        comment:
          addComment !== "" ? addComment : lead.followupDetail?.comment || "",
        freeTrialStartDate:
          addfreeTrialStartDate !== ""
            ? addfreeTrialStartDate
            : lead.followupDetail?.freeTrialStartDate || null,
        freeTrialEndDate:
          addfreeTrialEndDate !== ""
            ? addfreeTrialEndDate
            : lead.followupDetail?.freeTrialEndDate || null,
        followUpDateTime: formattedDateTime || null,
      },
    };
    dispatch(UpdateBulkLeadThunk(addNewLead))
      .then((response) => {
        if (response.payload === null) {
          console.error("No data received from the server");
        }
        // setTimeout(() => {
        //   window.location.reload();
        // }, 100);
        setLeadStatus("");
        fetchLeadsbyPageNumber(currentPage)
      })
      .catch((error) => {
        console.error("Error adding:", error);
      });

    setSelectedLeadId("");
    setaddStatus("")
    handleClosePopup();
    setLeadStatus("");
  };

  const requestData = {
    EmployeeCode: emp,
    LeadSourceName: selectedCampaign,
    pageNumber: currentPage,
    limit: itemsPerPage,
  };


  //!<---------------------------------------------------------------------------------REACH EDIT PAGE BY NAVIGATION ---------------------------------------------------------------------->
  // const Navigate = useNavigate();
  const handleNavigateToPR = (id, leadObj) => {
    Navigate(`/paymnetRaise/${id}`, { state: { leadObj } });
  };
  const handleNavigateToEditLead = (id, leadObj) => {
    Navigate(`/editleads/${id}`, {
      state: {
        leadObj,
        LeadId: leads.LeadId,
      },
    });
  };
  //!<---------------------------------------------------------------------------------SEND QUERY IN GET METHOD---------------------------------------------------------------------->

  const handleFetchLeadButton = async () => {
    // console.log("Fetching leads with requestData:", requestData);

    try {
      const result = await dispatch(fetchAllUploadBulkLeadThunk(requestData));

      if (fetchAllUploadBulkLeadThunk.fulfilled.match(result)) {
        const payload = result.payload;
        // console.log("API Response:", payload);

        if (payload?.success) {
          alert(`Lead Fetch Successfully ${payload?.message || ""}`);
          window.location.reload();
        } else {
          alert(`You have reached the maximum number of leads Limit!!!${payload?.message}`);
        }
      }
      else if (fetchAllUploadBulkLeadThunk.rejected.match(result)) {
        const errorMessage = result?.payload?.message || "Failed to fetch leads.";
        console.error("API Call Rejected:", errorMessage);
        alert(`API Call Failed: ${errorMessage}`);
      }

    } catch (error) {
      console.error("Error fetching leads:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Unknown error occurred.";
      alert(`API Call Failed: ${errorMessage}`);
    }
  };


  const [filterData, setfilterData] = useState([]);
  const [selectedLeadSource, setSelectedLeadSource] = useState("All");
  const [ageBetween1, setAgeBetween1] = useState("");
  const [ageBetween2, setAgeBetween2] = useState("");
  const [State, setState] = useState("All");
  const [City, setCity] = useState("");
  const [employeeCode, setemployeeCode] = useState("");
  const [leadStatus, setLeadStatus] = useState("All");
  const [segment, setSegment] = useState("");
  const [filterHas, setFilterHas] = useState(false);
  // const [pageNumber] = useState(1);
  // const [limit] = useState(10);

  const { data: ageFilterData } = useSelector((state) => state.agefilter);


  const indianStates = [
    "All", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar", "Chandigarh",
    "Daman and Diu", "Lakshadweep", "Delhi",
    "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];

  const hasActiveFilters = (filters) => {
    return Object.entries(filters).some(
      ([key, value]) =>
        !["pageNumber", "limit", "EmployeeCode"].includes(key) && value !== "" && value !== "All"
    );
  };


  const fetchLeads = () => {
    if (emp === "INFADMIN2901") {
      if (employeeCode === "INFADMIN2901") {
        const filters = {
          agebetween1: ageBetween1 || "",
          agebetween2: ageBetween2 || "",
          LeadSource: selectedLeadSource === "All" ? "" : selectedLeadSource,
          LeadStatus: leadStatus === "All" ? "" : leadStatus,
          Segment: segment || "",
          state: State === "All" ? "" : State,
          city: City || "",
          pageNumber: currentPage,
          limit: itemsPerPage,
          // employeeCode: employeeCode || emp,
        };
        const hasFilters = Object.entries(filters).some(([key, value]) =>
          key !== "pageNumber" && key !== "limit" && value !== ""
        );
        //setFilterHas(hasFilters);
        if (hasFilters) {
          filters.HashFilter = hasActiveFilters(filters);
          dispatch(getAllAgeFilterThunk({ ...filters }));
        } else {
          dispatch(getByIdUploadBulkLeadThunk(requestData));
        }
      } else {
        const filters = {
          agebetween1: ageBetween1 || "",
          agebetween2: ageBetween2 || "",
          LeadSource: selectedLeadSource === "All" ? "" : selectedLeadSource,
          LeadStatus: leadStatus === "All" ? "" : leadStatus,
          Segment: segment || "",
          state: State === "All" ? "" : State,
          city: City || "",
          pageNumber: currentPage,
          limit: itemsPerPage,
        };
        const hasFilters = Object.entries(filters).some(([key, value]) =>
          key !== "pageNumber" && key !== "limit" && value !== "" && value !== "All"
        );
        //setFilterHas(hasFilters);
        if (hasFilters) {
          filters.HashFilter = hasActiveFilters(filters);
          dispatch(getAllAgeFilterThunk({ ...filters, employeeCode: employeeCode }));
        } else {
          dispatch(getByIdUploadBulkLeadThunk({ ...requestData, employeeCode: employeeCode }));
        }
      }

    } else {
      const filters = {
        agebetween1: ageBetween1 || "",
        agebetween2: ageBetween2 || "",
        LeadSource: selectedLeadSource === "All" ? "" : selectedLeadSource,
        LeadStatus: leadStatus === "All" ? "" : leadStatus,
        Segment: segment || "",
        state: State === "All" ? "" : State,
        city: City || "",
        pageNumber: currentPage,
        limit: itemsPerPage,
        //employeeCode: employeeCode || emp,
      };
      const hasFilters = Object.entries(filters).some(([key, value]) =>
        key !== "pageNumber" && key !== "limit" && value !== "" && value !== "INFADMIN2901"
      );
      //setFilterHas(hasFilters);
      if (hasFilters) {
        filters.HashFilter = hasActiveFilters(filters);
        dispatch(getAllAgeFilterThunk({ ...filters, employeeCode: employeeCode || emp }));
      } else {
        dispatch(getByIdUploadBulkLeadThunk(requestData));
      }
    }

  };

  const fetchLeadsbyPageNumber = (page) => {
    const filters = {
      agebetween1: ageBetween1 || "",
      agebetween2: ageBetween2 || "",
      LeadSource: selectedLeadSource === "All" ? "" : selectedLeadSource,
      LeadStatus: leadStatus === "All" ? "" : leadStatus,
      Segment: segment || "",
      state: State === "All" ? "" : State,
      city: City || "",
      pageNumber: currentPage,
      limit: itemsPerPage,
      employeeCode: employeeCode || emp,
    };

    //filters.HasFilter = hasActiveFilters(filters);
    const hasFilters = Object.entries(filters).some(([key, value]) =>
      key !== "pageNumber" && key !== "limit" && value !== ""
    );
    //setFilterHas(hasFilters);
    if (hasFilters) {
      filters.HashFilter = hasActiveFilters(filters);
      dispatch(getAllAgeFilterThunk({ ...filters }));
      //dispatch(getAllAgeFilterThunk(filters));
    } else {
      dispatch(getByIdUploadBulkLeadThunk(requestData));
    }
  };


  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "selectedLeadSource":
        setSelectedLeadSource(value);
        break;
      case "leadStatus":
        setLeadStatus(value);
        break;
      case "segment":
        setSegment(value);
        break;
      case "state":
        setState(value);
        break;
      case "city":
        setCity(value);
        break;
      case "employeeCode":
        setemployeeCode(value);
        break;
      case "ageRange":
        if (value === "All") {
          setAgeBetween1("");
          setAgeBetween2("");
        } else {
          const [min, max] = value.split("-").map(Number);
          setAgeBetween1(min);
          setAgeBetween2(max);
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads();

    }, 300);
    // console.log(" Curret page---------------", currentPage)
    return () => clearTimeout(delayDebounceFn);
  }, [selectedLeadSource, ageBetween1, ageBetween2, employeeCode, leadStatus, segment, State, City, currentPage, itemsPerPage, dispatch, emp,]);


  useEffect(() => {
    if (ageFilterData) {
      setfilterData(ageFilterData);
    }
  }, [ageFilterData]);


  useEffect(() => {
    if (filterData) {
      setLeads(filterData.data);
      setTotalCount(filterData?.totalCount || 0);
      // console.log("totalCount--------------------" + filterData.totalCount)
    } else {
      setLeads([]);
    }
    // console.log("filterData----------------------" + filterData);
  }, [filterData]);

  //!<---------------------------------------------------------------------------------LOGIC FOR PAGINATION---------------------------------------------------------------------->

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // console.log("IF called Pages-----------------",totalPages)

    }
    // console.log("Total Pages-----------------",totalPages)
    // console.log("item Pages-----------------",itemsPerPage)
    // console.log("totalCount Pages-----------------",totalCount)
    // console.log("newPage Pages-----------------",newPage)
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= 6) {

      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3);

      if (currentPage > maxVisiblePages) {
        pages.push('...');
      }
      if (currentPage > maxVisiblePages && currentPage < totalPages - 2) {
        pages.push(currentPage);
      }
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      pages.push(totalPages - 1, totalPages);
    }

    return pages;
  };


  useEffect(() => {
    fetchLeads();
  }, []);


  useEffect(() => {
    if (data) {
      setLeads(data?.data);
      setTotalCount(data?.totalCount || 0);
    }
  }, [data]);



  return (
    <>
      <section
        style={{
          zIndex: "1",
          background: "#2c3e50",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          // marginBottom: "5px",
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
          <FaEye className="me-2 fs-2" /> View Leads
        </h2>
      </section>



      {/* //!-------------------------------------------------------------------------------------Filter Import------------------------------------------------------------------------------------------ */}
      <div className="bg-white border border-2 px-2 ">
        {/* Filters Row */}
        <div className="d-flex align-items-center gap-3 flex-wrap" style={{ height: "80px" }}>

          {/* Lead Source Filter */}
          <div >
            <label className="form-label">Lead Source</label>
            <select className="form-select input-box" name="selectedLeadSource" value={selectedLeadSource} onChange={handleChange}>
              <option value="All">All</option>
              <option value="Additional Pool">Additional Pool</option>
              <option value="Fresh Pool">Fresh Pool</option>
              <option value="Diamond Pool">Diamond Pool</option>
              <option value="Platinum Pool">Platinum Pool</option>
              <option value="HNI Pool">HNI Pool</option>
              <option value="Dispose Pool">Dispose Pool</option>
            </select>
          </div>

          {/* Age Range Filter */}
          <div>
            <label className="form-label">Search By Age</label>
            <select className="form-select input-box" name="ageRange" value={ageBetween1 && ageBetween2 ? `${ageBetween1}-${ageBetween2}` : "All"} onChange={handleChange}>
              <option value="All">All</option>
              <option value="18-25">18 - 25 years</option>
              <option value="26-35">26 - 35 years</option>
              <option value="36-45">36 - 45 years</option>
              <option value="46-55">46 - 55 years</option>
              <option value="56-65">56 - 65 years</option>
              <option value="66-75">66 - 75 years</option>
            </select>
          </div>

          {/* Lead Status Filter */}
          <div>
            <label className="form-label">Lead Status</label>
            <select className="form-select input-box" name="leadStatus" value={leadStatus} onChange={handleChange}>
              <option value="All">All</option>
              <option value="1">BUSY</option>
              <option value="2">FUTURE FOLLOWUP</option>
              <option value="3">INTERESTED</option>
              <option value="4">NOT INTERESTED</option>
              <option value="5">NOT REACHABLE</option>
              <option value="6">NPC</option>
              <option value="7">PAID CLIENT</option>
              <option value="8">SWITCH OFF</option>
            </select>
          </div>

          {/* Segment Filter */}
          <div>
            <label className="form-label w-50">Segment</label>
            <select name="segment" id="" value={segment} className="form-control input-box" onChange={handleChange} >
              <option value="All">All</option>
              <option value="Index Option">Index Option</option>
              <option value="Index Future">Index Future</option>
              <option value="Stock Option">Stock Option</option>
              <option value="Stock Future">Stock Future</option>
              <option value="Stock Cash">Stock Cash</option>
            </select>
            {/* <input type="text" className="form-control input-box" name="segment" placeholder="Enter Segment" value={segment} onChange={handleChange} /> */}
          </div>

          {/* State Filter */}
          <div>
            <label className="form-label w-50">Select State</label>
            <select className="form-select input-box" name="state" value={State} onChange={handleChange}>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>


          {storedUsername?.toLowerCase() === "admin" && (
            <div>
              <label className="form-label">Employee Name</label>
              <select
                className="form-select input-box"

                name="employeeCode"
                value={options.employeeCode}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --Select Employee Name--
                </option>
                {options.map((option) => (
                  <option key={option.id} value={option.employeeCode}>
                    {option.employeeName}
                  </option>
                ))}
              </select>
            </div>
          )}



          {/* <div>
            <label className="form-label">Lead ID</label>
            <input type="text"  className="form-control input-box"
              placeholder="Enter Lead Id "
            // name=""
            // value="" 
            />
          </div> */}

        </div>
      </div>

      <div className=" mt-1 ">
        <div className="viewLead-outerBgBox  mb-2">
          <div className="mt-3 ms-0 me-0">
            <div className="">
            </div>
            <div className="border border-2 p-2 bg-white">
              <div className="d-flex gap-1">
                <div>
                  <button
                    className="btn  btn-sm text-white gap-0 d-flex align-items-center"
                    style={{ backgroundColor: "#2c3e50", display: "flex", alignItems: "center" }}
                    onClick={handleNavigateToAddUser}
                  >
                    <AiOutlineUserAdd className="fs-5" />
                    <span className="ms-2">Add Lead</span>
                  </button>
                </div>
                <div>
                  <ExportData tableId="leads-table" />
                </div>
                <div>
                  <button
                    onClick={handleFetchLeadButton}
                    className="btn btn-sm text-white "
                    style={{ backgroundColor: "#2c3e50" }}
                    disabled={isLoading}
                  >
                    <i class="bi bi-box-arrow-down"></i> Fetch Lead
                  </button>
                </div>
                <div>

                  <div>
                    <div>
                      <div>
                        <div className="dropdown-content-ManagerData w-100">
                          <select
                            value={selectedCampaign}
                            onChange={handleCampaignNames}
                            name="campaign"
                            id="campaign-dropdown"
                            className="form-select input-box">
                            <option value="" disabled>Select a LeadSource</option>
                            <option value="all">All</option> {/* Added "All" option */}
                            {[...new Map(CampaignNames.map(item => [item.poolName, item])).values()]
                              .map((campaign, index) => (
                                <option
                                  key={index}
                                  value={campaign.poolName}               
                                  disabled={campaign.availableLead === 0}
                                >
                                  {campaign.poolName || "N/A"}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>


                <div>
                  <div>
                    {/* <label htmlFor="itemsPerPage">Items per page:</label> */}
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={(e) => setItemperPage(Number(e.target.value))}
                      className="form-select input-box"
                    >
                      {pageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>




              </div>
              <div className="table-responsive">
                <table
                  className="table table-bordered text-center table-hover mt-2 blue-striped "
                  id="leads-table"
                  style={{ fontSize: "12px" }}
                >
                  <thead className="viewLead-tableHeader thead-dark">
                    <tr>
                      {/* <th>#</th> */}
                      <th className="text-center">Lead Id</th>
                      <th>Client Name</th>
                      <th>Mobile</th>
                      <th>Assigned To</th>
                      <th>Lead Source</th>
                      {/* <th>Segment</th> */}
                      {/* <th>Free Trial</th> */}
                      <th>Follow Up</th>
                      <th>Description</th>
                      <th>Current Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* //!<--------------------------------------------------------------------------------- LODER CODE ----------------------------------------------------------------------> */}

                    {loading ? (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          backgroundColor: "rgba(104, 102, 102, 0.5)",
                          zIndex: 9998,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 9999,
                            backgroundColor: "transparent",
                          }}
                        >
                          <HashLoader color="#0060f1" size={50} />
                        </div>
                      </div>
                    ) : error ? (
                      <tr>
                        <td colSpan="10" className="text-center text-danger">
                          Error: {error}
                        </td>
                      </tr>

                      //    {followUpData && followUpData.length > 0 ? (
                      //     followUpData.map((followUpObj) => (
                      //         // Your mapping logic here
                      //     ))
                      // ) : null}

                      // {leads?.length > 0 &&
                      //   leads
                      //     ?.filter((leadObj) => !leadObj.followup) // Filter out leads with followup
                      //     .map((leadObj) => (
                      //       <tr key={leadObj.lead?.leadId}>
                      //         {/* Your table data here */}
                      //       </tr>
                      //     ))}



                    ) : leads?.length > 0 ? (
                      leads?.map((leadObj) => (
                        <tr key={leadObj.lead?.leadId}>


                          <td>

                            {leadObj.lead?.leadId}
                          </td>
                          <td>
                            {editAddLead === leadObj.id ? (
                              <input
                                type="text"
                                value={editValue.clientName || ""}
                                onChange={(e) =>
                                  setEditValue({
                                    ...editValue,
                                    clientName: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              leadObj.lead?.clientName || "N/A"
                            )}
                          </td>

                          {/* //!------------------------------------------------------------------------Mobile Number------------------------------------------------ */}

                          <td>
                            {editAddLead === leadObj.id ? (
                              <input
                                type="text"
                                value={editValue.mobile || ""}
                                onChange={(e) =>
                                  setEditValue({
                                    ...editValue,
                                    mobile: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              <>
                                {leadObj.lead?.mobile && (
                                  <button
                                    onClick={() => handleCalling(leadObj?.lead?.mobile, leadObj?.lead?.leadId, leadObj?.lead?.clientName)}
                                    className="bg-transparent text-success no-padding border-0"
                                  >
                                    <PhoneCall size={18} className="text-blue-500" />
                                  </button>
                                )}
                              </>
                            )}
                          </td>

                          {/* //!------------------------------------------------------------------------------------------------------------------------------------------ */}


                          <td>
                            {editAddLead === leadObj.id ? (
                              <input
                                type="text"
                                value={editValue.assignedTo || ""}
                                onChange={(e) =>
                                  setEditValue({
                                    ...editValue,
                                    assignedTo: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              leadObj.lead?.assignedTo || "N/A"
                            )}
                          </td>
                          <td>
                            {editAddLead === leadObj.id ? (
                              <input
                                type="text"
                                value={editValue.leadSource || ""}
                                onChange={(e) =>
                                  setEditValue({
                                    ...editValue,
                                    leadSource: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              leadObj.lead?.leadSource || "N/A"
                            )}
                          </td>
                          {/* <td>
                            {editAddLead === leadObj.id ? (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleSaveLead(leadObj.id)}
                              >
                                Save
                              </button>
                            ) : (
                              <>
                                <button
                                  className="viewLead-viewLeadButton btn-sm text-dark  border-0 bg-transparent"
                                  onClick={() => {
                                    setSelectedLeadId(leadObj.lead.leadId);
                                    handleOpenPopup("segment");
                                  }}
                                >
                                  <LucidePencil size={18} />
                                </button>
                                {showPopup && (
                                  <div className="popup-overlay d-flex justify-content-center align-items-center">
                                    <div
                                      className="popup-content bg-light p-4 rounded"
                                      style={{ width: "20vw" }}
                                    >
                                      <h3 className="text-center mb-4">
                                        Add Segment
                                      </h3>
                                      <div className="form-group mb-3">
                                        <label
                                          htmlFor="segmentSelect"
                                          className="form-label fw-bold"
                                        >
                                          Select Segment:
                                        </label>
                                        <select
                                          className="form-select input-box"
                                          name="AddSegment"
                                          value={addSegment}
                                          onChange={(event) => {
                                            handleChangedropdown(
                                              event,
                                              "segment"
                                            );
                                          }}
                                        >
                                          <option value="" disabled>
                                            -----Select An Option-----
                                          </option>
                                          <option value="Index Option">Index Option</option>
                                          <option value="Index Future">Index Future</option>
                                          <option value="Stock Option">Stock Option</option>
                                          <option value="Stock Future">Stock Future</option>
                                          <option value="Stock Cash">Stock Cash</option>
                                        </select>
                                      </div>
                                      <div className="d-flex justify-content-between mt-4">
                                        <button
                                          className="btn btn-secondary me-2"
                                          onClick={handleClosePopup}
                                        >
                                          Close
                                        </button>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => {
                                            // Add Save logic here
                                            handleupdate(leadObj);
                                          }}
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </td> */}
                          {/* <td>
                            <>
                              {editAddLead === leadObj.id ? (
                                <button className="btn btn-success btn-sm">
                                  Save
                                </button>
                              ) : (
                                <>
                                  <button
                                    className="viewLead-viewLeadButton btn-sm  text-dark  border-0 bg-transparent "
                                    onClick={() => {
                                      setSelectedLeadId(leadObj.lead.leadId);
                                      handleOpenPopup("freeTrial");
                                    }}
                                  >
                                    <LucidePencil size={18} />
                                  </button>
                                  {showFreeTrialPopup && (
                                    <div className="popup-overlay d-flex justify-content-center align-items-center">
                                      <div
                                        className="popup-content bg-light p-4 rounded shadow"
                                        style={{ width: "20vw" }}
                                      >
                                        <h3 className="text-center mb-4">
                                          Add Free Trial
                                        </h3>
                                        <div className="form-group mb-3">
                                          <label
                                            htmlFor="segmentInput"
                                            className="form-label fw-bold"
                                          >
                                            Enter Start Date
                                          </label>
                                          <input
                                            type="date"
                                            className="form-control input-box"
                                            name="addfreeTrialStartDate"
                                            value={addfreeTrialStartDate}
                                            onChange={(event) =>
                                              handleChangeDate(event, "start")
                                            }
                                          />
                                        </div>

                                        <div className="form-group mb-3">
                                          <label
                                            htmlFor="segmentInput"
                                            className="form-label fw-bold"
                                          >
                                            Enter End Date
                                          </label>
                                          <input
                                            type="date"
                                            className="form-control input-box"
                                            name="addfreeTrialEndDate"
                                            value={addfreeTrialEndDate}
                                            onChange={(event) =>
                                              handleChangeDate(event, "end")
                                            }
                                          />
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                          <button
                                            className="btn btn-secondary me-2"
                                            onClick={handleClosePopup}
                                          >
                                            Close
                                          </button>
                                          <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                              handleupdate(leadObj);
                                            }}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          </td> */}

                          <td>
                            {editAddLead === leadObj.id ? (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleSaveLead(leadObj.lead.id)}
                              >
                                Save
                              </button>
                            ) : (
                              <>
                                <button
                                  className="viewLead-viewLeadButton btn-sm text-dark  border-0 bg-transparent"
                                  onClick={() => {
                                    setSelectedLeadId(leadObj.lead.leadId);
                                    handleOpenPopup("followUp");
                                  }}
                                >
                                  <LucidePencil size={18} />

                                </button>
                                {showFollowUpPopup && (
                                  <div className="popup-overlay d-flex justify-content-center align-items-center">
                                    <div
                                      className="popup-content bg-light p-4 rounded shadow"
                                      style={{ width: "20vw" }}
                                    >
                                      <h3 className="text-center mb-4">
                                        Add Follow Up
                                      </h3>
                                      <div className="form-group mb-3">
                                        <label
                                          htmlFor="segmentInput"
                                          className="form-label fw-bold"
                                        >
                                          Enter FollowUp Date
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control input-box"
                                          name="addFollowUpDate"
                                          value={addFollowUpDate}
                                          onChange={(event) =>
                                            handleChangeDate(event, "followUp")
                                          }
                                        />
                                      </div>

                                      <div className="d-flex justify-content-between mt-4">
                                        <button
                                          className="btn btn-secondary me-2"
                                          onClick={handleClosePopup}
                                        >
                                          Close
                                        </button>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => {
                                            handleupdate(leadObj);
                                          }}
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </td>
                          <td>
                            <button
                              className=" btn-sm  text-primary btn-link border-0 bg-transparent"
                              onClick={() => {
                                setSelectedLeadId(leadObj.lead.leadId);
                                handleOpenPopup("comment");
                              }}
                            >
                              Add
                            </button>
                            {showCommentPopup && (
                              <div className="popup-overlay d-flex justify-content-center align-items-center">
                                <div
                                  className="popup-content bg-light p-4 rounded shadow"
                                  style={{ width: "20vw" }}
                                >
                                  <h3 className="text-center mb-4">
                                    Add Comment
                                  </h3>
                                  <div className="form-group mb-3">
                                    <label
                                      htmlFor="segmentInput"
                                      className="form-label fw-bold"
                                    >
                                      Enter Comment:
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control input-box"
                                      name="AddComment"
                                      value={addComment}
                                      onChange={handleChangeInput}
                                      placeholder="Enter Comment here"
                                    />
                                  </div>
                                  <div className="d-flex justify-content-between mt-4">
                                    <button
                                      className="btn btn-secondary me-2"
                                      onClick={handleClosePopup}
                                    >
                                      Close
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        handleupdate(leadObj);
                                      }}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                          <td>
                            {leadObj.lead?.followupDetail?.leadStatus
                              ? leadStatusMap[leadObj.lead.followupDetail.leadStatus] || "N/A"
                              : "N/A"}
                          </td>


                          <td className="text-center">
                            <div className="btn-group  gap-2">
                              <div>
                                <StatusButton
                                  onClick={() => {
                                    handleOpenPopup("status");
                                    setSelectedLeadId(leadObj.lead.leadId);
                                  }}
                                />
                                {showStatusPopup && (
                                  <>
                                    <div
                                      className="popup-overlay d-flex justify-content-center align-items-center"
                                      onClick={handleClosePopup}
                                    ></div>
                                    <div className="salesOrder-popup-content">
                                      <h3 className="text-center mb-4">
                                        Lead Status
                                      </h3>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="segmentInput"
                                          className="form-label fw-bold"
                                        >
                                          Select Lead Status
                                        </label>
                                        <select
                                          style={{
                                            fontSize: "14px",
                                            fontWeight: "500",
                                          }}
                                          name="segmentCategory"
                                          value={updateStatus[addstatus] || ""}
                                          onChange={(event) => {
                                            handleChangedropdown(event, "status");
                                          }}
                                          className="form-select input-box"
                                        >
                                          <option value="" disabled>Select Status</option>
                                          {Object.entries(updateStatus).map(
                                            ([key, value]) => (
                                              <option key={key} value={value}>
                                                {value}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>
                                      <div className="d-flex justify-content-between mt-4">
                                        <button
                                          className="btn btn-secondary me-2"
                                          onClick={handleClosePopup}
                                        >
                                          Close
                                        </button>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => {
                                            handleupdate(leadObj);
                                            console.log(leadObj);
                                          }}
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>

                              <EditButton
                                onClick={() => {
                                  handleNavigateToEditLead(
                                    leadObj.lead.id,
                                    leadObj
                                  );
                                }}
                              />
                              <DeleteButton onDelete={() => handleDisposeLead(leadObj.lead?.leadId, leadObj.lead?.leadSource)} />
                              {/* <DisposeButton /> */}
                              {leadObj.lead?.followupDetail !== null && (
                                <PRButton
                                  onClick={() => {
                                    handleNavigateToPR(leadObj.lead.id, leadObj);
                                  }}
                                />
                              )
                              }

                              {/* <button
                              onClick={() => {
                                handleNavigateToSo(leadObj.id, leadObj);
                              }}
                              style={{
                                padding: 2,
                                margin: 0,
                                fontSize: "12px",
                                color: "white",
                                border: "1px solid grey",
                                fontWeight: "600",
                                borderRadius: "0",
                                backgroundColor: "#758694",
                              }}
                            >
                              Add SO
                            </button> */}
                              {/* <SendButton /> */}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">No data available in table</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* //!<--------------------------------------------------------------------------- PAGINATION LOGIC -------------------------------------------------------------------------- */}
              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-3">
                  Showing {currentPage * itemsPerPage - itemsPerPage + 1} -{' '}
                  {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} entries
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-outline-primary p-0 btn-circle me-0"
                  >
                    <LucideChevronLeft />
                  </button>

                  <div className="mx-3 d-flex gap-2">
                    {renderPageNumbers().map((page, index) =>
                      page === '...' ? (
                        <span key={index} className="px-2">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`btn btn-outline-dark pagination-button p-2 py-0 btn-circle ${currentPage === page ? 'active' : ''
                            }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-outline-primary p-0 btn-circle ms-0"
                  >
                    <LucideChevronRight />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewLeads;
