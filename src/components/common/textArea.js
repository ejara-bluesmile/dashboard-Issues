import React from "react";

const TextArea = ({ name, error, ...rest }) => {
    return (
        <div className="form-group">
            <textarea
                {...rest}
                name={name}
                id={name}
                className="form-control text-area"               
                rows="3"
                placeholder={name}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};
export default TextArea;