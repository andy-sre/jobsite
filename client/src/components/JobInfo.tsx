import React from 'react';
import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = ({icon, text}: {icon: JSX.Element, text: string}) => {
    return (
        <Wrapper>
            <span className="icon">{icon}</span>
            <span className="text">{text}</span>
        </Wrapper>
    );
};

export default JobInfo;