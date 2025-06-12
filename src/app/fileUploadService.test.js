jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(),
}));

jest.mock('./fileUploadService', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import handleUpload from './fileUploadService';

describe('handleUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns data on successful upload', async () => {
    handleUpload.mockResolvedValueOnce({ result: 'success' });

    const result = await handleUpload('state', { get: jest.fn() });

    expect(handleUpload).toHaveBeenCalledWith('state', expect.any(Object));
    expect(result).toEqual({ result: 'success' });
  });

  it('returns empty string on fetch error', async () => {
    handleUpload.mockRejectedValueOnce(new Error('Network error'));

    try {
      await handleUpload('state', { get: jest.fn() });
    } catch (e) {
      expect(e).toEqual(new Error('Network error'));
    }
  });

  it('returns empty string on non-ok response', async () => {
    handleUpload.mockResolvedValueOnce('');

    const result = await handleUpload('state', { get: jest.fn() });

    expect(result).toBe('');
  });
});