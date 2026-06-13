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

let IconSearch: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M950.175703 1023.99968a11.647996 11.647996 0 0 1-8.287997-3.423999L687.999785 766.91176a427.807866 427.807866 0 0 1-562.719824-36.895988A427.679866 427.679866 0 0 1 427.615866 0a427.935866 427.935866 0 0 1 427.679867 427.679866 422.399868 422.399868 0 0 1-88.543973 260.607919l253.823921 253.759921a11.743996 11.743996 0 0 1 0 16.543994l-62.17598 61.983981a11.487996 11.487996 0 0 1-8.223998 3.423999zM427.615866 108.319966a319.3279 319.3279 0 1 0 225.82393 93.535971 317.599901 317.599901 0 0 0-225.82393-93.535971z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSearch.defaultProps = {
  size: 18,
};

IconSearch = React.memo ? React.memo(IconSearch) : IconSearch;

export default IconSearch;
