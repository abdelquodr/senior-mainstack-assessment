import { NavIcon } from './components'
import { render } from '@testing-library/react'

describe('NavIcon', () => {

    // Returns a span element containing an Image element with the correct source, width, height, and alt attributes.
    it('should return a span element with the correct attributes', () => {
      // Arrange
      const icon = 'icon';
      const size = 30;

      // Act
      const { container } = render(<NavIcon icon={icon} size={size} />);
      const spanElement = container.querySelector('span');
      const imageElement = container.querySelector('img');

      // Assert
      expect(spanElement).toBeInTheDocument();
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', `../assets/${icon}.svg`);
      expect(imageElement).toHaveAttribute('width', size.toString());
      expect(imageElement).toHaveAttribute('height', size.toString());
      expect(imageElement).toHaveAttribute('alt', icon);
    });

    // Returns a span element with the correct class attribute.
    it('should return a span element with the correct class attribute', () => {
      // Arrange
      const icon = 'icon';
      const size = 30;

      // Act
      const { container } = render(<NavIcon icon={icon} size={size} />);
      const spanElement = container.querySelector('span');

      // Assert
      expect(spanElement).toBeInTheDocument();
      expect(spanElement).toHaveClass('m-auto');
    });

    // Returns a span element containing an Image element with the default size (25) when size prop is not provided.
    it('should return a span element with the default size when size prop is not provided', () => {
      // Arrange
      const icon = 'icon';

      // Act
      const { container } = render(<NavIcon icon={icon} />);
      const imageElement = container.querySelector('img');

      // Assert
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('width', '25');
      expect(imageElement).toHaveAttribute('height', '25');
    });

    // Returns a span element containing an Image element with the correct size when size prop is provided.
    it('should return a span element with the correct size when size prop is provided', () => {
      // Arrange
      const icon = 'icon';
      const size = 30;

      // Act
      const { container } = render(<NavIcon icon={icon} size={size} />);
      const imageElement = container.querySelector('img');

      // Assert
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('width', size.toString());
      expect(imageElement).toHaveAttribute('height', size.toString());
    });

    // Returns a span element containing an Image element with the correct source when icon prop is not provided.
    it('should return a span element with the correct source when icon prop is not provided', () => {
      // Arrange
      const size = 30;

      // Act
      const { container } = render(<NavIcon size={size} />);
      const imageElement = container.querySelector('img');

      // Assert
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', '../assets/undefined.svg');
    });

    // Returns a span element containing an Image element with the correct source when icon prop is provided.
    it('should return a span element with the correct source when icon prop is provided', () => {
      // Arrange
      const icon = 'icon';
      const size = 30;

      // Act
      const { container } = render(<NavIcon icon={icon} size={size} />);
      const imageElement = container.querySelector('img');

      // Assert
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', `../assets/${icon}.svg`);
    });
});
