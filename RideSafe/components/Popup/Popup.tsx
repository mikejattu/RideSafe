import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video"; // Use VideoView and useVideoPlayer
import { PopupProps } from "./Popup.types";
import styles from "./Popup.styles";

const Popup: React.FC<PopupProps> = ({ location, date, time, onClose, onAlert }) => {
  // Define the video source
  const videoSource = { uri: require("../../assets/images/fight.mp4") };

  // Initialize the video player
  const player = useVideoPlayer(videoSource);

  return (
    <Modal transparent={true} visible={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {/* Video Section */}
          <VideoView
            style={[styles.video, { transform: [{ scaleY: -1 }] }]}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />

          {/* Information Section */}
          <View style={styles.info}>
            <Text style={styles.text}>
              <Text style={styles.label}>Location:</Text> {location}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Date:</Text> {date}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Time:</Text> {time}
            </Text>
          </View>

          {/* Alert Button */}
          <TouchableOpacity style={styles.alertButton} onPress={onAlert}>
            <Text style={styles.buttonText}>Alert</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
