import React from 'react';
import { GrAdd } from 'react-icons/gr';

const CommonPopup = ({
  title,
  showPopup,
  setShowPopup,
  handleAddStatus,
  handleEditStatus,
  editStatus,
  setEditValue,
  newStatus,
  setNewStatus,
  editValue,
}) => {
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditValue("");
    setNewStatus("");
  };

  return (
    <>
      <button
        onClick={handleOpenPopup}
        className="btn text-white"
        style={{ backgroundColor: "#009688" }}
      >
        <GrAdd className="text-white fs-6 fw-bold" />
        {`Add ${title}`}
      </button>

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
              <h5 className="card-title text-center mb-4">
                {editStatus !== null ? `Edit ${title}` : `Add New ${title}`}
              </h5>
              <button
                className="btn-close position-absolute top-0 end-0 m-3"
                onClick={handleClosePopup}
              ></button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editStatus !== null) {
                    handleEditStatus(editStatus);
                  } else {
                    handleAddStatus(e);
                  }
                }}
              >
                <div className="mb-3">
                  <label htmlFor="inputField" className="form-label">
                    {`${title} Name`}
                  </label>
                  <input
                    type="text"
                    id="inputField"
                    className="form-control"
                    value={editStatus !== null ? editValue : newStatus}
                    onChange={(e) =>
                      editStatus !== null
                        ? setEditValue(e.target.value)
                        : setNewStatus(e.target.value)
                    }
                    placeholder={`Enter ${title.toLowerCase()} name`}
                  />
                </div>
                <button
                  type="submit"
                  className="btn text-white w-100"
                  style={{ backgroundColor: "#009688" }}
                >
                  {editStatus !== null ? `Update ${title}` : `Add ${title}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommonPopup;
