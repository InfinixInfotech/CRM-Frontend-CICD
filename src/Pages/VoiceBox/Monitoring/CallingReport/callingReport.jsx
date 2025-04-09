import React, { useEffect, useState } from 'react'
import { useRef } from "react";
import { getExtensionEmpThunk } from '../../../../Redux/Services/thunks/AdditionalApiThunk';
import { emp, storedUsername } from '../../../../Redux/Services/apiServer/ApiServer';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, LucideChevronLeft, LucideChevronRight, Monitor } from 'lucide-react';

export default function callingReport() {
    const [stats, setStats] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [audioSrc, setAudioSrc] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const dispatch = useDispatch();
    const { data: additionalData, loading: additionalLoading, error: additionalError } = useSelector((state) => state.additional);
    const ExtensionEmp = emp;
    const [extensionNumber, setExtensionNumber] = useState("");
    const formatDuration = (seconds) => {
        if (!seconds || seconds <= 0) return "N/A";

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    };
    useEffect(() => {
        dispatch(getExtensionEmpThunk(ExtensionEmp));
    }, [dispatch]);

    useEffect(() => {
        if (additionalData?.data) {
            setExtensionNumber(additionalData?.data?.extensionNumber);
        }
    }, [additionalData]);

    // const handleCalling = (mobileNumber, leadId, clientName) => {
    //     const params = {
    //         mobile: mobileNumber,
    //         extension: extensionNumber,
    //         leadid: leadId,
    //         ContactName: clientName,
    //     };
    //     dispatch(postCallingEmpThunk(params)).then(() => {

    //     });
    // };


    const intervalRef = useRef(null);

    const fetchData = async () => {
        setError(null);

        const today = new Date().toISOString().split("T")[0];
        const formattedStartDate = startDate ? new Date(startDate).toISOString().split("T")[0] : today;
        const formattedEndDate = endDate ? new Date(endDate).toISOString().split("T")[0] : today;

        const statsUrl = "https://cdr.infinixinfotech.in/api/StatsDataInExcellFile/get-stats";
        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyVVc2VySWQiOiIxIiwiVXNlck5hbWUiOiJhZG1pbiIsImV4cCI6MTc0MDQwNjE3NywiaXNzIjoiaHR0cHM6Ly93d3cudmFybmV0c29sdXRpb25zLmNvbS8iLCJhdWQiOiJzYW5kZXNodmFoYWtfYnJvYWRjYXN0X21lc3NhZ2UifQ.qIsKTG0V7lhsVbTAfnFmuDuja85GjqHOOr1DvoyqCXM",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: formattedStartDate,
                to: formattedEndDate,
                format: "JSON",
                ViewRecordsWithoutHierarchy: false
            })
        };
        try {
            const statsResponse = await fetch(statsUrl, requestOptions);

            if (!statsResponse.ok) {
                throw new Error("Failed to fetch data");
            }

            const statsData = await statsResponse.json();
            setStats(statsData.data || []);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
        intervalRef.current = setInterval(fetchData, 4000);
        setLoading(false)
        return () => clearInterval(intervalRef.current);
    }, [startDate, endDate]);

    const handleDownload = async (uniqueId) => {
        try {
            const fileUrl = `https://cdr.infinixinfotech.in/api/files/getFileByUniqueId/${uniqueId}`;

            // console.log("Fetching MP3 file from:", fileUrl); 
            const response = await fetch(fileUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'audio/mpeg',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            let filename = `${uniqueId}.mp3`;
            const contentDisposition = response.headers.get('Content-Disposition');
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match) {
                    filename = match[1];
                }
            }
            if (!filename.endsWith('.mp3')) {
                filename += '.mp3';
            }
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url);
            console.log("✅ MP3 Download successful!");

        } catch (error) {
            console.error("❌ MP3 Download failed", error);
        }
    };


    const playAudio = async (uniqueId) => {
        try {
            const response = await fetch(`https://cdr.infinixinfotech.in/api/files/getFileByUniqueId/${uniqueId}`, {
                method: "GET",
            });

            if (!response.ok) throw new Error("Failed to fetch audio");

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setAudioSrc(url);
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
    };
    return (
        <>
            <div className="container-fluid mt-4">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">Error: {error}</p>
                ) : (
                    <>
                        <section
                            className="container-fluid mb-3 shadow-sm mt-5 p-3"
                            style={{
                                background: "#2c3e50",
                                borderBottom: "1px solid #E1E6EF",
                            }}
                        >
                            <div className="col-12 col-md-8 text-start">
                                <h2 className="text-white">
                                    <BarChart className="me-2 fs-1" /> CallingReport
                                </h2>
                            </div>

                            {/* New container for form inputs */}
                            <div className="container-fli mt-3">
                                <div className="row g-3">

                                    {/* {storedUsername?.toLowerCase() === "admin" && (
                                        <div className="col-12 col-md-3">
                                            <label className="text-white">Employee Code</label>
                                            <input
                                                type="text"
                                                id="employeeCode"
                                                className="form-control input-box"
                                                placeholder="Enter Employee Code"
                                                value={employeeCode}
                                                onChange={(e) => setEmployeeCode(e.target.value)}
                                            />
                                        </div>
                                    )} */}
                                    {/* <div className="col-12 col-md-3">
                                        <label className="text-white">Lead Id</label>
                                        <input
                                            type="text"
                                            id="leadId"
                                            className="form-control input-box"
                                            placeholder="Enter Lead Id"
                                            value={leadId}
                                            onChange={(e) => setLeadId(e.target.value)}
                                        />
                                    </div> */}

                                    <div className="col-12 col-md-3">
                                        <label className="text-white">Start Date</label>
                                        <input
                                            type="date"
                                            id="start-date"
                                            className="form-control input-box"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-12 col-md-3">
                                        <label className="text-white">End Date</label>
                                        <input
                                            type="date"
                                            id="end-date"
                                            className="form-control input-box"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="table-responsive w-100">
                            {stats.length > 0 && (
                                <table className="table table-bordered text-center table-hover mt-2 blue-striped"
                                    style={{ fontSize: "12px" }}>
                                    <thead>
                                        <tr>
                                            <th>Extension</th>
                                            <th>Incoming Calls</th>
                                            <th>Total Incoming Duration</th>
                                            <th>Outgoing Calls</th>
                                            <th>Total Outgoing Duration</th>
                                            <th>Missed Calls</th>
                                            <th>Agent</th>
                                            <th>Manager</th>
                                        </tr>
                                    </thead>
                                    {/* <tbody>
                                        {stats.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.ExtensionNumber}</td>
                                                <td>{item.IncomingCallCount}</td>
                                                <td>{formatDuration(item.TotalIncomingDuration)}</td>
                                                <td>{item.OutgoingCallCount}</td>
                                                <td>{formatDuration(item.TotalOutgoingDuration ?? "N/A")}</td>
                                                <td>{item.MissedCallCount}</td>
                                                <td>{item.AgentName}</td>
                                                <td>{item.ManagerName}</td>
                                            </tr>
                                        ))}
                                    </tbody> */}

                                    <tbody>
                                        {stats
                                            .filter(item =>
                                                ["admin", "Admin", "ADMIN"].includes(storedUsername) || item.ExtensionNumber === extensionNumber
                                            ) 
                                            .map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.ExtensionNumber}</td>
                                                    <td>{item.IncomingCallCount}</td>
                                                    <td>{formatDuration(item.TotalIncomingDuration)}</td>
                                                    <td>{item.OutgoingCallCount}</td>
                                                    <td>{formatDuration(item.TotalOutgoingDuration ?? "N/A")}</td>
                                                    <td>{item.MissedCallCount}</td>
                                                    <td>{item.AgentName}</td>
                                                    <td>{item.ManagerName}</td>
                                                </tr>
                                            ))}
                                    </tbody>

                                </table>
                            )}
                        </div>
                        <nav>
                            <ul className="pagination justify-content-center mt-3">

                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="btn btn-sm btn-outline-dark p-0 btn-circle ms-0" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                                        <LucideChevronLeft />
                                    </button>
                                </li>
                                {[...Array(Math.min(3, totalPages)).keys()].map((num) => (
                                    <li className={`page-item ${num + 1 === currentPage ? "active" : ""}`} key={num}>
                                        <button className="btn page-link  btn-sm btn-outline-primary p-1 btn-circle ms-0" onClick={() => setCurrentPage(num + 1)}>
                                            {num + 1}
                                        </button>
                                    </li>
                                ))}
                                {currentPage > 5 && totalPages > 6 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                                {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
                                    .filter((num) => num > 3 && num < totalPages - 2)
                                    .map((num) => (
                                        <li className={`page-item ${num === currentPage ? "active" : ""}`} key={num}>
                                            <button className="btn page-link  btn-sm btn-outline-primary p-1 btn-circle ms-0" onClick={() => setCurrentPage(num)}>
                                                {num}
                                            </button>
                                        </li>
                                    ))}
                                {currentPage < totalPages - 4 && totalPages > 6 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                                {[...Array(3).keys()]
                                    .map((num) => totalPages - 2 + num)
                                    .filter((num) => num >= 4)
                                    .map((num) => (
                                        <li className={`page-item ${num === currentPage ? "active" : ""}`} key={num}>
                                            <button className="btn page-link btn-sm btn-outline-primary p-1 btn-circle ms-0" onClick={() => setCurrentPage(num)}>
                                                {num}
                                            </button>
                                        </li>
                                    ))}
                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button className="btn btn-sm btn-outline-primary p-0 btn-circle ms-0" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                                        <LucideChevronRight />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </>
                )}

                <div className="flex justify-center items-center min-h-screen">
                    {/* Audio Player */}
                    {audioSrc && (
                        <div className="p-4 border rounded-lg shadow-lg bg-gray-100 w-full max-w-md text-center">
                            <h5 className="text-lg font-semibold mb-2">Playing Audio:</h5>
                            <audio controls autoPlay className="w-full">
                                <source src={audioSrc} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>

            </div>

        </>
    )
}
