import React, { useState } from 'react';
import moment from 'moment';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

let isInputted = false;
let triggered = undefined;

export default function Input() {

    const [resinInputted, setResinInputted] = useState("");
    const [Resin, setResin] = useState(0);
    const [refill, setRefill] = useState("");

    function handleChange(event) {
        let newValue = parseInt(event.target.value);
        setResinInputted(newValue);
    }

    function handleClick() {
        let resin = resinInputted;
        console.log(resin)
        if (isNaN(resinInputted) === true || resinInputted < 0 || resinInputted >= 160 || resinInputted === "") {
            alert("Please enter a value that is not lesser than 0 or greater/equal to 160");
        } 
        else {
            isInputted = true;
            console.log("This is the resin inputted: " + resinInputted);
            setResin(resin);
            console.log(`The Resin after calling setResin: ${Resin}` );
            calculate();
            countDown();    
            calculateWhen(resinInputted);
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
                // if (duration.minutes() % 8 === 0) {
                //    setResin(prevResin => prevResin + 1);
                // }

                //note to future self. the timer will exceed 160 and the timer will go to negatives. fix it when im free.
            }, 1000);
        } 
        else {
            clearInterval(triggered);
            triggered = undefined;
            countDown();
        }
    }

    //calculate when the user's resin reaches 20, 30, 40, or 60
    function calculateWhen(input) {
        let m = moment();

        let till20 = 20 - input; //what is the amount of resin needed to reach 20, 30, 40, 60
        let till30 = 30 - input;
        let till40 = 40 - input;
        let till60 = 60 - input; 

        let time20 = till20 * 8; //total minutes in order to wait until it reaches 20, 30, 40, 60
        let time30 = till30 * 8;
        let time40 = till40 * 8;
        let time60 = till60 * 8;

        // console.log(time60)

        let result20 = moment().add(time20, 'minutes').format('LT');
        let result30 = moment().add(time30, 'minutes').format('LT');
        let result40 = moment().add(time40, 'minutes').format('LT');
        let result60 = moment().add(time60, 'minutes').format('LT');

        if (input < 20) {
            let resultWhen = document.querySelector('.result-when');
            resultWhen.innerHTML = '<div class="col l3 m12">' +
                                    "<h4>20 Resin In: </h4>" + `<h1 class="result">${result20}</h1>` + 
                                    '</div>' +
                                    '<div class="col l3 m12">' +
                                    "<h4>30 Resin In: </h4>" + `<h1 class="result">${result30}</h1>` + 
                                    '</div>' +
                                    '<div class="col l3 m12">' +
                                    "<h4>40 Resin In: </h4>" + `<h1 class="result">${result40}</h1>` + 
                                    '</div>' +
                                    '<div class="col l3 m12">' +
                                    "<h4>60 Resin In: </h4>" + `<h1 class="result">${result60}</h1>` + 
                                    '</div>'
        }
        else if (input < 30 && input >= 20) {
            let resultWhen = document.querySelector('.result-when');
            resultWhen.innerHTML = '<div class="col l4">' +
                                    "<h4>30 Resin In: </h4>" + `<h1 class="result">${result30}</h1>` + 
                                    '</div>' +
                                    '<div class="col l4">' +
                                    "<h4>40 Resin In: </h4>" + `<h1 class="result">${result40}</h1>` + 
                                    '</div>' +
                                    '<div class="col l4">' +
                                    "<h4>60 Resin In: </h4>" + `<h1 class="result">${result60}</h1>` + 
                                    "</div>"
        }
        else if (input < 40 && input >= 30) {
            let resultWhen = document.querySelector('.result-when');
            resultWhen.innerHTML = '<div class="col l6 m12">' +
                                    "<h4>40 Resin In: </h4>" + `<h1 class="result">${result40}</h1>` + 
                                    '</div>' +
                                    '<div class="col l6 m12">' +
                                    "<h4>60 Resin In: </h4>" + `<h1 class="result">${result60}</h1>` + 
                                    "</div>"
        }
        else if (input < 60 && input >= 40) {
            let resultWhen = document.querySelector('.result-when');
            resultWhen.innerHTML =  "<h4>60 Resin In: </h4>" + `<h1 class="result">${result60}</h1>`     
        }
                                    
        // console.log(result20);
        // console.log(result30);
        // console.log(result40);
        // console.log(result60);

    }

    return (
        <>
            <div className="container">
                
                <div className="input-area flow-text">
                    <p>Input Your Current Resin: (0-159)</p> 
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
                    (
                        <div className="result-area center-align">

                            <h4>Current Resin: </h4>
                            <h1 className="result">{Resin}</h1>

                            <h4>Fully Regenerated In: </h4>
                            <h1 className="result countdown"></h1>
                            

                            <h4>Full Refill At: </h4>
                            <h1 className="result">{refill}</h1>

                        </div>
                    )
                }
                
                <div className="row">
                    <div className="center-align result-when"></div>
                </div>
                

            </div>
           
        </>
        
    )
}
