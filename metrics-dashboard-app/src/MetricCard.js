// import Card from '@mui/material/Card';
import './MetricCard.css';

export default function MetricCard(props) {
    return (
        <div className="metric-card-container">
            <div className="card-contents">
                <h2>{props.title}</h2>
                <h1>{props.totalOnboardings}</h1>
            </div>
        </div>
    )
}