import PropTypes from 'prop-types';
import { SOCIAL_INTERFACE, LOGO_SIZE_INTERFACE } from './interfaces';

const validateSocialElement = (value) =>
  PropTypes.checkPropTypes(SOCIAL_INTERFACE, value, 'prop', 'SocialSharing');

const validateLogoSize = (value) =>
  PropTypes.checkPropTypes(
    { logoSize: LOGO_SIZE_INTERFACE },
    { logoSize: value },
    'prop',
    'SocialSharing',
  );

describe('SocialSharing interfaces', () => {
  let consoleError;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('accepts a valid social element', () => {
    validateSocialElement({
      name: 'Twitter',
      fa_name: ['fab', 'twitter'],
      color: '#00acee',
      sharing_url: 'https://twitter.com/intent/tweet?url=',
      only_mobile: true,
      id: 'tw',
    });

    expect(consoleError).not.toHaveBeenCalled();
  });

  it('requires the social element fields', () => {
    validateSocialElement({});

    expect(consoleError).toHaveBeenCalledTimes(4);
    expect(consoleError.mock.calls.map(([message]) => message)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('The prop `name` is marked as required'),
        expect.stringContaining('The prop `fa_name` is marked as required'),
        expect.stringContaining('The prop `color` is marked as required'),
        expect.stringContaining('The prop `sharing_url` is marked as required'),
      ]),
    );
  });

  it('validates optional social element fields', () => {
    validateSocialElement({
      name: 'Twitter',
      fa_name: ['fab', 'twitter'],
      color: '#00acee',
      sharing_url: 'https://twitter.com/intent/tweet?url=',
      only_mobile: 'true',
      id: 123,
    });

    expect(consoleError).toHaveBeenCalledTimes(2);
    expect(consoleError.mock.calls.map(([message]) => message)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Invalid prop `only_mobile`'),
        expect.stringContaining('Invalid prop `id`'),
      ]),
    );
  });

  it.each(['lg', 'xs', '6x'])('accepts logo size %s', (logoSize) => {
    validateLogoSize(logoSize);

    expect(consoleError).not.toHaveBeenCalled();
  });

  it('rejects unsupported logo sizes', () => {
    validateLogoSize('2x');

    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(consoleError.mock.calls[0][0]).toEqual(
      expect.stringContaining('Invalid prop `logoSize`'),
    );
  });
});
