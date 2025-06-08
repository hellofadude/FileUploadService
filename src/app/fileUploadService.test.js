/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

// Ensure jsdom is available for the test environment
if (typeof window === 'undefined' || typeof document === 'undefined') {
  throw new Error('jsdom environment is not available. Make sure Jest is configured to use jsdom.');
}


import React from 'react';
import { render, screen } from '@testing-library/react';
import Fileupload from './fileUploadService';
import { Alike_Angular } from 'next/font/google';

// Removed global 'dom' variable to avoid conflicts with jsdom or testing-library
// Mock handleUpload function
jest.mock('./handleUpload', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve('Mocked Report')),
}));

// Mock useActionState from react
jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useActionState: jest.fn(),
  };
});

describe('Fileupload', () => {
    beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders file input and upload button', () => {
    require('react').useActionState.mockReturnValue(['', jest.fn(), false]);
    const { getByText, getByLabelText } = render(<Fileupload />);
    expect(getByText('File to parse:')).toBeInTheDocument();
    expect(getByLabelText('File to parse:')).toBeInTheDocument();
    expect(getByText('Upload')).toBeInTheDocument();
  });

  it('shows loading when isPending is true', () => {
    require('react').useActionState.mockReturnValue(['', jest.fn(), true]);
    render(<Fileupload />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('shows report when state is not empty', () => {
    require('react').useActionState.mockReturnValue(['Test Report', jest.fn(), false]);
    render(<Fileupload />);
    // Check for the heading "Report"
    expect(screen.getByRole('heading', { name: /Report/i })).toBeInTheDocument();
    expect(screen.getByText(/Test Report/i)).toBeInTheDocument();
  });

  it('does not show report when state is empty', () => {
    require('react').useActionState.mockReturnValue(['', jest.fn(), false]);
    render(<Fileupload />);
    expect(screen.queryByText(/Report/i)).not.toBeInTheDocument();
  });
});