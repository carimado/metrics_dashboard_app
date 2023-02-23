// import Card from '@mui/material/Card';
import './MetricCard.css';

// TO DO:
// The metric card is a component that will always remain the same
// create a sub component for the card contents

export default function MetricCard( {ICParticipatedAndClosed} ) {
    console.log(ICParticipatedAndClosed)
    return (
        <div className="metric-card-container">
            <div className="card-contents">
                <h1>IC Participated and Closed</h1>
                <h2>{ICParticipatedAndClosed}</h2>

            </div>
        </div>
    )
}