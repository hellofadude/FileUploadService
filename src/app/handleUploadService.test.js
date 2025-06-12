import handleUpload from './handleUpload';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

global.fetch = jest.fn();

describe('handleUpload', () => {
  let formDataMock;

  beforeEach(() => {
    formDataMock = {
      get: jest.fn().mockReturnValue('mockFile'),
    };
    global.FormData = function () {
      this.append = jest.fn();
    };
  });

  it('resets state and redirects when currentstate is not empty', async () => {
    const currentstate = 'someState';
    await handleUpload(currentstate, formDataMock);

    expect(formDataMock.get).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
    expect(require('next/navigation').redirect).toHaveBeenCalledWith('/');
  });
  

  it('calls fetch and returns report on success', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve('report content'),
    };
    fetch.mockResolvedValueOnce(mockResponse);

    const result = await handleUpload('', formDataMock);

    expect(fetch).toHaveBeenCalled();
    expect(result).toBe('report content');
  });

  it('returns empty string on fetch error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await handleUpload('', formDataMock);

    expect(result).toBe('');
  });

  it('returns empty string on non-ok response', async () => {
    const mockResponse = {
      ok: false,
      json: () => Promise.resolve({}),
    };
    fetch.mockResolvedValueOnce(mockResponse);

    const result = await handleUpload('', formDataMock);

    expect(result).toBe('');
  });
});