import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/HomeScreenStyles";

type CustomButtonProps = {
  text: string,
  bg: string,
  color: string,
  icon?: React.ReactNode,
  onPress?: () => void
};

const CustomButton: React.FC<CustomButtonProps> = ({ text, bg, color, icon, onPress }) => (
  <TouchableOpacity style={[styles.menuButton, { backgroundColor: bg }]} onPress={onPress}>
    <Text style={[styles.menuButtonText, { color, fontFamily: "SourGummy" }]}>{text}</Text>
    {icon}
  </TouchableOpacity>
);

export default CustomButton;