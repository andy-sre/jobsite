import {useState} from 'react';
import Wrapper from "../assets/wrappers/ChartsContainer";
import {useAppContext} from "../context/appContext";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const ChartsContainer = () => {
    const [barChart, setBarChart] = useState<boolean>(true);
    const {monthlyApplication: data} = useAppContext()

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button className="button" onClick={() => setBarChart(!barChart)}>
                {barChart ? 'Area Chart' : 'Bar Chart'}
            </button>
            {barChart ? <BarChart data={data}/> : <AreaChart data={data}/>}
        </Wrapper>
    );
};

export default ChartsContainer;