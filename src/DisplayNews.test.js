import React from 'react';
import { render } from '@testing-library/react';
import DisplayNews from './DisplayNews';

test('Renders with a cardsContainer', () => {
    const { container  } = render(<DisplayNews />);
    const cardsContainer = container.querySelector('.cardsContainer');
    expect(cardsContainer).not.toBe(null);
});
