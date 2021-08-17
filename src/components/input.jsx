import React, { useState } from 'react';
import moment from 'moment';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

let isInputted = false;
let triggered = undefined;

export default function Input() {

    const [resinInputted, setResinInputted] = useState("");
    const [Resin, setResin] = useState("");
    const [refill, setRefill] = useState("");

    function handleChange(event) {
        let newValue = event.target.value;
        setResinInputted(newValue);
    }

    function handleClick() {
        if (isNaN(resinInputted) === true || resinInputted < 0 || resinInputted > 160 || resinInputted === "") {
            alert("Please enter a value that is not lesser than 0 or greater than 160");
        } 
        else {
            isInputted = true;
            setResin(resinInputted);
            calculate();
            countDown();    
        }
    }

    // console.log(m.format('LTS')) // 2:48:10 PM <- looks something like this

    function calculate() {
        let m = moment();
        let toBeRegenerated = 160 - resinInputted;
        let totalWaitTime = toBeRegenerated * 8;

        // console.log("To be regenerated: " + toBeRegenerated);
        // console.log("Total wait time: " + totalWaitTime);

        let result = m.add(totalWaitTime, 'minutes').format('LT');
        setRefill(result);

        // console.log("Time it should be refilled: " + result);

        // console.log("The m value = " + m)
        m = moment();
        
    }

    
    function countDown() {
        if (!triggered) {
            let m = moment();
            const toBeRegenerated = 160 - resinInputted;
            const totalWaitTime = toBeRegenerated * 8;
    
            let currentTime = moment();
            let futureTime = m.add(totalWaitTime, 'minutes');
            let diffTime = futureTime - currentTime;
            let duration = moment.duration(diffTime, 'milliseconds');
    
            triggered = setInterval(() => {
                let countdown = document.querySelector('.countdown');
                duration = moment.duration(duration - 1000, 'milliseconds');
    
                countdown.innerText = duration.hours() + "h " + duration.minutes() + "m " + duration.seconds() + "s";
            }, 1000);
        } 
        else {
            clearInterval(triggered);
            triggered = undefined;
            countDown();
        }
    }



    // console.log(document.querySelector('.countdown'));
    
    return (
        <>
            <div className="container">
                
                <div className="input-area flow-text">
                    <p>Input Your Current Resin: (0-160)</p> 
                </div>

                <div className="row">
                    <input 
                        className="input-number" 
                        type="number" 
                        onChange={handleChange}
                    ></input>
                </div>

                <div className="button-area">
                    <button 
                        class="btn waves-effect waves-light calculate-btn"
                        onClick={handleClick}
                    >
                    Calculate
                    </button>   
                </div>

                {
                    isInputted === true && 
                    (<div className="result-area center-align">

                        <h4>Current Resin: </h4>
                        <h1 className="result">{Resin}</h1>

                        <h4>Fully Regenerated In: </h4>
                        <h1 className="result countdown"></h1>
                        

                        <h4>Full Refill At: </h4>
                        <h1 className="result">{refill}</h1>
                    </div>)
                }
                

                
            </div>
           
        </>
        
    )
}
