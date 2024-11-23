import { Redirect } from "expo-router";
import { InitScreen } from "../src/screens/InitScreen";

export default function index() {
  return <Redirect href={"/account"} />;

  return <InitScreen />;
}
