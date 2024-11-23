import { Redirect } from "expo-router";
import { InitScreen } from "../src/screens/InitScreen";

export default function index() {
  return (
    <Redirect href={"raffleDetail/213f9ac4-3b93-4db8-8cff-89a76c22cce5"} />
  );

  return <InitScreen />;
}
