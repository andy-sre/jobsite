import React, {useState} from 'react';
import {useAppContext} from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {Alert, FormRow} from "../../components";

const Profile = () => {
    const {user, showAlert, displayAlert, updateUser, isLoading} = useAppContext()

    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [lastName, setLastName] = useState(user?.lastName)
    const [location, setLocation] = useState(user?.location)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name || !email || !lastName || !location) {
            if (displayAlert) {
                displayAlert()
            }
            return
        }
        if (updateUser) updateUser({name, email, lastName, location})
    }

    return (
        <Wrapper>
            <form className={"form"} onSubmit={handleSubmit}>
                <h3>Profile</h3>
                {showAlert && <Alert/>}
                <div className="form-center">
                    <FormRow
                        type={"text"}
                        name={"name"}
                        value={name}
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <FormRow
                        type={"text"}
                        name={"lastName"}
                        labelText={"Last Name"}
                        value={lastName}
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                    />
                    <FormRow
                        type={"email"}
                        name={"email"}
                        value={email}
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <FormRow
                        type={"text"}
                        name={"location"}
                        value={location}
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                    />
                    <button className="btn btn-block" type={"submit"} disabled={isLoading}>
                        {isLoading ? "Please Wait...." : "Submit"}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Profile;