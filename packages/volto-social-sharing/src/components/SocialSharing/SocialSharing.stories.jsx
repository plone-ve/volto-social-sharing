import SocialSharing from './SocialSharing';
import {
  DEFAULT_POSITIONS,
  DEFAULT_SOCIAL,
} from '../../config/defaultSettings';

const meta = {
  title: 'Components/SocialSharing',
  component: SocialSharing,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logoSize: {
      control: 'select',
      options: ['lg', 'xs', '6x'],
    },
    buttonSize: {
      control: 'text',
    },
    socialElements: {
      control: 'object',
    },
  },
};

export default meta;

export const Default = {
  args: {
    socialElements: DEFAULT_SOCIAL,
    bannerPosition: DEFAULT_POSITIONS,
    logoSize: 'lg',
    buttonSize: '30px',
  },
};

export const MobileOnlyNetworks = {
  args: {
    ...Default.args,
    socialElements: DEFAULT_SOCIAL.map((social) =>
      ['tg', 'wa'].includes(social.id)
        ? { ...social, only_mobile: true }
        : social,
    ),
  },
};
