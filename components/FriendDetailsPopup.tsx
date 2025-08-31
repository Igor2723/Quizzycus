import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/HomeScreenStyles";
import roman from "../utils/roman";

type Friend = {
  id: string;
  name: string;
  profileImage: string;
  online: boolean;
  progress: number;
  level: number;
};

type FriendDetailsPopupProps = {
  friend: Friend | null;
  onClose: () => void;
};

const FriendDetailsPopup: React.FC<FriendDetailsPopupProps> = ({ friend, onClose }) => {
  if (!friend) return null;

  return (
    <Modal
      visible={!!friend}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.popupOverlay}>
        <View style={styles.friendPopup}>
          <TouchableOpacity style={styles.popupCloseBtn} onPress={onClose}>
            <Ionicons name="close" size={28} color="#374151" />
          </TouchableOpacity>
          <Image source={{ uri: friend.profileImage }} style={styles.popupImage} />
          <Text style={styles.popupName}>{friend.name}</Text>
          <View style={styles.popupProgressBarBg}>
            <View style={[styles.popupProgressBarFill, { width: `${(friend.progress ?? 0) * 100}%` }]} />
          </View>
          <Text style={styles.popupLevel}>Level {roman(friend.level)}</Text>
          <TouchableOpacity
            style={[
              styles.popupChallengeBtn,
              { backgroundColor: friend.online ? "#16A34A" : "#6B7280" }
            ]}
            disabled={!friend.online}
          >
            <Text style={styles.popupChallengeText}>Challenge</Text>
            <MaterialCommunityIcons
              name="sword-cross"
              size={22}
              color="#FFFFFF"
              style={{ marginLeft: 7 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FriendDetailsPopup;