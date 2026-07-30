import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Input,
  Select,
  Button,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { Link as ChackraLink } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRegister } from "../services/auth/auth";
function Register() {
  const { mutateAsync: registerUser } = useRegister();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (formData) => {
    try {
      await registerUser(formData);
      toast({
        title: "Registeration Successful",
        description: "You have successfully Registered",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Registeration failed",
        description: error.response?.data?.message || "An Error occured",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
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
        Register
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.username}>
            <FormLabel>UserName </FormLabel>
            <Input
              type="text"
              placeholder="Enter your user name"
              borderColor={"gray.300"}
              {...register("username", { required: "UserName is required" })}
            />
            <FormErrorMessage color={"red"}>
              {errors.username?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email </FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              borderColor={"gray.300"}
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage color={"red"}>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password </FormLabel>
            <Input
              type="password"
              placeholder="Enter your Password"
              borderColor={"gray.300"}
              {...register("password", { required: "password is required" })}
            />
            <FormErrorMessage color={"red"}>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.role}>
            <FormLabel>Role </FormLabel>
            <Select
              color={"gray.500"}
              {...register("role", { required: "role is required" })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </Select>
            <FormErrorMessage color={"red"}>
              {errors.role?.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="cyan" color={"black"} width="full">
            Register
          </Button>

          <Text fontSize="sm" color={"gray.600"}>
            Already have an account?
            <ChackraLink
              as={RouterLink}
              to={"/login"}
              color="cyan.400"
              fontWeight={"bold"}
              ml={1}
            >
              Login
            </ChackraLink>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}

export default Register;
