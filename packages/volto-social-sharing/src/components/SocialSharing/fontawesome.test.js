const mockAdd = jest.fn();
const mockFas = { prefix: 'fas' };
const mockFab = { prefix: 'fab' };

jest.mock('@fortawesome/fontawesome-svg-core', () => ({
  library: { add: mockAdd },
}));

jest.mock('@fortawesome/free-solid-svg-icons', () => ({ fas: mockFas }));
jest.mock('@fortawesome/free-brands-svg-icons', () => ({ fab: mockFab }));

describe('fontawesome setup', () => {
  beforeEach(() => {
    mockAdd.mockClear();
    jest.resetModules();
  });

  it('adds solid and brand icon sets to the Font Awesome library', () => {
    require('./fontawesome');

    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith(mockFas, mockFab);
  });
});
