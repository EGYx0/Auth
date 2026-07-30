import {
  Box,
  Flex,
  Image,
  Button,
  HStack,
  Container,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import Logo from "../assets/ecommerce-logo.svg";
import { useLogout } from "../services/auth/auth";
import { useAuthStore, useAuthTokenStore } from "../store/authStore";

export const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { clearTokens } = useAuthTokenStore();
  const { mutateAsync: logoutUser } = useLogout();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutUser();
      clearTokens();
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.message || "logout failed");
    }
  };
  return (
    <Box
      boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)" // black shadow with opacity
      py={3}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      bgGradient="linear(to-r, #10263b, #0a111b)"
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Flex align="center" justify="space-between" flexWrap="wrap">
          {/* Logo */}
          <Link to="/">
            <Image
              src={Logo}
              alt="E-commerce Logo"
              boxSize="50px"
              objectFit="contain"
            />
          </Link>

          {/* Product Catalog */}
          <Box
            display="flex"
            gap={{ base: 4, md: 10 }}
            mx={{ base: 2, md: 20 }}
            mt={{ base: 2, md: 0 }}
          >
            <Link to="/product">
              <Text
                fontSize={{ base: "md", md: "xl" }}
                _hover={{ color: "blue.300" }}
                color="gray.400"
              >
                Product Catalog
              </Text>
            </Link>

            <Link to="/dashboard">
              <Text
                fontSize={{ base: "md", md: "xl" }}
                _hover={{ color: "blue.300" }}
                color="gray.400"
              >
                Dashboard
              </Text>
            </Link>
          </Box>

          {/* Navigation Buttons */}
          {isAuthenticated ? (
            <HStack>
              <Text color={"cyan"}>Welcome {user.username}</Text>
              <Button colorScheme="cyan" onClick={logoutHandler}>
                Logout
              </Button>
            </HStack>
          ) : (
            <HStack
              display={{ base: "none", md: "flex" }}
              spacing={{ base: 2, md: 4 }}
              mt={{ base: 2, md: 0 }}
            >
              <Link to="/login">
                <Button
                  colorScheme="cyan"
                  color="black"
                  size={{ base: "sm", md: "md" }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  colorScheme="cyan"
                  size={{ base: "sm", md: "md" }}
                >
                  Register
                </Button>
              </Link>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
};
