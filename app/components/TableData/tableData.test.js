import { TableData } from './components'
import { render, screen } from '@testing-library/react'


describe('TableData', () => {

  // Renders a div element with role 'table data'
  it('should render a div element with role "table data"', () => {
    const { getByRole } = render(<TableData />);
    const tableDataElement = getByRole('listitem');
    expect(tableDataElement).toBeInTheDocument();
  });

  // Image component width attribute is null
  it('should have null width attribute for Image component', () => {
    const { getByAltText } = render(<TableData />);
    const imageElement = getByAltText('call_received');
    expect(imageElement.width).toBe(30);
  });

  // Image component height attribute is null
  it('should have null height attribute for Image component', () => {
    render(<TableData />);
    const imageElement = screen.getByAltText('call_received');
    expect(imageElement.height).toBe(30);
  });
});
