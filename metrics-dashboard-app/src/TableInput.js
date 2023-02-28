import { collection, doc, addDoc, setDoc, Timestamp } from "firebase/firestore"
import { useState } from "react"
import { db } from './firebase-config';

export default function TableInput({session}) {
    // const [email, setEmail] = useState(null)
    // const [ week, setWeek ] = useState('')
    const [ numberOfOnboardings, setNumberOfOnboardings ] = useState(null)

    const handleSubmitTableInput = (e) => {
        e.preventDefault()

        const docRef = addDoc(collection(db, 'numberOfOnboardings'), {
            email: session,
            date: Timestamp.fromDate(new Date()),
            // week: week,
            onboardingRemaining: numberOfOnboardings
        })
        console.log("Document written with ID: ", docRef);
    }

    return (
        <div>
            <form onClick={handleSubmitTableInput}>
                {/* <input type={'text'} placeholder={'Email'} value={session} onChange={(e) => setEmail(e.target.value)}/> */}
                {/* <input type={'text'} placeholder={'Week'} onChange={(e) => setWeek(e.target.value)}/> */}
                <input type={'text'} placeholder={'Number of Onboardings'} onChange={(e) => setNumberOfOnboardings(e.target.value)}/>
            <button>Submit</button>
        </form>
        {/* <div id='clarence-9'>

        </div> */}
      </div>
    )
}