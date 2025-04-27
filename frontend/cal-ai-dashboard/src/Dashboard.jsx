import React from "react";

function Dashboard(props) {
    return (
        <section className="summary">
            <h2>{props.calories}</h2>
            <p>Calories left</p>
            <div className="macros">
                <div><strong>{props.protein}g</strong><br />Protein left</div>
                <div><strong>{props.carbs}g</strong><br />Carbs left</div>
                <div><strong>{props.fats}g</strong><br />Fats left</div>
            </div>
        </section>
    );
}


export default Dashboard;