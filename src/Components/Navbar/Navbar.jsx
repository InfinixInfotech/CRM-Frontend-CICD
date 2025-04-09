import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaCommentDots } from "react-icons/fa";
import LogoutPage from "../Logout/Logout";
import { BiSearch } from "react-icons/bi";
import SearchByMobileNumberFilter from "../Filter/SearchByMobileNumberFilter/SearchByMobileNumberFilter";
import AIAssistant from "../Button/FloatingButton/FloatingButton";
import Logo from "../../assests/Infinix3.png"
import { emp, storedUsername } from "../../Redux/Services/apiServer/ApiServer";
// import { Bell, BellRing } from "lucide-react";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
// import { getFollowUpDetailsFilterTillDateThunk } from "../../Redux/Services/thunks/UploadBulkLeadThunk"
import { getFollowUpDetailsFilterTillDateThunk } from "../../Redux/Services/thunks/FollowUpTillDateThunk"
import FloatingChat from "../../Pages/Chat/FloatingChat";


const Navbar = () => {
  const navigate = useNavigate();
  const followUpCount = "24"
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [followUpTotalCount, setFollowUpTotalCount] = useState(0);
  const [followUpTillDateData, setFollowUpTillDate] = useState([]);
  const dispatch = useDispatch();
  const { data: followUpDataTillDate, loading: followUpDataTillDateLoading, error: followUpDataTillDateError } = useSelector((state) => state.followuptilldate);

  const handleNavigation = (route) => {
    // console.log("followUptotalCountNavbar",followUpCount)
    if (route) {
      navigate(route);
    }
  };

  //TODO ----------------------------------------------------FollowUPTillDate Api Call----------------------------------------------(Start)

  const requestData = {
    EmployeeCode: emp,
    // CampaignName: selectedCampaign,/
    pageNumber: currentPage,
    limit: itemsPerPage,
    LeadStatus: "2",
  };


  useEffect(() => {
    dispatch(getFollowUpDetailsFilterTillDateThunk(requestData));
    // const interval = setInterval(() => {
    //   dispatch(getFollowUpDetailsFilterTillDateThunk(requestData));
    // }, 5000);

    // return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (followUpDataTillDate?.data) {
      setFollowUpTillDate(followUpDataTillDate.data);
      setFollowUpTotalCount(followUpDataTillDate.totalCount)

    } else {
      console.error("No valid data found", followUpDataTillDate);
    }
  }, [followUpDataTillDate]);

  // console.log("followUptotalCount", followUpTotalCount)
  // console.log("followUptotalCountNavbar",followUpCount)

  //TODO ----------------------------------------------------FollowUPTillDate Api Call------------------------------------------------(End)





  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#2c3e50' }}>
      <div className="container-fluid">

        <div className="d-flex">
          <div>
            <img
              src={Logo}
              alt="Infinix Infotech Logo"
              className="h-10 md:h-12 lg:h-14 w-auto"
              style={{ height: "66px", width: "66px" }}
            />
          </div>
          <div className="ml-4 d-flex flex-column justify-content-center">
            <Link to="/" className="navbar-brand text-light">
              <h1 className="fs-6 ms-2 mb-0"><strong>INFINIX INFOTECH</strong></h1>
              <h3 className="fs-6 ms-2 mt-0 d-block"><strong>Private Limited</strong></h3>
            </Link>
          </div>
        </div>

        <h2 className="text-light">Welcome {storedUsername}!!</h2>

        <ul className="navbar-nav d-flex gap-4 align-items-center">
          <SearchByMobileNumberFilter />
          <FloatingChat />



          <button
            style={{
              backgroundColor: "#2c3e50",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer"
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"

              }}
            >
              {followUpTotalCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  {followUpTotalCount}
                </span>
              )}
              <IoMdNotifications
                size={28}
                onClick={() => navigate("/followupdata")}
                className="animate-bell text-white"
              />
            </div>
          </button>


          <style>
            {`
    @keyframes ringBell {
      0%, 90% { transform: rotate(0); } /* Bell stays still for most of the time */
      92% { transform: rotate(-15deg); }
      94% { transform: rotate(15deg); }
      96% { transform: rotate(-10deg); }
      98% { transform: rotate(10deg); }
      100% { transform: rotate(0); } /* Bell returns to original position */
    }

    .animate-bell {
      display: inline-block;
      transform-origin: top center;
      animation: ringBell 5s linear infinite; /* Rings every 5 seconds */
    }
  `}
          </style>





          <li className="nav-item dropdown">
            <button
              className="btn text-light btn-sm fs-5"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              title="Profile"
              style={{ transition: '0.2s', background: 'transparent', border: 'none' }}
            >
              <FaUser />
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profileDropdown"
              style={{ backgroundColor: '#34495e', border: 'none' }}
            >
              <li className="text-center mb-2">
                <button
                  className="btn btn-success"
                  onClick={() => handleNavigation("/profiledashbord")}
                >
                  Profile
                </button>
              </li>
              <li className="text-center">
                <LogoutPage />
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </nav>

  );
};

export default Navbar;
