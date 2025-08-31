import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import styles from "../styles/HomeScreenStyles";

const { width, height } = Dimensions.get("window");

const BackgroundPattern: React.FC = () => (
  <View style={StyleSheet.absoluteFill}>
    {/* Large Gold Circle */}
    <View style={[styles.circle, {
      backgroundColor: "#F59E0B",
      width: 280, height: 280, borderRadius: 140,
      top: -60, left: -40, opacity: 0.38,
    }]} />
    {/* Cyan Circle */}
    <View style={[styles.circle, {
      backgroundColor: "#6366F1",
      width: 140, height: 140, borderRadius: 70,
      top: 60, right: -40, opacity: 0.78,
    }]} />
    {/* Indigo Ellipse */}
    <View style={[styles.circle, {
      backgroundColor: "#78C8C0",
      width: 220, height: 100, borderRadius: 50,
      top: height * 0.44, left: -60,
      transform: [{ rotate: "20deg" }]
    }]} />
    {/* Purple Circle (Bottom Right) */}
    <View style={[styles.circle, {
      backgroundColor: "#6366F1",
      width: 110, height: 110, borderRadius: 55,
      bottom: 80, right: 55,
    }]} />
    {/* Small Cyan Circle (Bottom Center) */}
    <View style={[styles.circle, {
      backgroundColor: "#78C8C0",
      width: 60, height: 60, borderRadius: 30,
      bottom: 36, left: width * 0.45,
    }]} />
    {/* Large Gold Ellipse (Bottom Left) */}
    <View style={[styles.circle, {
      backgroundColor: "#F59E0B",
      width: 120, height: 60, borderRadius: 30,
      bottom: 20, left: 10,
      transform: [{ rotate: "-8deg" }]
    }]} />
    {/* Main background overlay: indigo and grayish */}
    <View style={[{ backgroundColor: "#4F46E5", }]} />
    <View style={[{ backgroundColor: "#E5E7EB", }]} />
  </View>
);

export default BackgroundPattern;