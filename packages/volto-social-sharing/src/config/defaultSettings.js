// Default social sharing settings
export const DEFAULT_SOCIAL = [
  {
    name: 'Facebook',
    fa_name: ['fab', 'facebook-f'],
    color: '#3b5998',
    // https://facebook.com/sharer.php?u={url}
    sharing_url: 'https://facebook.com/sharer.php?u=',
    id: 'fb',
  },
  {
    name: 'X',
    fa_name: ['fab', 'x-twitter'],
    color: '#000000',
    // https://x.com/intent/post?url={url}&text={text}
    sharing_url: 'https://x.com/intent/post?url=',
    id: 'xt',
  },
  {
    name: 'Telegram',
    fa_name: ['fab', 'telegram-plane'],
    color: '#0088cc',
    // tg://msg?text={text} or tg://msg_url?url={url}&text={text}
    sharing_url: 'https://t.me/share/url?url=',
    only_mobile: true,
    id: 'tg',
  },
  {
    name: 'WhatsApp',
    fa_name: ['fab', 'whatsapp'],
    color: '#00bb2d',
    // whatsapp://send?text={text}, https://wa.me/?text={text} or https://web.whatsapp.com/send?text={text}
    sharing_url: 'whatsapp://send?text=',
    only_mobile: true,
    id: 'wa',
  },
];

// Default positions for the social sharing buttons on desktop and mobile devices
export const DEFAULT_POSITIONS = {
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
};

// Default size for the social sharing logos
// OPTIONS:  "lg" | "xs" | "sm" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x"
export const DEFAULT_LOGO_SIZE = 'lg';

// Default size for the social sharing buttons
export const DEFAULT_BUTTON_SIZE = '30px';
