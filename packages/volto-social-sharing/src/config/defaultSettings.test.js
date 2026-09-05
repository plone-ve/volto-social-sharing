import {
  DEFAULT_BUTTON_SIZE,
  DEFAULT_LOGO_SIZE,
  DEFAULT_POSITIONS,
  DEFAULT_SOCIAL,
} from './defaultSettings';

describe('default social sharing settings', () => {
  it('defines the default social networks', () => {
    expect(DEFAULT_SOCIAL).toHaveLength(4);
    expect(DEFAULT_SOCIAL).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'fb',
          name: 'Facebook',
          fa_name: ['fab', 'facebook-f'],
        }),
        expect.objectContaining({
          id: 'xt',
          name: 'X',
          fa_name: ['fab', 'x-twitter'],
        }),
        expect.objectContaining({
          id: 'tg',
          name: 'Telegram',
          only_mobile: true,
        }),
        expect.objectContaining({
          id: 'wa',
          name: 'WhatsApp',
          only_mobile: true,
        }),
      ]),
    );
  });

  it('defines sharing URLs for every social network', () => {
    DEFAULT_SOCIAL.forEach((social) => {
      expect(social.sharing_url).toEqual(expect.any(String));
      expect(social.sharing_url.length).toBeGreaterThan(0);
    });
  });

  it('defines desktop and mobile banner positions', () => {
    expect(DEFAULT_POSITIONS).toEqual({
      desktop: {
        position: 'fixed',
        right: '0',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
      },
      mobile: {
        position: 'fixed',
        left: '50%',
        bottom: '-23px',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        zIndex: '9999',
      },
    });
  });

  it('defines the default logo and button sizes', () => {
    expect(DEFAULT_LOGO_SIZE).toBe('lg');
    expect(DEFAULT_BUTTON_SIZE).toBe('30px');
  });
});
