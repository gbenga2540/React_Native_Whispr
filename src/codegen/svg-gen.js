/**
 * Script to index and import all svg files in the SVG folder
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// eslint-disable-next-line no-undef
const basename = path.basename(__filename);
const svgPath = './src/assets/svg';
const fileToWrite = './src/components/icon/types.ts';

const index = {};
const imports = [];

// file template to be written
const template = `import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

{{{imports}}}

export const ICONS = {{{index}}};

export type IconName = keyof typeof ICONS;

export interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
  stroke?: string;
  iconOpacity?: number;
  strokeWidth?: number;
  focused?: boolean;
  outline?: boolean;
}

export type Props = IconProps;
`;

// compile template
const compile = Handlebars.compile(template);

// filter svg files in svgPath
fs.readdirSync(svgPath)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-4) === '.svg',
  )
  .map(file => {
    // required names are in kabeb and camel case
    const rawName = file.slice(0, -4);

    const fileName = rawName.toLowerCase();
    const kebabCase = fileName.replace(/[_\s]/g, '-');
    const CamelCaseName = kebabCase.replace(/-./g, x => x[1].toUpperCase());

    // create index
    index[kebabCase] = CamelCaseName;

    //create imports
    imports.push(`import ${CamelCaseName} from '../../assets/svg/${file}'`);
  });

//   format import and index
const formattedImports = imports.join('\n');

const formattedIndex = JSON.stringify(index, null, 2)
  .replaceAll(': "', ': ')
  .replaceAll('",', ',')
  .replaceAll(
    `"
}`,
    `
}`,
  );

// fill template content and removing string quotes
const content = compile({
  imports: formattedImports,
  index: formattedIndex,
});

// write content to types.ts
fs.writeFile(fileToWrite, content, err => {
  if (err) {
    // this is needed to see what the error is
    // no-console
    console.error(err);
  }
});

module.exports = index;
