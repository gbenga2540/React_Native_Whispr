import { ImageSourcePropType, ImageStyle } from 'react-native';

export interface ImageProps extends Partial<ImageStyle> {
  sourceFile: ImageSourcePropType;
}
