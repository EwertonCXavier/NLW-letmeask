import React, {useState} from 'react';

export function Button(){
    const [counter, setCounter] = useState(0);

    function handleClick() {
        setCounter(counter+1);
        console.log(counter);
    }
    return (
        <button onClick={handleClick}>{counter}</button>
    )
}