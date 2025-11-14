import { ReactiveImage } from './components';
import { fireEvent, render } from '@testing-library/react';

describe('ReactiveImage', () => {

    // Renders a NavIcon component with the given icon and size props
    it('should render a NavIcon component with the given icon and size props', () => {
      // Arrange
      const icon = 'exampleIcon';
      const size = 25;

      // Act
      const {getByAltText} = render(<ReactiveImage icon={icon} size={size} />);

      // Assert
      expect(getByAltText(icon)).toBeInTheDocument();
      expect(getByAltText(icon)).toHaveAttribute('src', `../assets/${icon}.svg`);
      expect(getByAltText(icon)).toHaveAttribute('width', size.toString());
      expect(getByAltText(icon)).toHaveAttribute('height', size.toString());
    });

    // Renders a div with the given className "text-center py-1 grayscale hover:grayscale-0 my-0"
    it('should render a div with the className "text-center py-1 grayscale hover:grayscale-0 my-0"', () => {
      // Arrange
      const icon = 'exampleIcon';
      const size = 25;

      // Act
      const { getByTestId } = render(<ReactiveImage icon={icon} size={size} />);

      // Assert
      expect(getByTestId('hovered-div')).toBeInTheDocument();
    });

    
    // Renders a div with the given className "absolute text-xs top-3 left-full whitespace-nowrap bg-grey-solid text-white ml-3 px-2 py-2 rounded-md" when isHovered is false
    it('should render a div with the className "absolute text-xs top-3 left-full whitespace-nowrap bg-grey-solid text-white ml-3 px-2 py-2 rounded-md" when isHovered is false', () => {
      // Arrange
      const icon = 'exampleIcon';
      const size = 25;
      const desc = 'description'

      // Act
      const {getByTestId, getByText } = render(<ReactiveImage icon={icon} size={size} desc={desc} />);
      const hoveredIcon = getByTestId('hovered-div');
      fireEvent.mouseOver(hoveredIcon)  

      // Assert
      expect(getByText(desc)).toBeInTheDocument();
    });

    // Renders a ReactiveImage component with the given icon and size props when desc prop is not provided
    it('should render a ReactiveImage component with the given icon and size props when desc prop is not provided', () => {
      // Arrange
      const icon = 'exampleIcon';
      const size = 25;

      // Act
      const {getByAltText} = render(<ReactiveImage icon={icon} size={size} />);

      // Assert
      expect(getByAltText(icon)).toBeInTheDocument();
      expect(getByAltText(icon)).toHaveAttribute('src', `../assets/${icon}.svg`);
      expect(getByAltText(icon)).toHaveAttribute('width', size.toString());
      expect(getByAltText(icon)).toHaveAttribute('height', size.toString());
    });
});
