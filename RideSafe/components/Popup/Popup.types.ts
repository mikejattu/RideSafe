import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  info: {
    width: "100%",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  alertButton: {
    backgroundColor: "#ff4d4f",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default styles;
