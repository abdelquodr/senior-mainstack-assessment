import { TableHeader } from './components'
import { render, screen } from '@testing-library/react'

describe('TableHeader', () => {

  // Renders a div with class 'flex justify-between align-middle items-center border-b border-gray-200 pb-4 my-10'
  it('should render a div with the correct class', () => {
    const { getByRole } = render(<TableHeader transactions={null} desc={null} openDrawer={null} />);
    const divElement = getByRole('list');
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass('flex justify-between align-middle items-center border-b border-gray-200 pb-4 my-10');
  });

  // Renders a h5 element with class 'text-grey-solid text-2xl font-bold' and text equal to 'transactions' prop
  it('should render an h5 element with the correct class and text', () => {
    const transactions = 'Test Transactions';
    const {getByText} = render(<TableHeader transactions={transactions} desc={null} openDrawer={null} />);
    const h5Element = getByText(transactions);
    expect(h5Element).toBeInTheDocument();
    expect(h5Element).toHaveClass('text-grey-solid text-2xl font-bold');
    expect(h5Element).toHaveTextContent(transactions);
  });

  // Renders a p element with class 'text-grey-soft text-xs' and text equal to 'desc' prop
  it('should render a p element with the correct class and text', () => {
    const desc = 'Test Description';
    const {getByText} = render(<TableHeader transactions={null} desc={desc} openDrawer={null} />);
    const pElement = getByText(desc);
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveClass('text-grey-soft text-xs');
    expect(pElement).toHaveTextContent(desc);
  });

});