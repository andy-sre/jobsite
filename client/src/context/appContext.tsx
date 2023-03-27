import React, {createContext, useContext, useReducer} from 'react';
import {appContext, userDetails} from "../interfaces/interfaces";
import {Action, JobTypes, sortOptions, StatusOptions} from "./actions";
import Reducer from "./reducer";
import axios from 'axios';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('userLocation')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token ? token : null,
    userLocation: userLocation ? userLocation : '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobType: JobTypes.FULL_TIME,
    status: StatusOptions.PENDING,
    jobLocation: userLocation ? userLocation : '',
    jobTypeOptions: [JobTypes.FULL_TIME, JobTypes.PART_TIME, JobTypes.REMOTE, JobTypes.INTERNSHIP],
    statusOptions: [StatusOptions.PENDING, StatusOptions.INTERVIEW, StatusOptions.DECLINED],
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    stats: {pending: 0, interview: 0, declined: 0},
    monthlyApplication: [],
    defaultStats: [],
    search: '',
    searchStatus: 'All',
    searchType: 'All',
    sort: 'Latest',
    sortOptions: [sortOptions.LATEST, sortOptions.OLDEST, sortOptions.A_Z, sortOptions.Z_A],
}

const AppContext = createContext<appContext>(initialState)

const AppProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    const handleChange = ({name, value}: {name: string, value: string}) => {
        dispatch({
            type: Action.HANDLE_CHANGE,
            handlePayload: {name, value},
        })
    }

    const displayAlert = () => {
        dispatch({type: Action.DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: Action.CLEAR_ALERT
            })
        }, 3000)
    }

    const addUserToLocalStorage = ({user, token, userLocation}: {user: object, token: string, userLocation: string}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('userLocation', userLocation)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('userLocation')
    }

    const setupUser = async (currentUser: object, endpoint: string, alertText: string) => {
        dispatch({type: Action.SETUP_USER_BEGIN})
        try {
            const res = await axios.post(`http://localhost:4001/api/v1/auth/${endpoint}`, currentUser)
            const {user, token, userLocation} = res.data
            dispatch({
                type: Action.SETUP_USER_SUCCESS,
                payload: {user, token, userLocation, alertText}
            })
            addUserToLocalStorage({user, token, userLocation})
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: Action.SETUP_USER_ERROR,
                    errorPayload: {msg: error.response?.data.msg}
                })
            }
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({type: Action.TOGGLE_SIDEBAR})
    }

    const logoutUser = () => {
        dispatch({type: Action.LOGOUT_USER})
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser: userDetails) => {
        dispatch({type: Action.UPDATE_USER_BEGIN})
        try {
            const {data} = await axios.patch('http://localhost:4001/api/v1/auth/updateuser', currentUser, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            const { user, userLocation, token } = data

            dispatch({
                type: Action.UPDATE_USER_SUCCESS,
                updatePayload: {user, userLocation, token}
            })

            addUserToLocalStorage({user, userLocation, token})
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) logoutUser()
                dispatch({
                    type: Action.UPDATE_USER_ERROR,
                    errorPayload: {msg: error.response?.data.msg}
                })
            }
        }
        clearAlert()
    }

    const clearValues = () => {
        dispatch({
            type: Action.CLEAR_VALUES
        })
    }

    const createJob = async () => {
        clearAlert()
        dispatch({
            type: Action.CREATE_JOB_BEGIN
        })
        try {
            const { position, company, jobLocation, jobType, status, token} = state
            await axios.post('http://localhost:4001/api/v1/jobs',{
                position,
                company,
                jobLocation,
                jobType,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            dispatch({
                type: Action.CREATE_JOB_SUCCESS,
            })
            dispatch({
                type: Action.CLEAR_VALUES
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) logoutUser()
                dispatch({
                    type: Action.CREATE_JOB_ERROR,
                    errorPayload: {msg: error.response?.data.msg}
                })
            }
        }
    }

    const getJobs = async () => {
        dispatch({type: Action.GET_JOBS_BEGIN})
        let url = `?page=${state.page}&status=${state.searchStatus}&jobType=${state.searchType}&sort=${state.sort}`
        if (state.search) url += `&search=${state.search}`
        try {
            const { data } = await axios.get('http://localhost:4001/api/v1/jobs'+url, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            const {jobs, totalJobs, numOfPages } = data
            dispatch({
                type: Action.GET_JOBS_SUCCESS,
                jobsPayload: {
                    jobs: jobs,
                    totalJobs: totalJobs,
                    numOfPages: numOfPages
                }
            })
        } catch (error) {
            logoutUser()
        }
        clearAlert()
    }

    const setEditJob = (id: string) => {
        dispatch({
            type: Action.SET_EDIT_JOB,
            editJobsPayload: {
                id: id
            }
        })
    }

    const editJob = async () => {
        clearAlert()
        dispatch({type: Action.EDIT_JOB_BEGIN})
        try {
            const { position, company, jobLocation, jobType, status, editJobId} = state
            await axios.patch(`http://localhost:4001/api/v1/jobs/${editJobId}`,{
                position,
                company,
                jobLocation,
                jobType,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            dispatch({
                type: Action.EDIT_JOB_SUCCESS,
            })
            dispatch({
                type: Action.CLEAR_VALUES
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) logoutUser()
                dispatch({
                    type: Action.EDIT_JOB_ERROR,
                    errorPayload: {msg: error.response?.data.msg}
                })
            }
        }
        clearAlert()
    }

    const deleteJob = async (jobId: string) => {
        dispatch({type: Action.DELETE_JOB_BEGIN})
        try {
            await axios.delete(`http://localhost:4001/api/v1/jobs/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            await getJobs()
        } catch (error) {
            logoutUser()
        }
        clearAlert()
    }

    const showStats = async () => {
        dispatch({type: Action.SHOW_STATS_BEGIN})
        try {
            const {data} = await axios.get(`http://localhost:4001/api/v1/jobs/stats`, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            const {defaultStats, monthlyApplication} = data
            dispatch({
                type: Action.SHOW_STATS_SUCCESS,
                statsPayload: {
                    stats: defaultStats,
                    monthlyApplication: monthlyApplication
                }
            })
        } catch (error) {
            logoutUser()
        }
        clearAlert()
    }

    const clearFilters = () => {
        dispatch({
            type: Action.CLEAR_FILTERS
        })
    }

    const changePage = (page: number) => {
        dispatch({
            type: Action.CHANGE_PAGE,
            changePagePayload: {
                page: page
            }
        })
    }

    return <AppContext.Provider value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        clearFilters,
        changePage
    }}>
        {children}
    </AppContext.Provider>
};

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext};

