import {
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Area
} from "recharts";
import {monthlyApplication} from "../interfaces/interfaces";


const AreaChartComponent = ({data}: {data: monthlyApplication[]}) => {
    return (
        <ResponsiveContainer width={'100%'} height={300}>
            <AreaChart data={data} margin={{top: 50}}>
                <CartesianGrid strokeDasharray={'3 3'}/>
                <XAxis dataKey={'date'}/>
                <YAxis allowDecimals={false}/>
                <Tooltip/>
                <Area type={'monotone'} dataKey={'count'} fill={'#2cb1bc'} stroke={'2cb1bc'}/>
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartComponent;