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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { Link as ChackraLink } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      role: "USER",
    },
  });
  const onSubmit = (formData) => {
    console.log(formData);
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
          <FormControl isInvalid={errors.userName}>
            <FormLabel>UserName </FormLabel>
            <Input
              type="text"
              placeholder="Enter your user name"
              borderColor={"gray.300"}
              {...register("userName", { required: "UserName is required" })}
            />
            <FormErrorMessage color={"red"}>
              {errors.userName?.message}
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
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
