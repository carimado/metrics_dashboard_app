// import { render, screen, fireEvent } from "@testing-library/react"
// import Dashboard from "./Dashboard"
// import MetricTable from "./Table"
// import { motion } from 'framer-motion';
// import { MemoryRouter, Route } from 'react-router-dom';
// import Dashboard from './Dashboard';

// test("total metric is displayed", () => {
//     const dummyData = {
//         onboardingRemaining: 4,
//     }

//     render (
//         <Dashboard numberOfOnboardings={dummyData}/>
//     )
//     expect(screen.getByText(dummyData.onboardingRemaining)).not.toBeNull()
// })

// test("card expands", () => {

//     const dummyData = {
//         onboardingRemaining: 4,
//     }

//     const clickHandler = jest.fn()

//     render (
//         // the component
//         <Dashboard numberOfOnboardings={dummyData}/>
//     )

//     fireEvent.click(screen.getByTestId('test-click'))

//     expect(clickHandler).toHaveBeenCalled()
// })
