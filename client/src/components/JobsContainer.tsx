import React, {useEffect} from 'react';
import {useAppContext} from "../context/appContext";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
    const {
        getJobs,
        jobs,
        isLoading,
        page,
        totalJobs,
        search,
        searchStatus,
        searchType,
        sort,
        numOfPages
    } = useAppContext()

    useEffect(() => {
        getJobs!()
        // eslint-disable-next-line
    }, [search, searchStatus, searchType, sort, page])

    if (isLoading) return <Loading placement={"center"}/>

    if (jobs.length === 0) return (
        <Wrapper>
            <h2>No jobs to display...</h2>
        </Wrapper>
    )

    return (
        <Wrapper>
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer/>}
        </Wrapper>
    );
};

export default JobsContainer;