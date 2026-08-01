import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router";
import { Link as ChackraLink } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLogin } from "../services/auth/auth";
import { useAuthStore, useAuthTokenStore } from "../store/authStore";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { setTokens } = useAuthTokenStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutateAsync: loginUser } = useLogin();
  const onSubmit = async (formData) => {
    try {
      const response = await loginUser(formData);

      const user = response?.data?.user;
      if (!user) {
        throw new Error("Login succeeded but user data is missing.");
      }
      const { accessToken, refreshToken } = response.data;
      login(user);
      setTokens(accessToken, refreshToken);
      navigate("/product");
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };
  return (
    <Box
      w={{ base: "90%", md: "400px" }}
      mt={10}
      p={8}
      borderRadius="lg"
      boxShadow="5px 10px 50px 2px #0003"
      color="white"
      border={"1px"}
      borderColor={"gray.800"}
    >
      <Heading mb={6} size={"lg"} textAlign={"center"}>
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.username}>
            <FormLabel>UserName:</FormLabel>
            <Input
              type="text"
              placeholder="Enter your user name"
              {...register("username", { required: "User name is required" })}
            />
            <FormErrorMessage color={"red"}>
              {errors.username?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              placeholder="Enter your user name"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage color={"red"}>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="cyan" color={"black"} width="full">
            Login
          </Button>
          <Text fontSize="sm" color={"gray.600"}>
            Havn't registered yet?
            <ChackraLink
              as={RouterLink}
              to={"/register"}
              color="cyan.400"
              fontWeight={"bold"}
              ml={1}
            >
              Register
            </ChackraLink>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}

export default Login;
