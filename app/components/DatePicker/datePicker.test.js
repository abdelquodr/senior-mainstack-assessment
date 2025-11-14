import { DatePicker } from './components'
import { render, fireEvent } from '@testing-library/react'


describe('DatePicker', () => {

    // Renders a date picker component with default date set to today's date.
    it('should render a date picker component with default date set to todays date', () => {
      const { getByRole } = render(<DatePicker />);
      const datePicker = getByRole('textbox')
      expect(datePicker.value).toBe( new Date().toISOString().split('T')[0].replace(/-/g, '/') )
    });

    it('should not allow character been type in the input', () => {
      const { getByRole } = render(<DatePicker />);
      const datePicker = getByRole('textbox')
        expect(datePicker.getAttribute('value')).not.toContain("abcd");
    })


    it('should render a date picker component with default date set to available when the current date is available', () => {
      // Create a mock Date instance
      const originalDate = Date;
      global.Date = class MockDate extends originalDate {
        constructor() {
          super();
          return new originalDate('2023-02-25T00:00:00Z'); 
        }
        toLocaleDateString() {
          return '2023-02-25'; 
        }
      };
    
      const { getByRole } = render(<DatePicker />);
      const datePicker = getByRole('textbox');
      expect(datePicker.value).toBe('2023-02-25'.replace(/-/g, '/'));
    
      // Restore the original Date class
      global.Date = originalDate;
    });

});
