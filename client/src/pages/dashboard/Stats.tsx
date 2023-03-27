import React, {useEffect} from 'react';
import {useAppContext} from "../../context/appContext";
import Loading from "../../components/Loading";
import StatsContainer from "../../components/StatsContainer";
import ChartsContainer from "../../components/ChartsContainer";

const Stats = () => {
    const {showStats, isLoading, monthlyApplication} = useAppContext()

    useEffect(() => {
        showStats!()
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <Loading placement={"center"}/>
    }

    return (
        <>
            <StatsContainer/>
            {monthlyApplication.length > 0 && <ChartsContainer/>}
        </>
    );
};

export default Stats;