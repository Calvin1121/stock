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

let IconIcon32Reduce: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M128 448m64 0l640 0q64 0 64 64l0 0q0 64-64 64l-640 0q-64 0-64-64l0 0q0-64 64-64Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIcon32Reduce.defaultProps = {
  size: 18,
};

IconIcon32Reduce = React.memo ? React.memo(IconIcon32Reduce) : IconIcon32Reduce;

export default IconIcon32Reduce;
