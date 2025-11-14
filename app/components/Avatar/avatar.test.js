import { Avatar } from './components'
import { render } from '@testing-library/react';

describe('Avatar', () => {

  // Returns a div element with classnames based on the size prop
  it('should return a div element with classnames based on the size prop when size prop is provided', () => {
    // Arrange
    const size = 10;

    // Act
    const { container } = render(<Avatar size={size} />);
    const divElement = container.firstChild;

    // Assert
    expect(divElement).toHaveClass(`w-${size}`);
    expect(divElement).toHaveClass(`h-${size}`);
    expect(divElement).toHaveClass('rounded-full');
    expect(divElement).toHaveClass('linear-bg');
  });

  // Returns a p element with text 'OJ' inside the div element
  it('should return a p element with text \'OJ\' inside the div element', () => {
    // Arrange
    const size = 10;

    // Act
    const { container } = render(<Avatar size={size} />);
    const pElement = container.querySelector('p');

    // Assert
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveTextContent('OJ');
  });

  // Text inside the p element is centered
  it('should center the text inside the p element', () => {
    // Arrange
    const size = 10;

    // Act
    const { container } = render(<Avatar size={size} />);
    const pElement = container.querySelector('p');

    // Assert
    expect(pElement).toHaveClass('text-center');
  });


  // Size prop is not a number, returns an error
  it('should throw an error when size prop is not a number', () => {
    // Arrange & Act & Assert
    expect(() => render(<Avatar size='large' />)).toThrowError('Invalid size prop. Size must be a number');
  });
});

 
