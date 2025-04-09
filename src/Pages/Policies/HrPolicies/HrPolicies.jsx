import React, { useState } from 'react';

const HrPolicies = () => {
    const [bodyContent, setBodyContent] = useState(
        `<p><strong>Dear [Employee's Name],</strong><br />
        I hope this email finds you well. I am thrilled to share some exciting updates and take this opportunity to acknowledge your invaluable contributions to [Company Name].<br /><br />
        <strong>Recent Achievements:</strong><br />
        We are pleased to announce that [describe the achievement, e.g., our team has successfully launched the new product line, surpassed sales targets, or received positive client feedback]. Your hard work and dedication have played a significant role in achieving this milestone.<br /><br />
        <strong>Your Contributions:</strong><br />
        Specifically, your efforts in [specific task or responsibility, e.g., leading the project, ensuring timely deliveries, or maintaining excellent customer relationships] have been instrumental in this success. Your commitment and professionalism are deeply appreciated.<br /><br />
        <strong>Looking Ahead:</strong><br />
        As we move forward, we are excited about the opportunities ahead and are confident in your continued support and dedication. Please don't hesitate to share any ideas or feedback that can help us grow even further.<br /><br />
        <strong>Support and Collaboration:</strong><br />
        We remain committed to fostering a positive and collaborative work environment. If there's anything you need or wish to discuss, feel free to reach out to [manager/HR representative].<br /><br />
        Once again, thank you for all that you do. Let's continue to work together to achieve even greater heights!<br /><br />
        Best regards,<br />
        [Your Name]<br />
        [Your Position]<br />
        [Company Name]<br />
        [Contact Information]</p>`
    );

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 py-4" style={{ backgroundColor: '#f8f9fa', marginTop: "90px" }}>
            <div className="container-fluid p-0 rounded shadow-lg" style={{ maxWidth: '800px', backgroundColor: '#ffffff' }}>
                {/* Header Section */}
                <div className="text-center p-3" style={{
                    background: "linear-gradient(45deg, #343a40, #6c757d)",
                    color: "white",
                    borderRadius: "10px 10px 0 0"
                }}>
                    <h3 className="mb-0 fs-3 fs-md-2 fs-lg-1">HR Policies & Updates</h3>
                </div>

                {/* Body Content */}
                <div className="p-4" dangerouslySetInnerHTML={{ __html: bodyContent }}></div>

                {/* Footer Section */}
                <div className="text-center p-3 mt-3" style={{ backgroundColor: "#f7f9fc", borderRadius: "0 0 10px 10px" }}>
                    <small>&copy; 2025 Infinix Infotech Pvt. Ltd. All rights reserved.</small>
                </div>
            </div>
        </div>
    );
};

export default HrPolicies;
