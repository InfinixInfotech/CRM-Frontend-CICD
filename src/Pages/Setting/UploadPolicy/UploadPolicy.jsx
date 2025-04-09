import React, { useEffect, useState } from 'react';
import { FaFilePdf, FaUpload } from "react-icons/fa";
import BackButton from '../../../Components/Button/BackButton/BackButton';
import { GrAdd } from 'react-icons/gr';
import { DeleteByIdPolicyUrl, GetAllPolicyUrl, UploadPolicyUrl } from '../../../Redux/Services/apiServer/ApiServer';
import DeleteButton from '../../../Components/Button/DeleteButton/DeleteButton'
export default function UploadImage() {
    const [showPopup, setShowPopup] = useState(false);
    const [pdfCardData, setPDFCardData] = useState([]);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };


    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const imageFile = e.target.image.files[0];
    
        if (!imageFile) {
            alert("Please select an image to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append("files", imageFile); // Use 'files' instead of 'image'
    
        try {
            const token = localStorage.getItem("authToken"); // Retrieve token from local storage
    
            const response = await fetch(UploadPolicyUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`, // Include authorization token
                },
                body: formData,
            });
    
            console.log(formData.get("files"));
    
            if (response.ok) {
                const data = await response.json();
                alert("Image uploaded successfully!");
                window.location.reload();
                setShowPopup(false);
            } else {
                throw new Error("Failed to upload image.");
            }
        } catch (error) {
            alert(error.message);
        }
    };
    
    //! ------------------------------------------------------------------------------GET ALL IMAGES API-------------------------------------------------------------------------------------
    // useEffect(() => {
    //     const fetchImages = async () => {
    //         try {
    //             const token = localStorage.getItem("authToken"); // Retrieve token from local storage
    //             const response = await fetch(GetAllPolicyUrl, {
    //                 method: "GET",
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             });
    //             const data = await response.json();
    //             if (response.ok && Array.isArray(data.data)) {
    //                 const formattedData = data.data.flatMap((item) =>
    //                     item.images.map((img) => ({
    //                         id: item.id,
    //                         fileName: img.fileName,
    //                         image: `data:${img.contentType};base64,${img.fileData}`,
    //                     }))
    //                 );
    //                 setImageCardData(formattedData);
    //             } else {
    //                 console.error("Failed to fetch images:", data.message);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching images:", error);
    //         }
    //     };
    //     fetchImages();
    // }, []);

    useEffect(() => {
        const fetchPDFs = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(GetAllPolicyUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log("API Response:", data); // Debugging API response

                if (response.ok && Array.isArray(data.data)) {
                    const formattedData = data.data.flatMap((item) =>
                        item.pdfFiles?.map((pdf) => ({
                            id: item.id,
                            fileName: pdf.fileName,
                            pdfUrl: `data:${pdf.contentType};base64,${pdf.fileData}`,
                        })) || []
                    );
                    console.log("Formatted Data:", formattedData); // Debugging formatted data
                    setPDFCardData(formattedData);
                } else {
                    console.error("Failed to fetch PDFs:", data.message);
                }
            } catch (error) {
                console.error("Error fetching PDFs:", error);
            }
        };

        fetchPDFs();
    }, []);

    //! ------------------------------------------------------------------------------GET ALL IMAGES API-------------------------------------------------------------------------------------

    const handleImageDelete = async (id) => {
        try {
            const token = localStorage.getItem("authToken"); // Retrieve token from local storage
            if (!token) {
                alert("Authentication token missing.");
                return;
            }
            const deleteUrl = `${DeleteByIdPolicyUrl}?id=${id}`;
    
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                    alert("Image deleted successfully!");
                window.location.reload(); 
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete image.");
            }
        } catch (error) {
            alert(error.message);
        }
    };
    

    return (
        <div>
            {/* Section Header */}
            <section
                style={{
                    position: "relative",
                    backgroundColor: "#fff",
                    borderBottom: "1px solid #E1E6EF",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
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
                    <FaUpload
                        className="fs-1"
                        style={{ marginRight: "8px", color: "#2c3e50" }}
                    />
                    Upload Image
                </h2>
            </section>

            {/* Content Section */}
            <div className="mt-1">
                <div className="border border-2 border-grey">
                    <h5
                        className="text-dark border border-1 pb-2"
                        style={{
                            fontSize: "1.7rem",
                            backgroundColor: "#E8F1F3",
                        }}
                    >
                        <BackButton />
                        Upload Image
                    </h5>
                    <div className="p-2">
                        <div className="mb-0">
                            <div className="d-flex gap-1">
                                {/* Button to open Popup */}
                                <button
                                    onClick={handleOpenPopup}
                                    className="btn btn-exp btn-sm text-white d-flex align-items-center"
                                    style={{ backgroundColor: "#2c3e50" }}
                                >
                                    <GrAdd className="text-white fs-6 fw-bold me-1" />
                                    Upload Images
                                </button>

                                {/* Image Upload Popup */}
                                {showPopup && (
                                    <div
                                        className="popup d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
                                        style={{
                                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                                            zIndex: 1050,
                                        }}
                                    >
                                        <div
                                            className="popup-content card shadow-lg p-4 bg-white"
                                            style={{ width: "400px", borderRadius: "10px" }}
                                        >
                                            <div className="card-body">
                                                <h5 className="card-title text-center text-success mb-4">
                                                    Upload Image
                                                </h5>
                                                <button
                                                    className="btn-close position-absolute top-0 end-0 m-3"
                                                    onClick={handleClosePopup}
                                                ></button>
                                                <form onSubmit={handleImageUpload}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Choose Image</label>
                                                        <input type="file" name="image" id="image" />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="btn w-100"
                                                        style={{
                                                            backgroundColor: "#2c3e50",
                                                            color: "white",
                                                        }}
                                                    >
                                                        Upload
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                        </div>
                    </div>
                    {/* import { FaFilePdf } from "react-icons/fa"; // Import PDF icon */}

                    <div>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">PDF Name</th>
                                    <th scope="col">PDF Preview</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pdfCardData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.fileName}</td>
                                        <td>
                                            <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                                                <FaFilePdf size={30} color="red" />
                                            </a>
                                        </td>
                                        <td> <DeleteButton
                                              onDelete={() =>
                                                handleImageDelete(item.id)
                                              }
                                            className="btn btn-danger btn-sm"
                                        />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    );
}
