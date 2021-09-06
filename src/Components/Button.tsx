import React, {useState} from 'react';
import {ButtonHTMLAttributes} from 'react'

import '../styles/button.scss';

type ButtonProps =  ButtonHTMLAttributes<HTMLButtonElement>  & {
    isOutlined?: boolean


}//Define as proprioedades do meu botão como globais do react, sem precisar redeclarar


export function Button({isOutlined = false, ...props}: ButtonProps){  // rest operator 
    // const [counter, setCounter] = useState(0);

    // function handleClick() {
    //     setCounter(counter+1);
    //     console.log(counter);
    // }
    return (
        <button
        className={`button ${isOutlined && 'outlined'}`} {...props} /> //{...props} => Pega todos os parâmetros passados na função, sem precisar reescrever
        // spread operator
    )
}