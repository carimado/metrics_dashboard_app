import './TableInput.css';
import { TextField } from '@mui/material';

import { collection, doc, addDoc, setDoc, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from './firebase-config';

export default function TableInput({session, onSaveComplete}) {
    const [ numberOfOnboardings, setNumberOfOnboardings ] = useState('');

    // NOTE: Input from form, then converts to number, document is written to the collection
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

            onSaveComplete()
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
                <input type={'text'} placeholder={'# Customers Remaining'} value={numberOfOnboardings} onChange={handleInputChange}/>
                <button className='submit' onClick={handleSubmitTableInput}>Submit</button>
            </form>
      </div>
    )
}