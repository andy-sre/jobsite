import React from "react";
import {JobTypes, sortOptions, StatusOptions} from "../context/actions";

export interface userDetails {
    name?: string,
    lastName?: string,
    email?: string,
    password?: string,
    location?: string,
    isMember?: boolean

}

export interface formInterface {
    type: string,
    name: string,
    labelText?: string,
    value: string| number | undefined,
    handleChange?(e: React.ChangeEvent<HTMLInputElement>): void,
    handleJobInput?(e: React.InputHTMLAttributes<HTMLInputElement>): void,
}


export interface formSelectInterface {
    labelText?: string,
    name: string,
    value: string,
    handleChange?(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void,
    list: string[]
}

export interface appContext {
    isLoading: boolean,
    showAlert: boolean,
    alertText: string,
    alertType: string,
    displayAlert?(): void,
    user: { email: string, name: string, lastName: string, location: string } | null,
    userLocation?: string | null,
    token: string | null,
    setupUser?(currentUser: userDetails, endPoint: string, alertText: string): void,
    toggleSidebar?(): void,
    showSidebar: boolean,
    logoutUser?(): void
    updateUser?(currentUser: userDetails): void,
    isEditing: boolean,
    editJobId: string,
    position: string,
    company: string,
    jobLocation?: string | null,
    jobTypeOptions: JobTypes[],
    jobType: string,
    statusOptions: StatusOptions[],
    status: string,
    handleChange?({name, value}: {name: string, value: string}): void
    clearValues?(): void,
    createJob?(): void,
    jobs: jobsInterface[],
    totalJobs: number,
    page: number,
    numOfPages: number,
    getJobs?(): void,
    setEditJob?(id: string): void,
    editJob?(): void,
    deleteJob?(jobId: string): void,
    stats: {pending: number, interview: number, declined: number},
    monthlyApplication: monthlyApplication[],
    showStats?(): void,
    defaultStats?: DefaultStatsItems[],
    search: string,
    searchStatus: string,
    searchType: string,
    sort: string,
    sortOptions: sortOptions[],
    clearFilters?(): void,
    changePage?(page: number): void,
}

export interface jobsInterface {
    _id: string,
    company: string,
    position: string,
    status: string,
    jobType: string,
    jobLocation: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string
}

export interface ActionInterface {
    type: string,
    payload?: {
        user: { email: string, name: string, lastName: string, location: string },
        token: string,
        userLocation: string,
        alertText: string
    }
    updatePayload?: {
        user: { email: string, name: string, lastName: string, location: string },
        token: string,
        userLocation: string,
    }
    jobsPayload?: {
        jobs: jobsInterface[],
        totalJobs: number,
        numOfPages: number
    }
    editJobsPayload?: {
        id: string
    }
    handlePayload?: {
        name: string,
        value: string | number | undefined
    }
    statsPayload?: {
        stats: {pending: number, interview: number, declined: number},
        monthlyApplication: { date: string, count: number}[]
    }
    errorPayload?: {
        msg: string
    }
    changePagePayload?: {
        page: number
    }
}
export interface DefaultStatsItems {
        title: string,
        count: number,
        icon: JSX.Element,
        color: string,
        bcg: string
}

export interface monthlyApplication {
    date: string,
    count: number
}