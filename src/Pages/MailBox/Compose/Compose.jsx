// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import React-Quill styles
// import BackButton from "../../../Components/Button/BackButton/BackButton";

// const Compose = () => {
//   const [formData, setFormData] = useState({
//     to: "",
//     cc: "",
//     bcc: "",
//     subject: "",
//     message: "", // This will hold HTML content from the editor
//     attachment: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, attachment: e.target.files[0] });
//   };

//   const handleQuillChange = (value) => {
//     setFormData({ ...formData, message: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Email sent successfully!");
//     console.log(formData); // Log email data, including the rich-text message
//   };

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image", "code-block"],
//       ["clean"],
//     ],
//   };

//   return (
//     <>
//       <h2 className="mb-1 text-center bg-dark text-white py-2 mt-5">
//         Compose Email
//       </h2>
//       <BackButton to="/mailbox" />

//       <div
//         className="container-fluid border border-2 border-gray mt-2 py-3"
//         style={{ padding: "18px 16px" }}
//       >
//         <div
//           className="lead-status-container mt-0 p-3"
//           style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
//         >
//           <form onSubmit={handleSubmit}>
//             <div className="form-group mt-2">
//               <label className="fw-semibold">To:</label>
//               <input
//                 type="email"
//                 className="form-control input-box"
//                 name="to"
//                 value={formData.to}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group mt-2">
//               <label className="fw-semibold">CC:</label>
//               <input
//                 type="email"
//                 className="form-control input-box"
//                 name="cc"
//                 value={formData.cc}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group mt-2">
//               <label className="fw-semibold">BCC:</label>
//               <input
//                 type="email"
//                 className="form-control input-box"
//                 name="bcc"
//                 value={formData.bcc}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group mt-2">
//               <label className="fw-semibold">Subject:</label>
//               <input
//                 type="text"
//                 className="form-control input-box"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group mt-2">
//               <label className="fw-semibold">Message:</label>
//               <ReactQuill
//                 style={{height:"200px"}}
//                 className="bg-white"
//                 theme="snow"
//                 value={formData.message}
//                 onChange={handleQuillChange}
//                 modules={modules}
//                 placeholder="Write your message here..."
//               />
//             </div>
//             <div className="form-group mt-5 mb-2">
//               <label className="fw-semibold">Attachment:</label>
//               <input
//                 type="file"
//                 className="form-control-file"
//                 name="attachment"
//                 onChange={handleFileChange}
//               />
//             </div>
//             <div className="form-group d-flex justify-content-between">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => alert("Email saved as draft!")}
//               >
//                 Save
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 Send
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Compose;
