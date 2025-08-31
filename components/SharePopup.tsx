import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/HomeScreenStyles";

type SharePopupProps = {
  visible: boolean;
  onClose: () => void;
};

const SharePopup: React.FC<SharePopupProps> = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    animationType="fade"
    transparent
    onRequestClose={onClose}
  >
    <View style={styles.shareOverlay}>
      <View style={styles.sharePopup}>
        <TouchableOpacity style={styles.shareCloseBtn} onPress={onClose}>
          <Ionicons name="close" size={28} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.shareTitle}>Share via</Text>
        <View style={styles.shareStack}>
          <TouchableOpacity style={styles.shareIconBtn}>
            <FontAwesome name="whatsapp" size={38} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareIconBtn}>
            <FontAwesome5 name="viber" size={38} color="#665CAC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareIconBtn}>
            <FontAwesome name="facebook" size={38} color="#1877F3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareIconBtn}>
            <MaterialCommunityIcons name="facebook-messenger" size={38} color="#0099FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareIconBtn}>
            <Entypo name="message" size={38} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default SharePopup;