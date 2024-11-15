import React from "react";
import { Account } from "../../src/screens/Account";
import { useAuth } from "../../src/hooks/useAuth";
import { Redirect } from "expo-router";

export default function account() {
  return <Account />;
}
