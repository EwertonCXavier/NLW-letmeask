import React, {useState} from 'react';
import {ButtonHTMLAttributes} from 'react'

import '../styles/button.scss';

type ButtonProps =  ButtonHTMLAttributes<HTMLButtonElement> //Define as proprioedades do meu botão como globais do react, sem precisar redeclarar


export function Button(props: ButtonProps){
    // const [counter, setCounter] = useState(0);

    // function handleClick() {
    //     setCounter(counter+1);
    //     console.log(counter);
    // }
    return (
        <button className="button" {...props} />
    )
}