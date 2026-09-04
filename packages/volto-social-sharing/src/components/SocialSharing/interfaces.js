/**
 * Index file for interfaces.
 * @module components/SocialSharing/interfaces
 */


import PropTypes from 'prop-types';

// SocialSharing interfaces
export const SOCIAL_INTERFACE = {
  // Name of the social network
  name: PropTypes.string.isRequired,
  // FontAwesome icon name as an array, e.g., ['fab', 'facebook-f']
  fa_name: PropTypes.array.isRequired,
  // Color of the social network button
  color: PropTypes.string.isRequired,
  // URL used for sharing content on the social network
  sharing_url: PropTypes.string.isRequired,
  // Optional: If true, the social network button will only be displayed on mobile devices
  only_mobile: PropTypes.bool,
  // Optional: Unique identifier for the social network button
  id: PropTypes.string,
};

// Logo size interface
export const LOGO_SIZE_INTERFACE = PropTypes.oneOf(['lg', 'xs', '6x']);
