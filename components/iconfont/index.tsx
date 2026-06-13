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
import IconAIcon48Biyan from './IconAIcon48Biyan';
import IconAIcon24Xialaqianhuibeifen2 from './IconAIcon24Xialaqianhuibeifen2';
import IconAIcon48Yincang from './IconAIcon48Yincang';
import IconAIcon48Xianshidefuben from './IconAIcon48Xianshidefuben';
import IconAIcon48Fenxiangbeifen3Defuben from './IconAIcon48Fenxiangbeifen3Defuben';
import IconBack from './IconBack';
export { default as IconSearch } from './IconSearch';
export { default as IconMsg } from './IconMsg';
export { default as IconPlus } from './IconPlus';
export { default as IconCopy } from './IconCopy';
export { default as IconMinus } from './IconMinus';
export { default as IconFail } from './IconFail';
export { default as IconSuccess } from './IconSuccess';
export { default as IconRightArrow } from './IconRightArrow';
export { default as IconInfo } from './IconInfo';
export { default as IconAIcon48Biyan } from './IconAIcon48Biyan';
export { default as IconAIcon24Xialaqianhuibeifen2 } from './IconAIcon24Xialaqianhuibeifen2';
export { default as IconAIcon48Yincang } from './IconAIcon48Yincang';
export { default as IconAIcon48Xianshidefuben } from './IconAIcon48Xianshidefuben';
export { default as IconAIcon48Fenxiangbeifen3Defuben } from './IconAIcon48Fenxiangbeifen3Defuben';
export { default as IconBack } from './IconBack';

export type IconNames = 'search' | 'msg' | 'plus' | 'copy' | 'minus' | 'fail' | 'success' | 'right-arrow' | 'info' | 'a-icon48biyan' | 'a-icon24xialaqianhuibeifen2' | 'a-icon48yincang' | 'a-icon48xianshidefuben' | 'a-icon48fenxiangbeifen3defuben' | 'back';

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
    case 'a-icon48biyan':
      return <IconAIcon48Biyan key="10" {...rest} />;
    case 'a-icon24xialaqianhuibeifen2':
      return <IconAIcon24Xialaqianhuibeifen2 key="11" {...rest} />;
    case 'a-icon48yincang':
      return <IconAIcon48Yincang key="12" {...rest} />;
    case 'a-icon48xianshidefuben':
      return <IconAIcon48Xianshidefuben key="13" {...rest} />;
    case 'a-icon48fenxiangbeifen3defuben':
      return <IconAIcon48Fenxiangbeifen3Defuben key="14" {...rest} />;
    case 'back':
      return <IconBack key="15" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
