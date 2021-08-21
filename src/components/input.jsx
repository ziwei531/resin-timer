import React, { useState } from 'react';
import moment from 'moment';

let isInputted = false;
let triggered = undefined;

export default function Input() {

    const [resinInputted, setResinInputted] = useState(0);
    const [Resin, setResin] = useState(resinInputted);
    const [refill, setRefill] = useState("");

    // console.log(m.format('LTS')) // 2:48:10 PM <- looks something like this

    
    function calculate() {
        
        let m = moment();
        const resin_cap = 160;
        let toBeRegenerated = resin_cap - resinInputted;
        let totalWaitTime = toBeRegenerated * 8;
        let result = m.add(totalWaitTime, 'minutes').format('LT');
        setRefill(result);

        // console.log("This is the resin inside the setinterval " + Resin);
        
        m = moment();
    }

    
    function countDown() {
        let i = 0; //i've put an i variable here so that the first time the interval triggers, it won't increment the resin counter immediately. 

        if (!triggered) {
            const resin_cap = 160;
            const toBeRegenerated = resin_cap - Resin;
            const totalWaitTime = toBeRegenerated * 8;
    
            let currentTime = moment();
            let futureTime = moment().add(totalWaitTime, 'minutes');
            let diffTime = futureTime - currentTime;
            let duration = moment.duration(diffTime, 'milliseconds');

            // console.log(duration)
            triggered = setInterval(() => {
                let countdown = document.querySelector('.countdown');
                
                if (Resin === 160) {
                    clearInterval(triggered);
                    triggered = undefined;
                    alert('Your Resin is fully replenished!');
                }
                else if (duration % 480000 === 0 && i > 0) {
                    if (Resin < 160) {
                        setResin(prevResin => prevResin + 1); //480000 = 8 minutes
                    }
                }

                duration = moment.duration(duration - 1000, 'milliseconds');
                countdown.innerText = duration.hours() + "h " + duration.minutes() + "m " + duration.seconds() + "s";

                i++
                
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
        let till20 = 20 - input; //what is the amount of resin needed to reach 20, 30, 40, 60
        let till30 = 30 - input;
        let till40 = 40 - input;
        let till60 = 60 - input; 

        let time20 = till20 * 8; //total minutes in order to wait until it reaches 20, 30, 40, 60
        let time30 = till30 * 8;
        let time40 = till40 * 8;
        let time60 = till60 * 8;

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

    }

    function handleChange(event) {
        let newValue = parseInt(event.target.value);
        setResinInputted(newValue);
    }

    function handleClick() {
        if (isNaN(resinInputted) === true || resinInputted < 0 || resinInputted >= 160 || resinInputted === "") {
            alert("Please enter a value that is not lesser than 0 or greater/equal to 160");
        } 
        else {
            isInputted = true;
            calculate();
            setResin(resinInputted);    
            calculateWhen(resinInputted);
        }
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
                            {countDown()}

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
