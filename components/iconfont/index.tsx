/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconSearch from './IconSearch';
import IconMsg from './IconMsg';
import IconPlus from './IconPlus';
import IconCopy from './IconCopy';
import IconMinus from './IconMinus';
import IconFail from './IconFail';
import IconSuccess from './IconSuccess';
import IconRightArrow from './IconRightArrow';
import IconInfo from './IconInfo';
import IconHidden from './IconHidden';
import IconDropdown from './IconDropdown';
import IconInvisible from './IconInvisible';
import IconVisible from './IconVisible';
import IconExpand from './IconExpand';
import IconBack from './IconBack';
import IconLangDark from './IconLangDark';
export { default as IconSearch } from './IconSearch';
export { default as IconMsg } from './IconMsg';
export { default as IconPlus } from './IconPlus';
export { default as IconCopy } from './IconCopy';
export { default as IconMinus } from './IconMinus';
export { default as IconFail } from './IconFail';
export { default as IconSuccess } from './IconSuccess';
export { default as IconRightArrow } from './IconRightArrow';
export { default as IconInfo } from './IconInfo';
export { default as IconHidden } from './IconHidden';
export { default as IconDropdown } from './IconDropdown';
export { default as IconInvisible } from './IconInvisible';
export { default as IconVisible } from './IconVisible';
export { default as IconExpand } from './IconExpand';
export { default as IconBack } from './IconBack';
export { default as IconLangDark } from './IconLangDark';

export type IconNames = 'search' | 'msg' | 'plus' | 'copy' | 'minus' | 'fail' | 'success' | 'right-arrow' | 'info' | 'hidden' | 'dropdown' | 'invisible' | 'visible' | 'expand' | 'back' | 'lang-dark';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'search':
      return <IconSearch key="1" {...rest} />;
    case 'msg':
      return <IconMsg key="2" {...rest} />;
    case 'plus':
      return <IconPlus key="3" {...rest} />;
    case 'copy':
      return <IconCopy key="4" {...rest} />;
    case 'minus':
      return <IconMinus key="5" {...rest} />;
    case 'fail':
      return <IconFail key="6" {...rest} />;
    case 'success':
      return <IconSuccess key="7" {...rest} />;
    case 'right-arrow':
      return <IconRightArrow key="8" {...rest} />;
    case 'info':
      return <IconInfo key="9" {...rest} />;
    case 'hidden':
      return <IconHidden key="10" {...rest} />;
    case 'dropdown':
      return <IconDropdown key="11" {...rest} />;
    case 'invisible':
      return <IconInvisible key="12" {...rest} />;
    case 'visible':
      return <IconVisible key="13" {...rest} />;
    case 'expand':
      return <IconExpand key="14" {...rest} />;
    case 'back':
      return <IconBack key="15" {...rest} />;
    case 'lang-dark':
      return <IconLangDark key="L1" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
