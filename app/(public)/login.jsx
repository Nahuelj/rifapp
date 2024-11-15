import { useEffect } from "react";
import { useAuth } from "../../src/hooks/useAuth";
import { Login } from "../../src/screens/Login";
import { useRouter } from "expo-router";

export default function login() {
  return <Login />;
}
