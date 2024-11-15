import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getSessionLocalId() {
  const session = await AsyncStorage.getItem("userSession");
  const parseSession = await JSON.parse(session);
  return parseSession;
}
