import { Redirect } from "expo-router";
import { useAuth } from "../src/hooks/useAuth";
import { InitScreen } from "../src/screens/InitScreen";

export default function index() {
  return <Redirect href={"/home"} />;
  return <InitScreen />;
}
