import Wrapper from "../assets/wrappers/RegisterPage";
import React, {useEffect, useState} from "react";
import {Alert, FormRow, Logo} from "../components";
import {userDetails} from "../interfaces/interfaces";
import {useAppContext} from "../context/appContext";
import {useNavigate} from "react-router-dom";

let initialState = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    isMember: true
}
const Register = () => {
    const [values, setValues] = useState<userDetails>(initialState)
    const navigate = useNavigate()
    const {user, showAlert, isLoading, displayAlert, setupUser} = useAppContext()
    // Global state and useNavigate

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember})
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {name, lastName, email, password, location, isMember} = values
        if (isMember) {
            if(!email || !password) {
                if (displayAlert) {
                    displayAlert()
                }
                return
            }
            const currentUser = {email, password}
            if(setupUser) setupUser(currentUser, 'login', 'Login Successful... Redirecting to dashboard')
        } else {
            if(!email || !password || !location || !lastName || (!isMember && !name)) {
                if (displayAlert) {
                    displayAlert()
                }
                return
            }
            const currentUser = {name, lastName, email, password, location}
            if (setupUser) setupUser(currentUser, 'register', 'User Registered... Redirecting to dashboard')
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    return (
        <Wrapper className={"full-page"}>
            <form onSubmit={handleSubmit} className="form">
                <Logo/>
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert/>}
                {/* Name Input */}
                {!values.isMember &&
                    <>
                        <FormRow
                            type={"text"}
                            name={"name"}
                            labelText={"First Name"}
                            value={values.name}
                            handleChange={handleChange}
                        />
                        <FormRow
                            type={"text"}
                            name={"lastName"}
                            labelText={"Last Name"}
                            value={values.lastName}
                            handleChange={handleChange}
                        />
                        <FormRow
                            type={"text"}
                            name={"location"}
                            value={values.location}
                            handleChange={handleChange}
                        />
                    </>
                }
                <FormRow
                    type={"email"}
                    name={"email"}
                    value={values.email}
                    handleChange={handleChange}
                />
                <FormRow
                    type={"password"}
                    name={"password"}
                    value={values.password}
                    handleChange={handleChange}
                />

                <button type={"submit"} className={"btn btn-block"} disabled={isLoading}>Submit</button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type={"button"} onClick={toggleMember} className={"member-btn"}>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;