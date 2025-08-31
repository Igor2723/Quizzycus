import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/HomeScreenStyles";

type Friend = {
  id: string;
  name: string;
  profileImage: string;
  online: boolean;
  progress: number;
  level: number;
};

type FriendSquareProps = {
  friend: Friend;
  onPress: () => void;
};

const FriendSquare: React.FC<FriendSquareProps> = ({ friend, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <View style={styles.friendSquare}>
      <Image source={{ uri: friend.profileImage }} style={styles.friendImage} />
      <Text style={styles.friendName}>{friend.name}</Text>
      <View
        style={[
          styles.onlineDot,
          {
            top: 6,
            right: 6,
            bottom: undefined,
            backgroundColor: friend.online ? "#16A34A" : "#6B7280",
          }
        ]}
      />
    </View>
  </TouchableOpacity>
);

export default FriendSquare;