import {
  Box,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { routes } from '@/shared/config';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.200', 'gray.900');

  const handleToggleColorMode = () => {
    toggleColorMode();
  };

  return (
    <Box
      as="header"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      display="flex"
      bg={bg}
      p={2}
    >
      <Link to={routes.home}>
        <Heading as="h1" size="sm">
          MigraineCharts
        </Heading>
      </Link>
      <Flex>
        <IconButton
          aria-label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}
          icon={colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          onClick={handleToggleColorMode}
          border="1px"
          mr={2}
        />
        <ChakraLink as={Link} to={routes.dashboard} variant="buttonGhost" size="md">
          New Diary
        </ChakraLink>
      </Flex>
    </Box>
  );
};

export default Header;
