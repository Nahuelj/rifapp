import { View, Pressable, Image } from "react-native";
import { HeaderText } from "./Texts";
import arrow from "../../assets/app/icons/left_arrow.png";

export function BackHeader({ content, onPressFunction }) {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignContent: "flex-start",
        gap: 15,
        width: 320,
        marginTop: 10,
        paddingRight: 80,
      }}
      onPress={() => {
        onPressFunction();
      }}
    >
      <View>
        <Image source={arrow} />
      </View>
      <View style={{ marginTop: 1 }}>
        <HeaderText content={content}></HeaderText>
      </View>
    </Pressable>
  );
}
