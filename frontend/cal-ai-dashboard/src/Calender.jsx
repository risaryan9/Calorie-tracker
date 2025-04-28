import React, { useState, useEffect } from "react";

function Calendar() {
    const now = new Date();
    const [monthState, setMonthState] = useState(now.getMonth());
    const [prevMonthState, setprevMonthState] = useState(now.getMonth() - 1);
    const [dayState, setDayState] = useState(now.getDate());
    const [daysInMonth, setDaysInMonth] = useState(0);
    
    useEffect(() => {
        const thirtyOneDays = [0, 2, 4, 6, 7, 9, 11]; // January, March, May, etc.
        const thirtyDays = [3, 5, 8, 10]; // April, June, etc.
        
        if (thirtyOneDays.includes(prevMonthState)) {
            setDaysInMonth(31);
        } else if (thirtyDays.includes(prevMonthState)) {
            setDaysInMonth(30);
        } else {
            // February - check for leap year
            const year = now.getFullYear();
            const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
            setprevMonthState(isLeapYear ? 29 : 28);
        }
    }, [monthState]);

    const getDisplayDate = (offset) => {
        const targetDate = dayState + offset;
        if (targetDate < 1) {
            // Previous month
            return targetDate + daysInMonth;
        } else if (targetDate > daysInMonth) {
            // Next month
            return targetDate - daysInMonth;
        }
        return targetDate;
    };

    return (
        <div className="calendar">
            <div className="day">F<br /><span>{getDisplayDate(-6)}</span></div>
            <div className="day">S<br /><span>{getDisplayDate(-5)}</span></div>
            <div className="day">S<br /><span>{getDisplayDate(-4)}</span></div>
            <div className="day">M<br /><span>{getDisplayDate(-3)}</span></div>
            <div className="day">T<br /><span>{getDisplayDate(-2)}</span></div>
            <div className="day active">W<br /><span>{getDisplayDate(-1)}</span></div>
            <div className="day">T<br /><span>{dayState}</span></div>
        </div>
    );
}

export default Calendar;