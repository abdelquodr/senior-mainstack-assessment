import { Input } from './components'
import { render, screen, fireEvent } from '@testing-library/react';
import { AppStateProvider } from '@/app/State/AppState';


describe('Input', () => {

  // Renders the component without errors
  it('should render the component without errors', () => {
    const {queryByText} = render(<Input />);
    expect(queryByText('header')).toBeNull();
    expect(queryByText('label')).toBeNull();
  });

  // Renders correctly when no labels are passed as props
  it('should render correctly when no labels are passed as props', () => {
    const { container } =  render(<Input />);
    const childElements = container.querySelectorAll('.checkbox-label'); 
    expect(childElements.length ).toBe(0);
  });



  it('should show the input field with the selected checkbox values', () => {
    const labels = ['Label 1', 'Label 2'];
    const checkedValue = ['Label 1'];
  
    render(
      <AppStateProvider>
        <Input labels={labels} />
      </AppStateProvider>
    );
    
    // Find the checkbox input elements by their role
    const checkboxes = labels.map(label => screen.getByText(label));
    
    // Find the input element by its role
    const input = screen.getByRole('textbox');
    
    // Simulate checking the checkboxes
    checkboxes.forEach(checkbox => {
      if (checkedValue.includes(checkbox.name)) {
        fireEvent.click(checkbox);
        expect(input).toHaveValue('Label 1');
      }
    });
    
    expect(input).toHaveValue('');
  });

});



