import Wrapper from '../assets/wrappers/StatItem'
import {DefaultStatsItems} from "../interfaces/interfaces";

const StatsItem = ({ count, title, icon, color, bcg }: DefaultStatsItems) => {
    return (
        <Wrapper color={color}>
            <header>
                <span className='count'>{count}</span>
                <span className='icon'>{icon}</span>
            </header>
            <h5 className='title'>{title}</h5>
        </Wrapper>
    )
}

export default StatsItem
