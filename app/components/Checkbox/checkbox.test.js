import { Checkbox } from './components'
import { render, fireEvent } from '@testing-library/react';


describe('Checkbox', () => {

    //  Checkbox renders correctly with default props
    it('should render checkbox with default props', () => {
      // Arrange
      const { getByText } = render(<Checkbox textLabel="Default Checkbox" getValue={() => {}} />);
  
      // Act
      const checkbox = getByText('Default Checkbox');
  
      // Assert
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    // Checkbox label is displayed correctly
    it('should display correct label for checkbox', () => {
      // Arrange
      const labelText = 'Test Label';
      const { getByText } = render(<Checkbox textLabel={labelText} getValue={() => {}} />);
  
      // Act
      const label = getByText(labelText);
  
      // Assert
      expect(label).toBeInTheDocument();
    });

    //Checkbox can be checked and unchecked
    it('should check and uncheck checkbox', () => {
      // Arrange
      const labelText = 'Test Label';
      const { getByRole } = render(<Checkbox textLabel={labelText} getValue={() => {}} />);
  
      // Act
      const checkbox = getByRole('checkbox');
      fireEvent.click(checkbox);
  
      // Assert
      expect(checkbox).toBeChecked();
  
      // Act
      fireEvent.click(checkbox);
  
      // Assert
      expect(checkbox).not.toBeChecked();
    });

    // Checkbox renders correctly with empty textLabel prop
    it('should render checkbox with empty label', () => {
      // Arrange
      const { getByRole } = render(<Checkbox textLabel="" getValue={() => {}} />);
  
      // Act
      const checkbox = getByRole('checkbox');
  
      // Assert
      expect(checkbox).toBeInTheDocument();
    });


    // Checkbox state updates correctly when checked or unchecked multiple times in quick succession
    it('should update checkbox state correctly when checked or unchecked multiple times in quick succession', () => {
      // Arrange
      const labelText = 'Test';
      const { getByRole } = render(<Checkbox textLabel={labelText} getValue={() => {}} />);
  
      // Act
      const checkbox =  getByRole('checkbox');
  
      // Assert
      expect(checkbox).not.toBeChecked();
  
      // Act
      fireEvent.click(checkbox);
  
      // Assert
      expect(checkbox).toBeChecked();
  
      // Act
      fireEvent.click(checkbox);
  
      // Assert
      expect(checkbox).not.toBeChecked();
  
      // Act
      fireEvent.click(checkbox);
  
      // Assert
      expect(checkbox).toBeChecked();
    });
});
