import { evaluate } from "mathjs";
import { useState } from "react";

// export const numbers = [0,1,2,3,4,5,6,7,8,9];

export const rows = [[7,8,9], [4,5,6], [1,2,3], [0]];
export const calcOperators = ['+','-','x','÷'];

const equalSign = '=';
const clearSign = 'C';

const getLastChar = ( str ) => (str.length ? str[str.length - 1] : '');
const isNumber = ( str ) => !isNaN(Number(str));

export const calculateExpression = ( expression ) => {
    if ( !expression || expression.length === 0 ) {
        return;
    }
    
    const mulRegex = /x/g;
    const divRegex = /÷/g;
    const divideByZero = /\/0/g;

    let toEvaluate = expression.replace(mulRegex, "*").replace(divRegex, "/");

    try {
        if ( divideByZero.test(toEvaluate) ) {
            throw new Error('No se puede dividir por 0');
        }

        const lastCharacterIsNumber = isNumber(getLastChar(toEvaluate));

        if (!lastCharacterIsNumber) {
            toEvaluate = toEvaluate.slice(0, -1);
        }

        const result = evaluate(toEvaluate);
        return result;
    } catch (error) {
        console.log(error);
        return undefined;
    }

    
}

export const Calculadora = () => {

    const [inputValue, setInputValue] = useState('');
    
    const handleClick = (number) => {
        setInputValue(prev => prev + number);
    };

    const calculate = () => {
        const results = calculateExpression(inputValue);
        console.log(results);
        setInputValue(results);
    }

    const clearExpression = () => setInputValue('');

    return (
    <>
        <section className="calculator">
        <h1>Calculadora</h1>
        <input 
        placeholder="Calculo"
        value={inputValue}
        readOnly
        />
        <div className="calculator-container">
            <div role='grid'>
            {
            rows.map((row, index) => {
                return <div key={index} role='row'>
                    { index === 3 && <button onClick={ clearExpression }>{ clearSign }</button> }
                    { 
                        row.map(number => (
                            <button 
                            key={number}
                            onClick={ () => handleClick(number) }
                            >{ number.toString() }</button>
                        ))
                    }
                    {
                        index === 3 && <button onClick={ calculate }>{ equalSign }</button>
                    }
                </div>
            })}
            </div>

            <div className="calculator-operators">
            {
                calcOperators.map((operator) => (
                    <button key={operator} onClick={ () => handleClick(operator) }>{ operator.toString() }</button>
                ))
            }
            </div>

            </div>
        </section>
    </>
    )
}