import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./SalesDashboard.css";
import TotalSales from "./TotalSales/TotalSales";
import TodaySales from "./Todaysales/TodaySales";
import TeamMember from "./TeamMember/TeamMember";
import FollowUp from "./FollowUp/FollowUp";
import TodayTrial from "./TodayTrial/TodayTrial";
import { FaChartLine } from "react-icons/fa";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesDashboard() {
  // List of card data with dummy image URLs
  const cardData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1730247147351-6db1dc7b2dbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1650461788831-da4957a75275?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1712752942998-a03f96c34808?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMyfHx8ZW58MHx8fHx8",
      text: "",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1587761661108-f6e0a5cd17e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
      text: "",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1636801195041-a0deec678071?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
      text: "",
    },
  ];

  // Dummy data for the bar charts
  // Dummy data for the bar charts (Updated with 6 teams)
  const barChartData = [
    {
      title: "Team 1",
      data: [1500, 2500, 4000], // Money in thousands
      labels: ["Member A", "Member B", "Member C"],
    },
    {
      title: "Team 2",
      data: [1200, 1800, 2200], // Money in thousands
      labels: ["Member D", "Member E", "Member F"],
    },
    {
      title: "Team 3",
      data: [3000, 3500, 4200], // Money in thousands
      labels: ["Member G", "Member H", "Member I"],
    },
    {
      title: "Team 4",
      data: [2200, 2800, 3500], // Money in thousands
      labels: ["Member J", "Member K", "Member L"],
    },
    {
      title: "Team 5",
      data: [1400, 2200, 3000], // Money in thousands
      labels: ["Member M", "Member N", "Member O"],
    },
    {
      title: "Team 6",
      data: [2000, 2400, 3100], // Money in thousands
      labels: ["Member P", "Member Q", "Member R"],
    },
  ];

  // Chart options for each bar chart with hover effects
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
        hoverBackgroundColor: "rgba(0, 123, 255, 0.7)", // Change bar color on hover
        hoverBorderColor: "rgba(0, 123, 255, 1)", // Change border color on hover
        hoverBorderWidth: 2, // Increase border width on hover
        borderWidth: 1, // Normal border width
      },
    },
  };

  return (
    <div className="mt-5">
      <section
        style={{
          position: "relative",
          // padding: "12px 30px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "0px", // Uncomment and fix if needed
          marginBottom: "5px", // Uncomment and fix if needed
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-5 mb-2"
          style={{
            padding: "18px 16px",
            fontSize: "30px",
            color: "#2D2D2D",
            // backgroundColor: "#E3E3E3",
          }}
        >
          <FaChartLine
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Sales Dashboard
        </h2>
      </section>

      <div
        id="salesCarousel"
        className="carousel slide mt-4"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {/* Map through the cardData to render each pair of cards */}
          {cardData
            .reduce((acc, card, index, array) => {
              if (index % 2 === 0) {
                acc.push(array.slice(index, index + 2)); // Group every two cards
              }
              return acc;
            }, [])
            .map((cardPair, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="d-flex justify-content-around">
                  {/* Render each card in the pair */}
                  {cardPair.map((card) => (
                    <div
                      className="card"
                      key={card.id}
                      style={{ width: "45%" }}
                    >
                      <img
                        src={card.image}
                        alt={card.text}
                        className="d-block w-100 img-fluid"
                        style={{ maxHeight: "250px", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#salesCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#salesCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="d-flex gap-3 salesDashbordCards mt-5">
        <TotalSales />
        <TodaySales />
        <TeamMember />
        <FollowUp />
        <TodayTrial />
      </div>

      {/* Bar Charts Section */}
      <div className="mt-5 row">
        {barChartData.map((chart, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{chart.title}</h5>
                <Bar
                  data={{
                    labels: chart.labels,
                    datasets: [
                      {
                        label: chart.title,
                        data: chart.data,
                        backgroundColor: "rgba(75, 192, 192, 0.2)", // Initial bar color
                        borderColor: "rgba(75, 192, 192, 1)", // Initial border color
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
    </div>
  );
}
