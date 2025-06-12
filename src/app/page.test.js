import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';

describe('Page', () => {
  it('renders Home page', () => {
    render(<Page />);
   
     expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
  });
});