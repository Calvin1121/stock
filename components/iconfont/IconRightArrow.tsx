/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconRightArrow: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M659.921455 533.876364l-231.563637 240.523636a31.790545 31.790545 0 0 1-46.312727 0 34.909091 34.909091 0 0 1 0-48.081455l209.570909-217.716363-209.524364-217.693091a34.909091 34.909091 0 0 1 0-48.174546 31.790545 31.790545 0 0 1 46.266182 0l231.563637 240.407273a38.958545 38.958545 0 0 1 0 50.734546z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconRightArrow.defaultProps = {
  size: 18,
};

IconRightArrow = React.memo ? React.memo(IconRightArrow) : IconRightArrow;

export default IconRightArrow;
