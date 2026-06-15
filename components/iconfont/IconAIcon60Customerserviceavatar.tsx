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

let IconAIcon60Customerserviceavatar: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 512A512 512 0 1 0 512 0 512 512 0 0 0 0 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M497.024 832a58.608 58.608 0 0 1-49.376-29.392 51.44 51.44 0 0 1-5.12-41.248 54.096 54.096 0 0 1 27.552-33.152 50.928 50.928 0 0 1 26.272-7.248 54.064 54.064 0 0 1 48 29.76c2.016 0.144 4.08 0.224 6.144 0.224a105.312 105.312 0 0 0 61.232-20.992 79.568 79.568 0 0 0 22.4-64V385.712A138.432 138.432 0 0 0 496 247.376a138.432 138.432 0 0 0-138.192 138.352v280.24h-110.544A54.736 54.736 0 0 1 192 610.592v-148.8a54.736 54.736 0 0 1 55.248-55.376h55.296v-20.8a192.64 192.64 0 0 1 56.56-137.088A192 192 0 0 1 496 192a192 192 0 0 1 136.88 56.64 192.64 192.64 0 0 1 56.56 137.088v20.8h55.296A54.736 54.736 0 0 1 800 461.84v148.8a54.736 54.736 0 0 1-55.248 55.376h-55.296a133.344 133.344 0 0 1-39.728 105.504 163.552 163.552 0 0 1-99.92 34.736c-2.512 0-4.928 0-7.184-0.16a74.16 74.16 0 0 1-20.704 19.056 47.616 47.616 0 0 1-24.896 6.848z m192.432-370.16v148.8h55.296v-148.8h-55.296z m-442.192 0v148.8h55.296v-148.8z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconAIcon60Customerserviceavatar.defaultProps = {
  size: 18,
};

IconAIcon60Customerserviceavatar = React.memo ? React.memo(IconAIcon60Customerserviceavatar) : IconAIcon60Customerserviceavatar;

export default IconAIcon60Customerserviceavatar;
