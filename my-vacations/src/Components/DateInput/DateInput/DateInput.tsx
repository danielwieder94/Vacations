import React from "react";


function DateInput(): JSX.Element {

    return (
        <div className="DateInput">
            <span className="datepicker-toggle">
                <span className="datepicker-toggle-button"></span>
                <input type="date" className="datepicker-input" />
            </span>
        </div>
    );
}

export default DateInput;
