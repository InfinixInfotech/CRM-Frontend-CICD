import { configureStore } from "@reduxjs/toolkit";
import leadStatusReducer from "../Reducers/LeadStatusReducer";
import departmentReducer from "../Reducers/DepartmentReducer";
import leadSourceReducer from "../Reducers/LeadSourceReducer";
import segmentListReducer from "../Reducers/SegmentListReducer";
import qualificationReducer from "../Reducers/QualificationReducer";
import segmentPlanReducer from "../Reducers/SegmentPlanReducer"
import userReducer from "../Reducers/UserReducer"
import groupsReducer from "../Reducers/GroupsReducer"

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
  },
});

export default store;
