import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './layout';

describe('Layout', () => {
  it('renders children', () => {
    render(
      <Layout>
        <div>Test Child</div>
      </Layout>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});