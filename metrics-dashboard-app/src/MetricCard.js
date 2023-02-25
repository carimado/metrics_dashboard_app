// import Card from '@mui/material/Card';
import './MetricCard.css';

// TO DO:
// The metric card is a component that will always remain the same
// create a sub component for the card contents

export default function MetricCard(props) {
    console.log(props)

    const { active, onClick } = props;

    return (
        <div className={`metric-card ${active ? 'active' : ''}`} onClick={onClick}>
            <div className="metric-card-container">
                <div className="card-contents">
                    <h1>{props.totalOnboardings}</h1>
                </div>
            </div>
        </div>
    )
}