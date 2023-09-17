import { extendTheme, StyleFunctionProps, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { components } from './components';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('gray.100', 'gray.800')(props),
    },
  }),
};

export const theme = extendTheme({ config, styles, components });
