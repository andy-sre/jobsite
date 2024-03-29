import {formInterface} from "../interfaces/interfaces";

const FormRow = ({type, name, value, handleChange, labelText}: formInterface) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className={"form-label"}>{labelText || name}</label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={handleChange}
                className={"form-input"}/>
        </div>
    );
};

export default FormRow;