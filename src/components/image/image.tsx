import React from 'react';
import {
  Image as DefaultImage,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';

interface ImageProps extends Partial<ImageStyle> {
  sourceFile: ImageSourcePropType;
}

export function Image({ sourceFile, ...props }: ImageProps): React.JSX.Element {
  const IMAGE: ImageStyle = {
    ...props,
  };

  return <DefaultImage style={IMAGE} source={sourceFile} />;
}
