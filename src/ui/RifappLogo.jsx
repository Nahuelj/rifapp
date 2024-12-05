import { Image } from "react-native";
import rifapp from "../../assets/app/rifapp_logo.png";

export function RifappLogo() {
  return (
    <Image
      style={{ width: "85%", height: 100, resizeMode: "center" }}
      source={rifapp}
    />
  );
}
