/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import { SvgCss } from 'react-native-svg/css';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="58" height="58" viewBox="0 0 58 58"><defs><style>.a{fill:#fff;stroke:#e6e6e6;stroke-miterlimit:10;}.b{fill:none;}.c{fill:url(#a);}.d{stroke:none;}</style><linearGradient id="a" x1="0.895" y1="0.817" x2="0" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#1b52b2"/><stop offset="1" stop-color="#41d6f5"/></linearGradient></defs><g class="a"><circle class="d" cx="29" cy="29" r="29"/><circle class="b" cx="29" cy="29" r="28.5"/></g><g transform="translate(13 16)"><path class="b" d="M0,0H32V26H0Z"/><path class="c" d="M14,25h0L0,15.6H32v3.759H14V25ZM32,9.4H0V5.639H18V0L32,9.4Z"/></g></svg>
`

let IconExchange: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgCss xml={xml}  width={size} height={size} {...rest} />
  );
};

IconExchange.defaultProps = {
  size: 18,
};

IconExchange = React.memo ? React.memo(IconExchange) : IconExchange;

export default IconExchange;
