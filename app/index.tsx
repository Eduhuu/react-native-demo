import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const icon = require("../assets/images/icon.png");

export default function Index() {
  const handlePress = () => {
    alert("Button pressed!");
  };

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text>Welcome to the app</Text>
      <Button title="Click me" onPress={handlePress} />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
});
