import {Action, JobTypes, StatusOptions} from "./actions";
import {ActionInterface, appContext} from "../interfaces/interfaces";
import {initialState} from "./appContext";


const Reducer = (state: appContext, action: ActionInterface) => {
    switch (action.type) {
        case Action.DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please fill in all details'
            }
        case Action.CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: ''
            }
        case Action.SETUP_USER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case Action.SETUP_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload!.token,
                user: action.payload!.user,
                userLocation: action.payload!.userLocation,
                jobLocation: action.payload!.userLocation,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload!.alertText
            }
        case Action.SETUP_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.errorPayload!.msg
            }
        case Action.TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        case Action.LOGOUT_USER:
            return {
                ...initialState,
                user: null,
                token: null,
                userLocation: null,
                jobLocation: null
            }
        case Action.UPDATE_USER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case Action.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.updatePayload!.token,
                user: action.updatePayload!.user,
                userLocation: action.updatePayload!.userLocation,
                jobLocation: action.updatePayload!.userLocation,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Profile Updated'
            }
        case Action.UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.errorPayload!.msg
            }

        case Action.HANDLE_CHANGE:
            return {
                ...state,
                page: 1,
                [action.handlePayload!.name]: action.handlePayload!.value
            }
        case Action.CLEAR_VALUES:
            const resetState = {
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: JobTypes.FULL_TIME,
                status: StatusOptions.PENDING
            }
            return {...state, ...resetState}
        case Action.CREATE_JOB_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case Action.CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New Job Created'
            }
        case Action.CREATE_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.errorPayload!.msg
            }
        case Action.GET_JOBS_BEGIN:
            return {
                ...state,
                isLoading: true,
                showAlert: false
            }
        case Action.GET_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobs: action.jobsPayload!.jobs,
                totalJobs: action.jobsPayload!.totalJobs,
                numOfPages: action.jobsPayload!.numOfPages
            }
        case Action.SET_EDIT_JOB:
            const job = state.jobs.find((job) => job._id === action.editJobsPayload?.id)
            const {_id, position, company, jobLocation, jobType, status} = job!
            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status
            }
        case Action.DELETE_JOB_BEGIN:
            return {
                ...state, isLoading: true
            }
        case Action.EDIT_JOB_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case Action.EDIT_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Job Edited Successfully'
            }
        case Action.EDIT_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.errorPayload!.msg
            }
        case Action.SHOW_STATS_BEGIN:
            return {
                ...state,
                isLoading: true,
                showAlert: false
            }
        case Action.SHOW_STATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stats: action.statsPayload!.stats,
                monthlyApplication: action.statsPayload!.monthlyApplication
            }
        case Action.CLEAR_FILTERS:
            return {
                ...state,
                search: '',
                searchStatus: 'All',
                searchType: 'All',
                sort: 'Latest',
            }
        case Action.CHANGE_PAGE:
            return {
                ...state,
                page: action.changePagePayload!.page
            }
    }
    throw new Error(`No such action: ${action.type}`)
};

export default Reducer;