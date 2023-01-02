import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Calculadora } from './Calculadora';

describe('Calculadora', () => {

   const numbers = [0,1,2,3,4,5,6,7,8,9];

   afterEach(cleanup);
    
   it('should render the calculator component', () => {
    render(<Calculadora />)
   }); 

   
   it('should render inside the component the Calculadora title', () => {
       // Arrange
       render(<Calculadora />);
       //    Act and Assert
        screen.getByText('Calculadora');
   });

   it('should have the number from 0 to 9', () => {
    
    // Arramnge
    render(<Calculadora />)
    
    // Act and assert
    numbers.forEach(number => {
        screen.getByText(number)
    });
   });

   it('should have four rows of numbers', () => {
    // Arrange
    render(<Calculadora />)
    
    // Act
    const nodes = screen.getAllByRole('row');

    // Assert
    expect(nodes).toHaveLength(4);
   });

   it('should render an input', () => {
    render(<Calculadora />);

    screen.getByRole('textbox');
   });

   it('should show me the numbers that have clicked', () => {
    render(<Calculadora />);
    const result = '0123456789';

    const numbers_nodes = numbers.map( number => {
        return screen.getByText(number);
    });

    numbers_nodes.forEach(node => {
        fireEvent.click(node);
    });;

    const input = screen.getByRole('textbox');

    expect(input.value).toBe(result);
   });

    // - 4. Debe contener el simbolo del igual
    it('should shows the equal sign', () => {
        render(<Calculadora />);
        const equalSign = '=';
        expect(screen.getByText(equalSign));
    });

    // - 8. Debe permitir borrar el resultado obtenido / Listo
    it('should shows the clear sign', () => {
        render(<Calculadora />);
        const clearSign = 'C';
        expect(screen.getByText(clearSign));
    });

    // - 8. Debe mostrar signos de operaciones
   it('should shows calculation operators', () => {
    render(<Calculadora />);
    const calcOperators = ['+','-','x','÷'];

    calcOperators.forEach((operator) => {
        expect(screen.getByText(operator.toString()))
    });
   });

   it('should displays number and sign inputs', async () => {
    render(<Calculadora />);
    const one = screen.getByText('1');
    const two = screen.getByText('2');
    const plus = screen.getByText('+');


    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);

    const result = await screen.getByRole('textbox');
    expect(result.value).toBe('1+2')
   });

   it('Should displays multiples number and sign inputs', async () => {
    render(<Calculadora />);
    const one = screen.getByText('1');
    const two = screen.getByText('2');
    const three = screen.getByText('3');
    const five = screen.getByText('5');
    const divide = screen.getByText('÷');
    const mul = screen.getByText('x');
    const minus = screen.getByText('-');

    fireEvent.click(two);
    fireEvent.click(mul);
    fireEvent.click(three);
    fireEvent.click(minus);
    fireEvent.click(one);
    fireEvent.click(divide);
    fireEvent.click(five);

    const result = await screen.getByRole('textbox');
    expect(result.value).toBe('2x3-1÷5');
   });

   it('Should clear the input clicked the clear sign button', async () => {
    render(<Calculadora />);
    
    const one = screen.getByText('1');
    const plus = screen.getByText('+');

    const clearSign = screen.getByText('C');
    
    fireEvent.click(one);
    fireEvent.click(plus);
    
    fireEvent.click(clearSign);
    
    const result = await screen.getByRole('textbox');
    expect(result.value).toBe('');
   });

   it('Should execute the operations between numbers and signs introduce by user inputs', async () => {
    render(<Calculadora />);

    const one = screen.getByText('1');
    const two = screen.getByText('2');
    const plus = screen.getByText('+');
    const equal = screen.getByText('=');

    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);
    fireEvent.click(equal);

    const result = await screen.getByRole('textbox');

    expect(result.value).toBe('3');

   });

   it('Should execute the operations between numbers and signs introduce by multiples user inputs', async () => {
    render(<Calculadora />);

    const one = screen.getByText('1');
    const two = screen.getByText('2');
    const three = screen.getByText('3');
    const five = screen.getByText('5');

    const plus = screen.getByText('+');
    const mul = screen.getByText('x');
    const divide = screen.getByText('÷');
    const minus = screen.getByText('-');

    const equal = screen.getByText('=');

    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);
    fireEvent.click(mul);
    fireEvent.click(three);
    fireEvent.click(minus);
    fireEvent.click(five);
    fireEvent.click(divide);
    fireEvent.click(two);
    fireEvent.click(equal); // 2

    const result = await screen.getByRole('textbox');

    expect(result.value).toBe('4.5');

   });

});