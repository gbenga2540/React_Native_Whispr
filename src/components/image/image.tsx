import React, { FunctionComponent } from 'react';
import {
  Image as DefaultImage,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';

interface ImageProps extends Partial<ImageStyle> {
  sourceFile: ImageSourcePropType;
}

const Image: FunctionComponent<ImageProps> = ({ sourceFile, ...props }) => {
  const IMAGE: ImageStyle = {
    ...props,
  };

  return <DefaultImage style={IMAGE} source={sourceFile} />;
};

export default Image;
