import { render, screen, fireEvent } from "@testing-library/react"
import Dashboard from "./Dashboard"
import MetricTable from "./Table"
import { motion } from 'framer-motion';

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
//         <Dashboard numberOfOnboardings={dummqyData}/>
//     )

//     fireEvent.click(screen.getByTestId('test-click'))

//     expect(clickHandler).toHaveBeenCalled()
// })

test("card clicks and expands", () => {
    const handleClick = jest.fn()

    render (
        <motion.div className="card" onClick={handleClick}>
            <MetricTable />
        </motion.div>
    )

    fireEvent.click(screen.getByTestId('test-click'))

    expect(handleClick).toHaveBeenCalled()
})