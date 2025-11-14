import React from 'react';
import { Button } from './components'
import { render, screen } from '@testing-library/react';


describe('Button', () => {

  // Button renders with label and default style
  it('should render button with label and default style', () => {
    // Arrange
    const label = 'Submit';
    const className = '';
    const type = '';

    // Act
    render(<Button label={label} className={className} type={type} />);

    // Assert
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveClass('text-grey-soft text-xs');
  });


  // Button renders with icon and label
  it('should render button with icon and label', () => {
    // Arrange
    const icon = 'submit';
    const label = 'Submit';
    const className = '';
    const type = '';

    // Act
    render(<Button icon={icon} label={label} className={className} type={type} />);

    // Assert
    const button = screen.getByRole('button');
    const imgElement = screen.getByRole('img', { alt: icon });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(imgElement).toBeInTheDocument();
  });

  
  // Button renders with solid style
  it('should render button with solid style', () => {
    // Arrange
    const label = 'Submit';
    const className = '';
    const type = 'solid';

    // Act
    render(<Button label={label} className={className} type={type} />);

    // Assert
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveClass('bg-grey-solid text-white');
  });


   // Button renders with oulined style
   it('should render button with outlined style', () => {
    // Arrange
    const label = 'Submit';
    const className = '';
    const type = 'outlined';

    // Act
    render(<Button label={label} className={className} type={type} />);

    // Assert
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveClass('border border-grey-light text-grey-solid');
  });


  // Button throws error if both icon and label are null
  it('should throw error if both icon and label are null', () => {
    // Arrange
    const icon = null;
    const label = null;
    const className = '';
    const type = '';

    // Act & Assert
    expect(() => render(<Button icon={icon} label={label} className={className} type={type} />)).toThrowError('Both icon and label cannot be null');
  });


  // Button renders with custom className
  it('should render button with custom className', () => {
    // Arrange
    const label = 'Submit';
    const className = 'custom-button';
    const type = '';

    // Act
    render(<Button label={label} className={className} type={type} />);

    // Assert
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveClass(className);
  });


  // Button renders with custom type
  it('should render button with custom type', () => {
    // Arrange
    const label = 'Submit';
    const className = '';
    const type = 'outlined';

    // Act
    render(<Button label={label} className={className} type={type} />);

    // Assert
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveClass('border');
  });

})


