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

let IconMinus: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 6144 1024" width={size} height={size} {...rest}>
      <Path
        d="M2047.99999968 319.99999995m170.250971 0l1702.509705 0q170.250971 0 170.250971 170.250971l0 0q0 170.250971-170.250971 170.25097l-1702.509705 0q-170.250971 0-170.250971-170.25097l0 0q0-170.250971 170.250971-170.250971Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMinus.defaultProps = {
  size: 18,
};

IconMinus = React.memo ? React.memo(IconMinus) : IconMinus;

export default IconMinus;
