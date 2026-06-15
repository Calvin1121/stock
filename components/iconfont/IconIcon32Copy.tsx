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

let IconIcon32Copy: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M191.328 928A32.384 32.384 0 0 1 160 894.784V289.088a32.32 32.32 0 0 1 31.328-33.12h481.344A32.32 32.32 0 0 1 704 289.088v605.696A32.384 32.384 0 0 1 672.672 928z m32.704-224c0 18.56 9.6 32 23.072 32h367.808a23.552 23.552 0 0 0 17.952-9.6A36.992 36.992 0 0 0 640 704a29.184 29.184 0 0 0-25.024-32h-368C233.6 672 224 685.408 224 704z m0-128a36.288 36.288 0 0 0 7.136 22.4 23.296 23.296 0 0 0 17.824 9.6h366.08a23.52 23.52 0 0 0 17.824-9.6 36.128 36.128 0 0 0 7.136-22.4 29.216 29.216 0 0 0-24.96-32H248.992A29.216 29.216 0 0 0 224 576z m0-128a35.776 35.776 0 0 0 7.136 22.4 23.2 23.2 0 0 0 17.824 9.6h366.08a23.456 23.456 0 0 0 17.824-9.6 36.448 36.448 0 0 0 7.136-22.4 29.184 29.184 0 0 0-24.96-32H248.992A29.184 29.184 0 0 0 224 448z m546.816 416V191.808H256V112.672A16.672 16.672 0 0 1 272.608 96h574.848a16.672 16.672 0 0 1 16.608 16.672v734.624a16.704 16.704 0 0 1-16.608 16.672z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIcon32Copy.defaultProps = {
  size: 18,
};

IconIcon32Copy = React.memo ? React.memo(IconIcon32Copy) : IconIcon32Copy;

export default IconIcon32Copy;
