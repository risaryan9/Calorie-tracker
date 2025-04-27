import React from "react";

function Calendar() {
    return (
        <div className="calendar">
            <div className="day">F<br /><span>18</span></div>
            <div className="day">S<br /><span>19</span></div>
            <div className="day">S<br /><span>20</span></div>
            <div className="day">M<br /><span>21</span></div>
            <div className="day">T<br /><span>22</span></div>
            <div className="day active">W<br /><span>23</span></div>
            <div className="day">T<br /><span>24</span></div>
        </div>
    );
}

export default Calendar;