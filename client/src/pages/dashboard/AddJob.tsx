import React from 'react';
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {Alert, FormRow} from "../../components";
import {useAppContext} from "../../context/appContext";
import FormRowSelect from "../../components/FormRowSelect";

const AddJob = () => {
    const {
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        isLoading,
        handleChange,
        clearValues,
        createJob,
        editJob,
    } = useAppContext()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!position || !company || !jobLocation) {
            displayAlert!()
            return
        }
        if (isEditing) {
            editJob!()
            return;
        }
        createJob!()
    }

    const handleJobInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        handleChange!({name: e.target.name, value: e.target.value})
    }

    return (
        <Wrapper>
            <form className={"form"} onSubmit={handleSubmit}>
                <h3>{isEditing ? 'edit job': 'add job'}</h3>
                {showAlert && <Alert/>}
                <div className="form-center">
                    <FormRow
                        type={"text"}
                        name={"position"}
                        value={position}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type={"text"}
                        name={"company"}
                        value={company}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type={"text"}
                        name={"jobLocation"}
                        labelText={"Job Location"}
                        value={jobLocation!}
                        handleChange={handleJobInput}
                    />
                    <FormRowSelect
                        name={'jobType'}
                        labelText={"Job Type"}
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    <FormRowSelect
                        name={'status'}
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />
                    <div className="btn-container">
                        <button className="btn btn-block" type={"submit"} disabled={isLoading}>
                            {isLoading ? "Please Wait...." : "Submit"}
                        </button>
                        <button className="btn btn-block clear-btn" onClick={(e) => {
                            e.preventDefault()
                            clearValues!()
                        }}>
                            Clear
                        </button>
                    </div>

                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;