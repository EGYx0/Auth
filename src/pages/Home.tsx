import { Text } from "@chakra-ui/react";
import { useAuthStore } from "../store/authStore";
function Home() {
  const { user } = useAuthStore();

  return <Text color={"cyan"}>Hello {user.username} from home</Text>;
}

export default Home;
