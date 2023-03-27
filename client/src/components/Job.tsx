import React from 'react';
import {FaLocationArrow, FaBriefcase, FaCalendarAlt} from 'react-icons/fa'
import {jobsInterface} from "../interfaces/interfaces";
import moment from "moment";
import Wrapper from "../assets/wrappers/Job";
import {Link} from "react-router-dom";
import {useAppContext} from "../context/appContext";
import JobInfo from "./JobInfo";

const Job = ({_id, position, company, jobLocation, jobType, status, createdAt}: jobsInterface) => {
    const {setEditJob, deleteJob} = useAppContext()
    let date = moment(createdAt).format('Do MMM, YYYY')
    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
                    <JobInfo icon={<FaCalendarAlt/>} text={date}/>
                    <JobInfo icon={<FaBriefcase/>} text={jobType}/>
                    <div className={`status ${status.toLowerCase()}`}>{status}</div>
                </div>
                <footer>
                    <div className="actions">
                        <Link className={"btn edit-btn"} to={'/add-job'} onClick={() => setEditJob!(_id)}>Edit</Link>
                        <button className="btn delete-btn" onClick={() => deleteJob!(_id)}>Delete</button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
};

export default Job;