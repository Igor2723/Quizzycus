import React from "react";
import { Text } from "react-native";
import styles from "../styles/HomeScreenStyles";

const QuizzycusText: React.FC = () => (
  <Text style={styles.quizzycusTitle}>
    <Text style={{ color: "#6366F1", fontFamily: "DynaPuff" }}>Q</Text>
    <Text style={{ color: "#FFFFFF", fontFamily: "DynaPuff" }}>U</Text>
    <Text style={{ color: "#DC2626", fontFamily: "DynaPuff" }}>I</Text>
    <Text style={{ color: "#F59E0B", fontFamily: "DynaPuff" }}>ZZ</Text>
    <Text style={{ color: "#FFFFFF", fontFamily: "DynaPuff" }}>Y</Text>
    <Text style={{ color: "#16A34A", fontFamily: "DynaPuff" }}>C</Text>
    <Text style={{ color: "#6366F1", fontFamily: "DynaPuff" }}>U</Text>
    <Text style={{ color: "#78C8C0", fontFamily: "DynaPuff" }}>S</Text>
  </Text>
);

export default QuizzycusText;