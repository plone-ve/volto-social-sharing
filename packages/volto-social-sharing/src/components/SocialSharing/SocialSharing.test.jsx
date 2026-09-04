import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import SocialSharing from './SocialSharing';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid="font-awesome-icon" />,
}));

jest.mock(
  '@plone/volto/helpers/Url/Url',
  () => ({
    isCmsUi: () => false,
  }),
  { virtual: true },
);
jest.mock('./SocialSharing.css', () => ({}), { virtual: true });

const socialElements = [
  {
    name: 'Twitter',
    fa_name: ['fab', 'twitter'],
    color: '#00acee',
    sharing_url: 'https://twitter.com/intent/tweet?url=',
    id: 'tw',
  },
  {
    name: 'Telegram',
    fa_name: ['fab', 'telegram-plane'],
    color: '#0088cc',
    sharing_url: 'https://t.me/share/url?url=',
    only_mobile: true,
    id: 'tg',
  },
  {
    name: 'WhatsApp',
    fa_name: ['fab', 'whatsapp'],
    color: '#00bb2d',
    sharing_url: 'whatsapp://send?text=',
    only_mobile: true,
    id: 'wa',
  },
];

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <SocialSharing socialElements={socialElements} {...props} />
    </IntlProvider>,
  );

describe('SocialSharing', () => {
  beforeEach(() => {
    window.innerWidth = 1024;
  });

  it('renders non-mobile networks on desktop', async () => {
    renderComponent();

    expect(await screen.findByTitle('Send to Twitter')).toBeTruthy();
    expect(screen.queryByTitle('Send to Telegram')).toBeNull();
    expect(screen.queryByTitle('Send to WhatsApp')).toBeNull();
  });

  it('renders mobile-only networks on mobile', async () => {
    window.innerWidth = 375;
    renderComponent();

    expect(await screen.findByTitle('Send to Twitter')).toBeTruthy();
    expect(screen.getByTitle('Send to Telegram')).toBeTruthy();
    expect(screen.getByTitle('Send to WhatsApp')).toBeTruthy();
  });

  it('builds mobile sharing URLs from only_mobile', async () => {
    window.innerWidth = 375;
    renderComponent();

    expect(
      (await screen.findByTitle('Send to Telegram'))
        .closest('a')
        .getAttribute('href'),
    ).toEqual(expect.stringContaining('tg://msg_url'));
    expect(
      screen.getByTitle('Send to WhatsApp').closest('a').getAttribute('href'),
    ).toEqual(expect.stringContaining('whatsapp://send'));
  });

  it('uses the host getSharingUrl override', async () => {
    const getSharingUrl = jest.fn((social) =>
      social.id === 'tw' ? 'https://example.com/custom-share' : undefined,
    );

    renderComponent({ getSharingUrl });

    expect(
      (await screen.findByTitle('Send to Twitter')).getAttribute('href'),
    ).toBe('https://example.com/custom-share');
    expect(getSharingUrl).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'tw' }),
      expect.any(String),
      'Checkout this publication',
    );
  });
});
