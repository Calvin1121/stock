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

let IconIcon32Clear: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M564.576 512.64l262.848-313.28a7.968 7.968 0 0 0-6.112-13.12h-80a16.32 16.32 0 0 0-12.32 5.696l-216.704 258.464-216.768-258.464a16 16 0 0 0-12.32-5.696H203.296a7.968 7.968 0 0 0-6.112 13.12l262.848 313.28-262.848 313.344a7.968 7.968 0 0 0 6.112 13.12h80a16.32 16.32 0 0 0 12.32-5.696l216.8-258.432 216.8 258.432a16 16 0 0 0 12.32 5.696h80a7.968 7.968 0 0 0 6.112-13.12z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIcon32Clear.defaultProps = {
  size: 18,
};

IconIcon32Clear = React.memo ? React.memo(IconIcon32Clear) : IconIcon32Clear;

export default IconIcon32Clear;
