import { defineStyle, StyleFunctionProps } from '@chakra-ui/react';
import { defineStyleConfig } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const buttonGhostVariant = (props: StyleFunctionProps) => {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
  const borderHover = mode(`gray.200`, `whiteAlpha.300`)(props);
  return {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'md',
    border: '1px solid',
    borderColor: c === 'gray' ? borderColor : 'currentColor',
    color: mode('gray.700', 'gray.100')(props),
    _focusVisible: {
      boxShadow: 'outline',
    },
    _hover: {
      textDecoration: 'none',
      borderColor: c === 'gray' ? borderColor : 'currentColor',
      bg: mode(`gray.100`, `whiteAlpha.200`)(props),
    },
  };
};

const sizes = {
  lg: defineStyle({
    h: '12',
    minW: '12',
    fontSize: 'lg',
    px: '6',
  }),
  md: defineStyle({
    h: '10',
    minW: '10',
    fontSize: 'md',
    px: '4',
  }),
  sm: defineStyle({
    h: '8',
    minW: '8',
    fontSize: 'sm',
    px: '3',
  }),
  xs: defineStyle({
    h: '6',
    minW: '6',
    fontSize: 'xs',
    px: '2',
  }),
};

export const linkTheme = defineStyleConfig({
  variants: {
    buttonGhost: buttonGhostVariant,
  },
  sizes,
});
