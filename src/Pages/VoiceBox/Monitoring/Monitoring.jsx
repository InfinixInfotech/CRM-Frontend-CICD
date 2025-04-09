import { Download, LucideChevronLeft, LucideChevronRight, Monitor, PhoneCall, Play } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { emp, storedUsername } from "../../../Redux/Services/apiServer/ApiServer";
import { getExtensionEmpThunk, postCallingEmpThunk } from "../../../Redux/Services/thunks/AdditionalApiThunk";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

const Monitoring = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const entriesPerPage = 15;
    const [audioSrc, setAudioSrc] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [leadId, setLeadId] = useState("");
    const dispatch = useDispatch();
    const [employeeCode, setEmployeeCode] = useState("");
    const { emplist, } = useSelector((state) => state.additional);
    const { data: additionalData, loading: additionalLoading, error: additionalError } = useSelector((state) => state.additional);
    const ExtensionEmp = emp;
    const [extensionNumber, setExtensionNumber] = useState("");

    // const saveScrollPosition = () => {
    //     localStorage.setItem("scrollPosition", window.scrollY);
    // };
    // const restoreScrollPosition = () => {
    //     const scrollPosition = localStorage.getItem("scrollPosition");
    //     if (scrollPosition) {
    //         window.scrollTo(0, parseInt(scrollPosition, 10));
    //     }
    // };
    //   useEffect(() => {
    //     restoreScrollPosition();
    //   }, []);

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


    const intervalRef = useRef(null);

    const fetchData = async () => {
        setError(null);
        const today = new Date().toISOString().split("T")[0];
        const formattedStartDate = startDate ? new Date(startDate).toISOString().split("T")[0] : today;
        const formattedEndDate = endDate ? new Date(endDate).toISOString().split("T")[0] : today;

        const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyVVc2VySWQiOiIxIiwiVXNlck5hbWUiOiJhZG1pbiIsImV4cCI6MTc0MDQwNjE3NywiaXNzIjoiaHR0cHM6Ly93d3cudmFybmV0c29sdXRpb25zLmNvbS8iLCJhdWQiOiJzYW5kZXNodmFoYWtfYnJvYWRjYXN0X21lc3NhZ2UifQ.qIsKTG0V7lhsVbTAfnFmuDuja85GjqHOOr1DvoyqCXM";

        const queryParamsEmp = new URLSearchParams({
            from: formattedStartDate,
            to: formattedEndDate,
            limit: entriesPerPage,
            page: currentPage,
            srcdst: leadId ? leadId : emp
        }).toString();

        const queryParamsAdmin = new URLSearchParams({
            from: formattedStartDate,
            to: formattedEndDate,
            limit: entriesPerPage,
            page: currentPage,
            srcdst: leadId ? leadId : (employeeCode ? employeeCode : "")
        }).toString();

        let cdrurl = ["admin", "Admin", "ADMIN"].includes(storedUsername)
            ? `https://cdr.infinixinfotech.in/api/var_cdrs/cdr/get?${queryParamsAdmin}`
            : `https://cdr.infinixinfotech.in/api/var_cdrs/cdr/get?${queryParamsEmp}`;

        try {
            const response = await fetch(cdrurl, {
                method: "POST",
                headers: {
                    "Authorization": `${authToken}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch data");
            setLoading(false)
            const result = await response.json();
            setData(result.data || []);
            setTotalPages(result.pagination?.totalPages || 1);
        } catch (error) {
            setError(error.message);
        }

        // const statsUrl = "https://cdr.infinixinfotech.in/api/StatsDataInExcellFile/get-stats";

        // try {
        //     // Fetch Call Data Records (CDR)
        //     const [cdrResponse, statsResponse] = await Promise.all([
        //         fetch(cdrurl, {
        //             method: "POST",
        //             headers: { "Authorization": authToken }
        //         }),
        //         fetch(statsUrl, {
        //             method: "POST",
        //             headers: {
        //                 "Authorization": authToken,
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify({
        //                 from: formattedStartDate,
        //                 to: formattedEndDate,
        //                 format: "JSON",
        //                 ViewRecordsWithoutHierarchy: false
        //             })
        //         })
        //     ]);
        // } catch (error) {
        //     setError(error.message);
        // } finally {
        //     setLoading(false);
        // }
    };

    useEffect(() => {
        fetchData();

        intervalRef.current = setInterval(fetchData, 4000);
        setLoading(false)
        return () => clearInterval(intervalRef.current);
    }, [startDate, endDate, currentPage, leadId, employeeCode]);




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
                                    <Monitor className="me-2 fs-1" /> Monitoring
                                </h2>
                            </div>

                            {/* New container for form inputs */}
                            <div className="container-fli mt-3">
                                <div className="row g-3">
                                    {storedUsername?.toLowerCase() === "admin" && (
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
                                    )}

                                    <div className="col-12 col-md-3">
                                        <label className="text-white">Lead Id</label>
                                        <input
                                            type="text"
                                            id="leadId"
                                            className="form-control input-box"
                                            placeholder="Enter Lead Id"
                                            value={leadId}
                                            onChange={(e) => setLeadId(e.target.value)}
                                        />
                                    </div>

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


                            <table className="table table-bordered text-center table-hover mt-2 blue-striped"
                                style={{ fontSize: "12px" }}>
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Call ID</th>
                                        <th>Lead ID</th>
                                        <th>Client Name</th>
                                        <th>Mobile</th>
                                        <th>Employee ID</th>
                                        {/* <th>Agent ID</th> */}
                                        <th>Call Date</th>
                                        <th>Source</th>
                                        <th>Destination</th>
                                        <th>Duration</th>
                                        <th>Disposition</th>
                                        <th>Call Type</th>
                                        {/* <th>Unique ID</th> */}
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {loading ? (
                                        <tr>
                                            <td colSpan="10" className="text-center">
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
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="10" className="text-center text-danger">
                                                Error: {error}
                                            </td>
                                        </tr>
                                    ) :


                                        data.map((call) => (
                                            <tr key={call.id}>
                                                {/* <td>{call.id || "N/A"}</td> */}
                                                <td>{call.callid || "N/A"}</td>
                                                <td>{call.ref_lead_id || "N/A"}</td>
                                                <td>{call.client_name || "N/A"}</td>
                                                <td> <button
                                                    onClick={() => handleCalling(call.dst, call.ref_lead_id, call.client_name)}
                                                    className="bg-transparent text-success no-padding border-0"
                                                >
                                                    <PhoneCall size={18} className="text-blue-500" />
                                                </button></td>
                                                <td>{call.employee_id || "N/A"}</td>
                                                {/* <td>{call.agentid || "N/A"}</td> */}
                                                <td>{new Date(call.calldate).toLocaleString()}</td>
                                                <td>{call.src || "N/A"}</td>
                                                <td>{call.dst || "N/A"}</td>
                                                <td>
                                                    {call.duration
                                                        ? `${Math.floor(call.billsec / 60)} min ${call.billsec % 60} sec`
                                                        : "N/A"}
                                                </td>

                                                <td>{call.disposition || "N/A"}</td>
                                                <td>{call.calltype || "N/A"}</td>
                                                {/* <td>{call.uniqueid || "N/A"}</td> */}
                                                <td className="d-flex justify-content-center gap-2">
                                                    <button
                                                        className=" no-padding btn-success btn-sm"
                                                        style={{ height: "22px", fontSize: "11px" }}
                                                        onClick={() => playAudio(call.uniqueid)}
                                                    >
                                                        <Play size={16} />
                                                    </button>

                                                    <button className=" btn-success btn-sm"
                                                        onClick={() => handleDownload(call.uniqueid)}
                                                        style={{ height: "22px", fontSize: "11px" }}>
                                                        <Download size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <nav>
                            <ul className="pagination justify-content-center mt-3">
                                {/* Previous Button */}
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="btn btn-sm btn-outline-dark p-0 btn-circle ms-0" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                                        <LucideChevronLeft />
                                    </button>
                                </li>

                                {/* First 3 pages */}
                                {[...Array(Math.min(3, totalPages)).keys()].map((num) => (
                                    <li className={`page-item ${num + 1 === currentPage ? "active" : ""}`} key={num}>
                                        <button className="btn page-link  btn-sm btn-outline-primary p-1 btn-circle ms-0" onClick={() => setCurrentPage(num + 1)}>
                                            {num + 1}
                                        </button>
                                    </li>
                                ))}

                                {/* Dots if needed */}
                                {currentPage > 5 && totalPages > 6 && <li className="page-item disabled"><span className="page-link">...</span></li>}

                                {/* Middle pages around the current page */}
                                {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
                                    .filter((num) => num > 3 && num < totalPages - 2)
                                    .map((num) => (
                                        <li className={`page-item ${num === currentPage ? "active" : ""}`} key={num}>
                                            <button className="btn page-link  btn-sm btn-outline-primary p-1 btn-circle ms-0" onClick={() => setCurrentPage(num)}>
                                                {num}
                                            </button>
                                        </li>
                                    ))}

                                {/* Dots if needed */}
                                {currentPage < totalPages - 4 && totalPages > 6 && <li className="page-item disabled"><span className="page-link">...</span></li>}

                                {/* Last 3 pages */}
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

                                {/* Next Button */}
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
    );
};

export default Monitoring;
