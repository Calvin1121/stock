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

let IconIcon96Play: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 128a384.117333 384.117333 0 0 0-149.461333 737.845333 384.106667 384.106667 0 0 0 298.922666-707.690666A381.557333 381.557333 0 0 0 512 128m0-42.666667A426.666667 426.666667 0 1 1 85.333333 512 426.666667 426.666667 0 0 1 512 85.333333z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M689.418667 483.381333a32 32 0 0 1 0 57.248L387.648 691.509333A32 32 0 0 1 341.333333 662.890667V361.109333a32 32 0 0 1 46.314667-28.618666z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconIcon96Play.defaultProps = {
  size: 18,
};

IconIcon96Play = React.memo ? React.memo(IconIcon96Play) : IconIcon96Play;

export default IconIcon96Play;
