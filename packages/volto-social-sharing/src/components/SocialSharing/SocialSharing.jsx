import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isCmsUi } from '@plone/volto/helpers/Url/Url';
import PropTypes from 'prop-types';
import {
  DEFAULT_SOCIAL,
  DEFAULT_POSITIONS,
  DEFAULT_LOGO_SIZE,
  DEFAULT_BUTTON_SIZE,
} from '../../config/defaultSettings';
import './SocialSharing.css';
import './fontawesome';
import { SOCIAL_INTERFACE, LOGO_SIZE_INTERFACE } from './interfaces';

export const messages = defineMessages({
  sendTo: {
    id: 'Send to ',
    defaultMessage: 'Send to ',
  },
  checkoutThisPublication: {
    id: 'Checkout this publication',
    defaultMessage: 'Checkout this publication',
  },
});

function defaultGetSharingUrl(social, url, text) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  switch (social.id) {
    case 'fb':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'tw':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case 'tg':
      return social.only_mobile
        ? `tg://msg_url?url=${encodedUrl}&text=${encodedText}`
        : `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    case 'wa':
      return social.only_mobile
        ? `whatsapp://send?text=${encodedText}%20-%20${encodedUrl}`
        : `https://wa.me/?text=${encodedText}%20-%20${encodedUrl}`;
    default:
      return social.sharing_url;
  }
}

const SocialSharing = ({
  location,
  socialElements = DEFAULT_SOCIAL,
  bannerPosition = DEFAULT_POSITIONS,
  logoSize = DEFAULT_LOGO_SIZE,
  buttonSize = DEFAULT_BUTTON_SIZE,
  getSharingUrl = defaultGetSharingUrl,
}) => {
  const intl = useIntl();
  const [currentUrl, setCurrentUrl] = useState('');
  const [display, setDisplay] = useState(true);
  const pathName = location?.pathname;

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Disable sharing on non content routes
  useEffect(() => {
    pathName && setDisplay(!isCmsUi(pathName));
  }, [pathName]);

  // MOBILE checker
  const [isMobile, setIsMobile] = useState(null);

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
  }
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  // end - MOBILE checker

  const shareText = intl.formatMessage(messages.checkoutThisPublication);

  socialElements = socialElements.map((social) => {
    const customSharingUrl = getSharingUrl(social, currentUrl, shareText);

    return {
      ...social,
      sharing_url:
        customSharingUrl ?? defaultGetSharingUrl(social, currentUrl, shareText),
    };
  });

  return (
    <>
      {display && (
        <div
          style={
            isMobile ? bannerPosition['mobile'] : bannerPosition['desktop']
          }
        >
          <ul
            className={
              isMobile
                ? 'horizontal volto-social-sharing'
                : 'vertical volto-social-sharing'
            }
          >
            {socialElements
              .filter((social) => isMobile !== false || !social.only_mobile)
              .map((social) => {
                return (
                  <li
                    className={`volto-social-${social.id}`}
                    key={social.id}
                    style={{ backgroundColor: social.color }}
                  >
                    <div
                      style={{
                        width: buttonSize,
                        height: buttonSize,
                        left: `calc(50% - ${buttonSize} / 2)`,
                      }}
                      className="icon-container"
                    >
                      <a
                        target="_blank"
                        title={
                          intl.formatMessage(messages.sendTo) + social.name
                        }
                        href={social.sharing_url}
                        className="fa-icon-position"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={social.fa_name}
                          color="white"
                          size={logoSize}
                          className="fa-icon"
                        />
                      </a>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

// PropTypes validation
SocialSharing.prototype = {
  socialElements: SOCIAL_INTERFACE,
  bannerPosition: PropTypes.object,
  logoSize: LOGO_SIZE_INTERFACE,
  buttonSize: PropTypes.string,
  getSharingUrl: PropTypes.func,
};

export default SocialSharing;
