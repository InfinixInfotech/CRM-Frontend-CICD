import { configureStore } from "@reduxjs/toolkit";
import leadStatusReducer from "../Reducers/LeadStatusReducer";
import departmentReducer from "../Reducers/DepartmentReducer";
import leadSourceReducer from "../Reducers/LeadSourceReducer";
import segmentListReducer from "../Reducers/SegmentListReducer";
import qualificationReducer from "../Reducers/QualificationReducer";
import segmentPlanReducer from "../Reducers/SegmentPlanReducer";
import userReducer from "../Reducers/UserReducer";
import groupsReducer from "../Reducers/GroupsReducer";
import salesOrderReducer from "../Reducers/SalesOrderReducer";
import leadPaymentRaiseReducer from "../Reducers/LeadPaymentRaiseReducer"
import addLeadReducer from "../Reducers/AddLeadReducer"
import uploadBulkLeadReducer from "../Reducers/UploadBulkLeadReducer"
import designationReducer from "../Reducers/DesignationReducer"


const store = configureStore({
  reducer: {
    // sliceName : ReducerFileName
    leadstatus: leadStatusReducer,
    department: departmentReducer,
    leadsource: leadSourceReducer,
    segmentlist: segmentListReducer,
    qualification: qualificationReducer,
    segmentplan: segmentPlanReducer,
    user: userReducer,
    groups : groupsReducer,
    salesorder: salesOrderReducer,
    leadpaymentraise: leadPaymentRaiseReducer, 
    addlead: addLeadReducer,
    uploadbulklead: uploadBulkLeadReducer,
    designation: designationReducer,
  },
});

export default store;
