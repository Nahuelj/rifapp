import { InitScreen } from "../src/screens/InitScreen";
import { StatusBar } from "expo-status-bar";

export default function index() {
  return (
    <>
      <StatusBar style="light" />
      <InitScreen />
    </>
  );
}
