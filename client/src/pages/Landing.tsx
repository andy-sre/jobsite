import main from '../assets/images/undraw_online_resume_re_ru7s.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'
import {Link} from "react-router-dom";
const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        I'm baby franzen kogi kinfolk,
                        man bun retro af cronut master cleanse migas palo santo beard seitan marfa.
                        You probably haven't heard of them JOMO pug deep v dreamcatcher iceland.
                        Asymmetrical big mood skateboard vape food truck 8-bit. Etsy bruh vice shoreditch tonx,
                        try-hard iceland chicharrones.
                    </p>
                    <Link to={"/register"} className={"btn btn-hero"}>Login/Register</Link>
                </div>
                <img src={main} alt={"Jon hunt"} className={"img main-img"}/>
            </div>
        </Wrapper>
    );
};

export default Landing;