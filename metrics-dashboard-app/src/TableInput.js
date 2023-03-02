import './TableInput.css';
import { TextField } from '@mui/material';

import { collection, doc, addDoc, setDoc, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from './firebase-config';

export default function TableInput({session}) {
    const [ numberOfOnboardings, setNumberOfOnboardings ] = useState('');


    const handleSubmitTableInput = async (e) => {
        e.preventDefault()
        
        const onboardingNumber = Number(numberOfOnboardings)
        if (!isNaN(onboardingNumber)) {

            const docRef = await addDoc(collection(db, 'numberOfOnboardings'), {
                email: session,
                date: Timestamp.fromDate(new Date()),
                onboardingRemaining: onboardingNumber
            })
            console.log("Document written with ID: ", docRef);

            setNumberOfOnboardings('')

        } else {
            alert('Please enter a number')
        }
    }


    const handleInputChange = (e) => {
        setNumberOfOnboardings(e.target.value)
    }

    return (
        <div>
            <form>
                {/* <TextField
                className='table-input'
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    size="small" /> */}
                <input type={'text'} placeholder={'# Customers Remaining'} value={numberOfOnboardings} onChange={handleInputChange}/>
                <button className='submit' onClick={handleSubmitTableInput}>Submit</button>
            </form>
      </div>
    )
}