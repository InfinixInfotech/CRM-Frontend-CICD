import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import "./SalesDashboard.css";
import { emp, GetAllImage, staticToken } from "../../../Redux/Services/apiServer/ApiServer";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesReportThunk } from "../../../Redux/Services/thunks/EmployeeSalesReportThunk";
import DashboardProgressBar from "./SalesDshboardProgressBar/DashboardProgressBar";
import { getTargetByEmployeeCodeThunk } from "../../../Redux/Services/thunks/TargetByEmployeeCodeThunk";
import { CalendarCheck, IndianRupee } from "lucide-react";
import { getAllTodayTotalThunk } from "../../../Redux/Services/thunks/TodayTotalThunks";
import { getAllYesterdayTotalThunk } from "../../../Redux/Services/thunks/YesterdayTotalThunk";
import { getAllTotalGrandTotalThunk } from "../../../Redux/Services/thunks/TotalGrandTotalThunk";
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import AIAssistant from "../../../Components/Button/FloatingButton/FloatingButton";
import { todayFollowUpDataThunk } from "../../../Redux/Services/thunks/AdditionalApiThunk";
import { useNavigate } from "react-router-dom";
// import { getFollowUpDetailsFilterTillDateThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import Navbar from "../../../Components/Navbar/Navbar";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesDashboard() {

  const [barChartData, setBarChartData] = useState([]);
  const [barChart1Data, setBarChart1Data] = useState([]);
  const [barChart2Data, setBarChart2Data] = useState([]);
  const [imageCardData, setImageCardData] = useState([]);
  // State for today, yesterday, and grand total data
  const [todayData1, setTodayData1] = useState(null);
  const [yesterdayData, setYesterdayData] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [followUpTotalCount, setFollowUpTotalCount] = useState(0);

  const [todayFollowUp, setTodayFollowUp] = useState(null);
  const [followUpTillDate, setFollowUpTillDate] = useState([]);
  const storedUsername = localStorage.getItem("userName");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.salesReport
  );
  const { data: followUpData, loading: followUpLoading, error: followUpError } = useSelector((state) => state.additional);
  const { data: followUpDataTillDate, loading: followUpDataTillDateLoading, error: followUpDataTillDateError } = useSelector((state) => state.uploadbulklead);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/followup"); // Change the path as needed
  };

  // const requestData = {
  //   EmployeeCode: emp,
  //   // CampaignName: selectedCampaign,/
  //   pageNumber: currentPage,
  //   limit: itemsPerPage,
  // };


  // //TODO ----------------------------------------------------FollowUPTillDate Api Call----------------------------------------------(Start)

  // useEffect(() => {
  //   dispatch(getFollowUpDetailsFilterTillDateThunk(requestData));
  //   const interval = setInterval(() => {
  //     dispatch(getFollowUpDetailsFilterTillDateThunk(requestData));
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [dispatch]);

  // useEffect(() => {
  //   if (followUpDataTillDate?.data) {
  //     setFollowUpTillDate(followUpDataTillDate.data);
  //     setFollowUpTotalCount(followUpDataTillDate.totalCount)

  //   } else {
  //     console.error("No valid data found", followUpDataTillDate);
  //   }
  // }, [followUpDataTillDate]);

  // console.log("followUptotalCount",followUpTotalCount)
  // // console.log("followUptotalCountNavbar",followUpCount)

  // //TODO ----------------------------------------------------FollowUPTillDate Api Call------------------------------------------------(End)


  // console.log("follwuptilldate------------------",followUpDataTillDate)

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setUserToken(token);
      localStorage.setItem("authToken", token);
    }
  }, []);


  const empcode = emp;

  useEffect(() => {
    dispatch(todayFollowUpDataThunk(empcode));
  }, [dispatch]);


  useEffect(() => {
    if (followUpData?.data) {
      setTodayFollowUp(followUpData);
    } else {
      console.error("No valid data found", data);
    }
  }, [followUpData]);


  // console.log("followUp-------------------------", todayFollowUp?.totalCount)


  const { todayData, todayloading, todayerror } = useSelector(
    (state) => state.todayTotal
  );
  const { Yesterdaydata: yesterdaySales, loading: yesterdayLoading, error: yesterdayError } = useSelector(
    (state) => state.yesterdayTotal
  );
  const { data: grandTotal, loading: grandTotalLoading, error: grandTotalError } = useSelector(
    (state) => state.grandTotal
  );



  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getTargetByEmployeeCodeThunk());
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch]);



  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllSalesReportThunk());
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch]);


  useEffect(() => {
    if (data?.data?.length) {
      const groupOrder = ["DSH", "Senior Manager", "Manager", "TL", "SBDE", "BDE"];
      const groupedData = data.data.reduce((acc, emp) => {
        if (emp.groupName && emp.groupName !== "Managment") {
          if (!acc[emp.groupName]) {
            acc[emp.groupName] = [];
          }
          acc[emp.groupName].push(emp);
        }
        return acc;
      }, {});
      const transformedData = Object.entries(groupedData)
        .map(([group, employees]) => {
          const sortedGroup = employees
            .sort((a, b) => b.totalGrandTotal - a.totalGrandTotal)
            .slice(0, 5);

          return {
            title: group,
            data: sortedGroup.map((emp) => emp.totalGrandTotal),
            labels: sortedGroup.map((emp) => emp.employeeName),
          };
        })

        .sort((a, b) => {
          return groupOrder.indexOf(a.title) - groupOrder.indexOf(b.title);
        });

      setBarChartData(transformedData);
    }
  }, [data]);


  // ! ------------------------------------------------------------------Get A Image data Api Handle -----------------------------------------------------
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(GetAllImage);
        const data = await response.json();

        if (response.ok && Array.isArray(data.data)) {
          const formattedData = data.data.flatMap((item) =>
            item.images.map((img) => ({
              id: img.fileName,
              image: `data:${img.contentType};base64,${img.fileData}`,
            }))
          );
          setImageCardData(formattedData);
        } else {
          console.error("Failed to fetch images:", data.message);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sales Data",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        hoverBackgroundColor: "rgba(0, 123, 255, 0.7)",
        hoverBorderColor: "rgba(0, 123, 255, 1)",
        hoverBorderWidth: 2,
        borderWidth: 1,
        borderRadius: 0,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllTodayTotalThunk());
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (todayData?.data) {
      setTodayData1(todayData?.data);
      // console.log("Today Data:" + JSON.stringify(todayData?.data)); // Log today's data
    }
  }, [todayData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllYesterdayTotalThunk());
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (yesterdaySales?.data) {
      setYesterdayData(yesterdaySales?.data);
      // console.log("Yesterday Data:", yesterdaySales?.data); // Log yesterday's data
    }
  }, [yesterdaySales]);

  useEffect(() => {
    dispatch(getAllTotalGrandTotalThunk());
  }, [dispatch]);

  useEffect(() => {
    if (grandTotal?.data) {
      setTotalData(grandTotal?.data);
      console.log("Grand Total Data:", grandTotal?.data);
    }
  }, [grandTotal]);


  const isTodayGreaterThanYesterday = todayData1?.GrandTotal > yesterdayData?.grandTotal;
  // console.log("Is Today Greater Than Yesterday?", isTodayGreaterThanYesterday); // Log the market trend

  useEffect(() => {
    const cards = document.querySelectorAll('.sales-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 200);
    });
  }, []);


  return (
    <div className="mt-5">
      <section
        style={{
          position: "relative",
          textAlign: "center",
          background: "#2c3e50",
          borderBottom: "1px solid #E1E6EF",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          paddingBottom: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60px"
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-0 mb-0 text-white"
          style={{
            fontSize: "28px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Sales Dashboard
        </h2>
      </section>

      {/* <div id="imageCarousel" className="carousel slide mt-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {imageCardData
            .reduce((acc, card, index, array) => {
              if (index % 2 === 0) {
                acc.push(array.slice(index, index + 2)); // Group every two images
              }
              return acc;
            }, [])
            .map((cardPair, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="d-flex justify-content-around">
                  {cardPair.map((card) => (
                    <div className="card" key={card.id} style={{ width: "45%" }}>
                      <img
                        src={card.image} 
                        alt="Image"
                        className="d-block w-100 img-fluid"
                        style={{ maxHeight: "250px", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

    
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#imageCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#imageCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div> */}

      <div className="d-flex justify-content-center align-items-center gap-3 salesDashbordCards mt-5">
        {/* <TotalSales />
        <TodaySales />
        <TeamMember /> */}
        {/* <FollowUp />
       <TodayTrial /> */}
      </div>


      <div className="dashboard-container">
        <div className="sales-dashboard">
          {/* Today's Sales Card */}
          <div className="sales-card">
            <div className="card-inner">
              <div className="card-content">
                <div className="card-header">
                  <div className="icon-wrapper">
                    <IndianRupee className="icon text-blue-500" size={28} />
                  </div>
                  <h5 className="card-title">Today's Sales</h5>
                </div>

                <div className="amount-wrapper">
                  <h2 className="amount">
                    {(todayData1?.GrandTotal || 0).toLocaleString()}
                  </h2>

                </div>

                <div className="sparkline">
                  {/* <Activity size={60} className="activity-icon" /> */}
                  <div className="trend">
                    {isTodayGreaterThanYesterday ? (
                      <TrendingUp className="trend-icon up" size={32} />
                    ) : (
                      <TrendingDown className="trend-icon down" size={32} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yesterday's Sales Card */}
          <div className="sales-card">
            <div className="card-inner">
              <div className="card-content">
                <div className="card-header">
                  <div className="icon-wrapper purple">
                    <IndianRupee className="icon text-purple-500" size={28} />
                  </div>
                  <h5 className="card-title">Yesterday's Sales</h5>
                </div>

                <div className="amount-wrapper">
                  <h2 className="amount">
                    {(yesterdayData?.grandTotal || 0).toLocaleString()}
                  </h2>
                </div>

                <div className="sparkline">
                  <Activity size={40} className="activity-icon" />
                </div>
              </div>
            </div>
          </div>
          {/* <AIAssistant/> */}
          {/* Grand Total Card */}
          <div className="sales-card">
            <div className="card-inner">
              <div className="card-content">
                <div className="card-header">
                  <div className="icon-wrapper green">
                    <IndianRupee className="icon text-green-500" size={28} />
                  </div>
                  <h5 className="card-title">Grand Total</h5>
                </div>

                <div className="amount-wrapper">
                  <h2 className="amount">
                    {(["admin", "Admin", "ADMIN"].includes(storedUsername)
                      ? (totalData?.totalGrandTotal || 0).toLocaleString()
                      : (totalData?.grandTotal || 0).toLocaleString()
                    )}
                  </h2>
                </div>

                <div className="sparkline">
                  <Activity size={40} className="activity-icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="sales-card cursor-pointer" onClick={handleCardClick}>
            <div className="card-inner">
              <div className="card-content">
                <div className="card-header">
                  <div className="icon-wrapper green">
                    <CalendarCheck className="icon text-green-500" size={28} />
                  </div>
                  <h5 className="card-title">Today FollowUp</h5>
                </div>
                <div className="amount-wrapper">
                  <h2 className="amount">{todayFollowUp?.totalCount || 0}</h2>
                </div>
                <div className="sparkline">
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
          .dashboard-container {
            padding: 2rem;
            background: linear-gradient(135deg, #f6f9fc 0%, #f1f5f9 100%);
            min-height: 30vh;
          }

          .sales-dashboard {
            display: flex;
            gap: 2rem;
            justify-content: center;
            align-items: stretch;
            flex-wrap: wrap;
            max-width: 1400px;
            margin: 0 auto;
          }

          .sales-card {
            flex: 1;
            min-width: 200px;
            max-width: 300px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .sales-card.show {
            opacity: 1;
            transform: translateY(0);
          }

          .card-inner {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 1.5rem;
            height: 80%;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
                        0 8px 10px -6px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card-inner:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                        0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .card-content {
            position: relative;
            z-index: 1;
          }

          .card-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 12px;
            background: rgba(59, 130, 246, 0.1);
          }

          .icon-wrapper.purple {
            background: rgba(147, 51, 234, 0.1);
          }

          .icon-wrapper.green {
            background: rgba(34, 197, 94, 0.1);
          }

          .card-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1e293b;
            margin: 0;
          }

          .amount-wrapper {
            margin: 1.5rem 0;
          }

          .amount {
            font-size: 2.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
            line-height: 1.2;
          }

          .trend {
            margin-top: 1rem;
          }

          .trend-icon {
            animation: pulse 2s infinite;
          }

          .trend-icon.up {
            color: #22c55e;
          }

          .trend-icon.down {
            color: #ef4444;
          }

          .sparkline {
            position: absolute;
            bottom: 0;
            right: 0;
            opacity: 1;
          }

          .activity-icon {
            stroke: currentColor;
            stroke-width: 1.5;
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          @media (max-width: 768px) {
            .sales-dashboard {
              flex-direction: column;
              align-items: center;
            }

            .sales-card {
              width: 100%;
              max-width: none;
            }
          }
        `}
        </style>
      </div>

      <DashboardProgressBar />
      <div className="mt-5 row">
        {barChartData?.map((chart, index) => (
          <div className="col-md-6 col-12 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{chart.title}</h5>
                <Bar
                  data={{
                    labels: chart?.labels,
                    datasets: [
                      {
                        label: chart?.title,
                        data: chart?.data,
                        backgroundColor: "#2c3e50",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={options}
                />
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* <div className="mt-5 row">
        <div style={{ height: "50vh", width: "50%", overflow: "hidden" }}>
          <Bar
            data={{
              labels: barChart1Data.flatMap(group => group.labels),
              datasets: barChart1Data.map(group => ({
                label: group.title,
                data: group.data,
                backgroundColor: "#2c3e50",
                borderColor: "#2c3e50",
                borderWidth: 1, // Set the border width
              })),
            }}
            options={{
              responsive: true, // Ensure the chart is responsive
              maintainAspectRatio: false, // Allow the chart to stretch and fill the parent container
              ...options, // Existing options, such as chart configuration
            }}
          />
        </div>

        <div style={{ height: "50vh", width: "50%", overflow: "hidden" }}>
          <Bar
            data={{
              labels: barChart2Data.flatMap(group => group.labels),
              datasets: barChart2Data.map(group => ({
                label: group.title,
                data: group.data,
                backgroundColor: "#2c3e50",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1, // Set the border width
              })),
            }}
            options={{
              responsive: true, // Ensure the chart is responsive
              maintainAspectRatio: false, // Allow the chart to stretch and fill the parent container
              ...options, // Existing options, such as chart configuration
            }}
          />
        </div>
      </div> */}


    </div>
  );
}
