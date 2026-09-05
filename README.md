<div align="center"><img alt="logo" src="https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/volto-social-sharing.png" width="40" /></div>

<h1 align="center">Volto Social Sharing</h1>

Volto social sharing integration addon.

<div align="center">

[![npm](https://img.shields.io/npm/v/@codesyntax/volto-social-sharing)](https://www.npmjs.com/package/@codesyntax/volto-social-sharing)

[![GitHub contributors](https://img.shields.io/github/contributors/codesyntax/volto-social-sharing)](https://github.com/codesyntax/volto-social-sharing)
[![GitHub Repo stars](https://img.shields.io/github/stars/codesyntax/volto-social-sharing?style=social)](https://github.com/codesyntax/volto-social-sharing)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://codesyntax.github.io/volto-social-sharing/)
[![CI](https://github.com/codesyntax/volto-social-sharing/actions/workflows/main.yml/badge.svg)](https://github.com/codesyntax/volto-social-sharing/actions/workflows/main.yml)

</div>

# Table of Contents

1. [Features](#translations)
1. [Screenshots](#screenshots)
1. [Compatibility](#compatibility)
1. [Translations](#translations)
1. [Install it](#install)
1. [Settings it](#settings)
1. [Usage](#usage)
1. [Paths config](#paths)
1. [Customization](#customization)
1. [New social item](#new_social_item)
1. [Edit social item](#edit_social_item)
1. [Change the button size](#edit_button_size)
1. [Change the logo size](#edit_logo_size)
1. [Remove social item](#remove_social_item)

<br>

## Features <a name="features"></a>

<!-- List your awesome features here -->

- List of social items by default.

  - Share to **Facebook**.

  - Share to **Twitter**.

  - Share to **WhatsApp** (Only on mobile is vissible).

  - Share to **Telegram** (Only on mobile is vissible).

- Full customizable

## Screenshots <a name="screenshots"></a>

**Desktop version**

![Desktop](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/desktop.png)

---

**Mobile version**

![Mobile](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/mobile.png)

This is the add-on configuration looks like in the browser.

## Translations <a name="translations"></a>

This add-on support the following languages:

- English

- Spanish

## Compatibility <a name="compatibility"></a>

- Tested with `Node.js` 22.16.0 and `Volto` 18.

## Install it <a name="install"></a>

To install in your project, the `@codesyntax/volto-social-sharing` add-on, you must choose the method appropriate
to your version of `Volto`.


### Volto 18 and later

Add `@codesyntax/volto-social-sharing` add-on to the `"addons"` section in your `package.json` file:

```json
"addons": [
    "@codesyntax/volto-social-sharing",
]
```

Add `@codesyntax/volto-social-sharing` add-on to the `"dependencies"` section in your `package.json` file:

```json
"dependencies": {
    "@codesyntax/volto-social-sharing": "*",
}
```

---

#### Install from GitHub

If you trying to install from `GitHub` you need edit the `mrs.developer.json` file:

```json
{
  "volto-social-sharing": {
    "develop": true,
    "output": "./packages/",
    "package": "@codesyntax/volto-social-sharing",
    "url": "git@github.com:codesyntax/volto-social-sharing.git",
    "https": "https://github.com/codesyntax/volto-social-sharing.git",
    "branch": "main"
  }
}
```

The `mrs.developer.json` file is using by an `Node.js` utility called `mrs.developer` that makes
it easy to work with `npm` projects containing lots of packages, of which you only want to
develop some.

**NOTE:** To be used `@codesyntax/volto-social-sharing` add-on with ``mrs-developer`` tool, see 
[Volto docs](https://6.docs.plone.org/volto/development/add-ons/install-an-add-on-dev-18.html) for 
further usage information.

Add `@codesyntax/volto-social-sharing` add-on to the `"addons"` section in your `package.json` file:

```json
"addons": [
    "@codesyntax/volto-social-sharing",
]
```

Next add `@codesyntax/volto-social-sharing` add-on to the `"dependencies"` section in your `package.json` file:

```json
"dependencies": {
    "@codesyntax/volto-social-sharing": "workspace:*",
}
```

Lastly, run the install command in the root directory of your project:

```shell
make install
```

Download and install the new add-on by running:

```shell
make install
```

Start `Volto` with:

```shell
make start
```

## Test installation

Visit http://localhost:3000/ in a browser, login, and check the awesome new features.

## Settings it <a name="settings"></a>
To inject the component in the project add the ``AppExtras`` configuration in the ``settings.js`` file.

A suggested way is to use `appExtras` from settings object ([docs](https://6.docs.plone.org/volto/development/appextras.html)):

```jsx
import type { ConfigType } from '@plone/registry';

// Apply the configuration to the Volto app
export default function applyConfig(config: ConfigType) {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: SocialSharing,
      props: '',
    },
  ];
  return config;
}
```

## To determine which paths will be displayed <a name="paths"></a>

You can determine in which views the component will be displayed

```js
import type { ConfigType } from '@plone/registry';

// Apply the configuration to the Volto app
export default function applyConfig(config: ConfigType) {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '**/ekitaldiak/**',
      component: SocialSharing,
    },
    {
      match: '**/eventos/**',
      component: SocialSharing,
    },
    {
      match: '/eu/albisteak/**',
      component: SocialSharing,
    },
    {
      match: '/es/noticias/**',
      component: SocialSharing,
    },
  ];
  return config;
}
```

---

## Customization <a name="customization"></a>

There are several parameters that can be customized

* ``socialElements``: List of social items.
    * By default:
        * Facebook
        * Twitter
        * WhatsApp (Only on mobile)
        * Telegram (Only on mobile)
    * Options:
        * ``name`` (string): Social name
        * ``fa_name`` (array): Font awesome icon name. (It is necessary to add it in array format to determine the type of icon. Example: ["fab", "facebook-f"])
          * [Docs](https://docs-v5.fontawesome.com/web/use-with/react#features)
          * [Icon Gallery](https://fontawesome.com/icons?d=gallery)
        * ``color`` (string): CSS color value.
        * ``sharing_url`` (string): Link of the social network to share. ([Examples](https://github.com/bradvin/social-share-urls/blob/0c6d81fc950144e18ada062e0aba90d738b70d90/code/javascript/javascript/social-share-media.js#L151))
        * ``only_mobile`` (bool) *optional: Set to ``true`` if it will only be displayed in the mobile view.
* ``bannerPosition``: Position of social items banner.
    * By default:
        * In the **desktop** view centered on the right.
        * In the **mobile** view centered on the bottom.
    * Options:
        * ``defaultPositions["desktop"]`` = {[React DOM Style](https://react.dev/reference/react-dom/components/style)}
        * ``defaultPositions["mobile"]`` = {[React DOM Style](https://react.dev/reference/react-dom/components/style)}
* ``logoSize``: Font Awesome logo size. ([Doc](https://docs-v5.fontawesome.com/web/use-with/react#features))
    * By default: ``lg``.
    * [Options](https://docs.fontawesome.com/web/style/size#scale): ``lg`` | ``xs`` | ``sm`` | ``2x`` | ``3x`` | ``4x`` | ``5x`` | ``6x`` | ``7x`` | ``8x`` | ``9x`` | ``10x``
* ``buttonSize``: Button with and height.
    * By default: ``30px``

This is a list of all the settings available for this add-on.

## Add new social item <a name="new_social_item"></a>

```js
import type { ConfigType } from '@plone/registry';

// import default social list
import { DEFAULT_SOCIAL } from '@codesyntax/volto-social-sharing/config/defaultSettings';

// Push new items for social network items to the DEFAULT_SOCIAL array
DEFAULT_SOCIAL.push({
  name: "Pinterest",
  fa_name: ["fab", "pinterest-p"],
  color: "#c8232c",
  sharing_url: "http://pinterest.com/pin/create/link/?url=",
  id: "pt"
});

// Apply the configuration to the Volto app
export default function applyConfig(config: ConfigType) {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '**/ekitaldiak/**',
      component: SocialSharing,
      props: { socialElements: DEFAULT_SOCIAL },
    },
    {
      match: '**/eventos/**',
      component: SocialSharing,
      props: { socialElements: DEFAULT_SOCIAL },
    },
    {
      match: '/eu/albisteak/**',
      component: SocialSharing,
      props: { socialElements: DEFAULT_SOCIAL },
    },
    {
      match: '/es/noticias/**',
      component: SocialSharing,
      props: { socialElements: DEFAULT_SOCIAL },
    },
  ];
  return config;
}
```

#### Example

Below is the result of the previous configuration:

**Desktop version**

![pinterest_desktop](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/pinterest_desktop.png)

---

**Mobile version**

![pinterest_mobile](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/pinterest_mobile.png)

This is how the configuration looks like in the browser.

## Change existing social item value <a name="edit_social_item"></a>

```js
import type { ConfigType } from '@plone/registry';

// import default social list
import { DEFAULT_SOCIAL } from '@codesyntax/volto-social-sharing/config/defaultSettings';

// Customize the Facebook background color without mutating DEFAULT_SOCIAL
const socialElements = DEFAULT_SOCIAL.map((social: SocialElement) =>
  social.id === 'fb' ? { ...social, color: 'red' } : social,
);

// Apply the configuration to the Volto app
export default function applyConfig(config: ConfigType) {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '**/ekitaldiak/**',
      component: SocialSharing,
      props: { socialElements },
    },
    {
      match: '**/eventos/**',
      component: SocialSharing,
      props: { socialElements },
    },
    {
      match: '/eu/albisteak/**',
      component: SocialSharing,
      props: { socialElements },
    },
    {
      match: '/es/noticias/**',
      component: SocialSharing,
      props: { socialElements },
    },
  ];

  return config;
}
```

#### Example

Below is the result of the previous configuration:

**Desktop version**

![change_value_desktop](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/change_value_desktop.png)

---

**Mobile version**

![change_value_mobile](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/change_value_mobile.png)

This is how the configuration looks like in the browser.

## Change the button size <a name="edit_button_size"></a>

```js
import type { ConfigType } from '@plone/registry';

// import default social list
import { DEFAULT_SOCIAL } from '@codesyntax/volto-social-sharing/config/defaultSettings';

// Customize the button size value
const socialButtonSize = '60px';

// Apply the configuration to the Volto app
export default function applyConfig(config: ConfigType) {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '**/ekitaldiak/**',
      component: SocialSharing,
      props: { buttonSize: socialButtonSize },
    },
    {
      match: '**/eventos/**',
      component: SocialSharing,
      props: { buttonSize: socialButtonSize },
    },
    {
      match: '/eu/albisteak/**',
      component: SocialSharing,
      props: { buttonSize: socialButtonSize },
    },
    {
      match: '/es/noticias/**',
      component: SocialSharing,
      props: { buttonSize: socialButtonSize },
    },
  ];

  return config;
}
```

#### Example

Below is the result of the previous configuration:

**Desktop version**

![change_value_desktop](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/change_button_size_value_desktop.png)

---

**Mobile version**

![change_value_mobile](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/change_button_size_value_mobile.png)

This is how the configuration looks like in the browser.

## Change the logo size <a name="edit_logo_size"></a>

```js
import type { ConfigType } from '@plone/registry';

// import default social list
import { DEFAULT_SOCIAL } from '@codesyntax/volto-social-sharing/config/defaultSettings';

// Customize the logo size value
const socialLogoSize = '2x';

// Apply the configuration to the Volto app
export default function applyConfig(config: ConfigType) {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '**/ekitaldiak/**',
      component: SocialSharing,
      props: { logoSize: socialLogoSize },
    },
    {
      match: '**/eventos/**',
      component: SocialSharing,
      props: { logoSize: socialLogoSize },
    },
    {
      match: '/eu/albisteak/**',
      component: SocialSharing,
      props: { logoSize: socialLogoSize },
    },
    {
      match: '/es/noticias/**',
      component: SocialSharing,
      props: { logoSize: socialLogoSize },
    },
  ];

  return config;
}
```

#### Example

Below is the result of the previous configuration:

**Desktop version**

![change_value_desktop](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/change_logo_size_value_desktop.png)

---

**Mobile version**

![change_value_mobile](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/change_logo_size_value_mobile.png)

This is how the configuration looks like in the browser.

## Remove existing social item <a name="remove_social_item"></a>

```js
import type { ConfigType } from '@plone/registry';
// import default social list
import { DEFAULT_SOCIAL } from '@codesyntax/volto-social-sharing/config/defaultSettings';

// Remove social item by id
const socialElements = DEFAULT_SOCIAL.filter(
  (social: SocialElement) => social.id !== 'xt',
);

// Apply the configuration to the Volto app
export default function applyConfig(config: ConfigType) {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '**/ekitaldiak/**',
      component: SocialSharing,
      props: { socialElements },
    },
    {
      match: '**/eventos/**',
      component: SocialSharing,
      props: { socialElements },
    },
    {
      match: '/eu/albisteak/**',
      component: SocialSharing,
      props: { socialElements },
    },
    {
      match: '/es/noticias/**',
      component: SocialSharing,
      props: { socialElements },
    },
  ];

  return config;
}
```

#### Example

Below is the result of the previous configuration:

**Desktop version**

![change_value_desktop](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/remove_social_item_desktop.png)

---

**Mobile version**

![change_value_mobile](https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/remove_social_item_mobile.png)

## Development

For more information about the development of this add-on checkout the [DEVELOP.md](https://github.com/codesyntax/volto-social-sharing/blob/main/DEVELOP.md) file.

Feel free to send PRs.

## Authors

This product was developed by [CodeSyntax](https://codesyntax.com).

<a href="https://codesyntax.com" title="CodeSyntax" target="_blank">
<img width="200" alt="CodeSyntax" src="https://github.com/codesyntax/volto-social-sharing/blob/main/docs/_static/codesyntax-logo.png">
</a>

### Icon Author

 - By Throwaway icons - https://thenounproject.com/search/icons/?q=share, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=89416553

### Credits and acknowledgements 🙏

Generated using [Cookieplone (2.0.0b3)](https://github.com/plone/cookieplone) and [cookieplone-templates (bc6fabe)](https://github.com/plone/cookieplone-templates/commit/bc6fabe39857272b0b18fe5e5ed74c897e50a6d6) on 2026-09-02 14:45:06.641409. A special thanks to all contributors and supporters!

## License

MIT © [CodeSyntax](https://codesyntax.com)

The project is licensed under the *MIT license*. For more information, see the [LICENSE.md](https://github.com/codesyntax/volto-social-sharing/blob/main/LICENSE.md) for details.
