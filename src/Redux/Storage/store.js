import { configureStore } from "@reduxjs/toolkit";
import leadStatusReducer from "../Reducers/LeadStatusReducer";
import departmentReducer from "../Reducers/DepartmentReducer";
import leadSourceReducer from "../Reducers/LeadSourceReducer";
import segmentListReducer from "../Reducers/SegmentListReducer";
import qualificationReducer from "../Reducers/QualificationReducer";
import segmentPlanReducer from "../Reducers/SegmentPlanReducer"
import addUserReducer from "../Reducers/AddUserReducer"
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
    adduser: addUserReducer,
    groups : groupsReducer,
  },
});

export default store;
