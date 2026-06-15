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

let IconIcon42Refresh: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M73.142857 505.124571A428.836571 428.836571 0 0 1 202.727619 196.608a28.842667 28.842667 0 0 1 40.423619 41.155048 374.345143 374.345143 0 0 0 261.973333 641.779809 28.793905 28.793905 0 1 1 0 57.58781A432.469333 432.469333 0 0 1 73.142857 505.124571z m650.971429 339.870477A28.769524 28.769524 0 0 1 729.86819 804.571429a374.442667 374.442667 0 0 0-224.743619-673.840762 28.793905 28.793905 0 0 1 0-57.58781A431.981714 431.981714 0 0 1 764.342857 850.724571a28.672 28.672 0 0 1-40.228571-5.753904z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M481.133714 924.257524l-80.603428-120.929524a28.818286 28.818286 0 0 1 47.957333-31.939048l80.603429 120.978286a28.842667 28.842667 0 0 1-7.996953 39.960381 28.038095 28.038095 0 0 1-15.920762 4.876191 28.842667 28.842667 0 0 1-24.039619-12.946286z m80.62781-685.29981l-80.457143-120.880762a28.818286 28.818286 0 1 1 47.88419-32.085333l80.62781 120.978286a28.842667 28.842667 0 0 1-7.996952 39.960381 29.257143 29.257143 0 0 1-16.018286 4.87619 28.867048 28.867048 0 0 1-24.039619-12.848762z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconIcon42Refresh.defaultProps = {
  size: 18,
};

IconIcon42Refresh = React.memo ? React.memo(IconIcon42Refresh) : IconIcon42Refresh;

export default IconIcon42Refresh;
