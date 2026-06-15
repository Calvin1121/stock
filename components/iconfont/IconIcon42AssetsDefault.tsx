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

let IconIcon42AssetsDefault: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M277.357714 891.294476a143.60381 143.60381 0 0 1-143.433143-143.457524V237.909333h628.809143a143.62819 143.62819 0 0 1 143.457524 143.433143v366.494476a143.62819 143.62819 0 0 1-143.457524 143.457524z m192.414476-297.252571l60.562286 65.828571a43.032381 43.032381 0 0 0 62.244572-0.170666L703.292952 536.380952a34.133333 34.133333 0 0 0 6.777905-36.303238 40.057905 40.057905 0 0 0-31.329524-23.430095 44.836571 44.836571 0 0 0-6.509714-0.463238 41.935238 41.935238 0 0 0-31.329524 13.531429l-79.823238 88.746666-55.783619-61.19619a42.154667 42.154667 0 0 0-28.306286-13.214476h-2.730666a42.691048 42.691048 0 0 0-27.331048 9.75238l-115.004952 95.451429a35.498667 35.498667 0 0 0-13.068191 25.551238 34.889143 34.889143 0 0 0 10.630095 26.428953 42.593524 42.593524 0 0 0 28.842667 11.068952h1.804191a42.837333 42.837333 0 0 0 25.941333-8.655238l83.602286-69.607619zM157.769143 193.633524a35.864381 35.864381 0 0 1 0-71.728762H616.838095a35.864381 35.864381 0 1 1 0 71.728762z"
        fill={getIconColor(color, 0, '#A5A5A5')}
      />
    </Svg>
  );
};

IconIcon42AssetsDefault.defaultProps = {
  size: 18,
};

IconIcon42AssetsDefault = React.memo ? React.memo(IconIcon42AssetsDefault) : IconIcon42AssetsDefault;

export default IconIcon42AssetsDefault;
