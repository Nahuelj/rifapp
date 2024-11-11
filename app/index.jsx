import { InitScreen } from "../src/screens/InitScreen";
import { Redirect } from "expo-router";

export default function index() {
  // Para que no me traiga a index cuando estoy trabajando en home
  // return <Redirect href={`/raffleDetail/${"id-del-sorteo"}`} />;

  return <InitScreen />;
}
