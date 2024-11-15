import { Signup } from "../../src/screens/Signup";
import { useAuth } from "../../src/hooks/useAuth";
import { Redirect } from "expo-router";

export default function signup() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Redirect href={"/home"} />;
  }

  return <Signup />;
}
