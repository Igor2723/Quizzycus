import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const roman = (num: number) => {
  if (num === 1) return "I";
  if (num === 2) return "II";
  if (num === 3) return "III";
  if (num === 4) return "IV";
  if (num === 5) return "V";
  return num.toString();
};

function FriendSquareBase({
  user,
  levelRight,
  acceptedStatus,
}: {
  user: { profileImage: string, name: string, level: number },
  levelRight?: boolean,
  acceptedStatus?: "accepted" | "declined" | null,
}) {
  let borderColor = "#6366F1";
  let icon = null;
  if (acceptedStatus === "accepted") {
    borderColor = "#4F46E5";
    icon = (
      <Ionicons
        name="checkmark-circle"
        size={22}
        color="#4F46E5"
        style={{
          position: "absolute",
          bottom: -4,
          right: -4,
          backgroundColor: "#F9FAFB",
          borderRadius: 11,
        }}
      />
    );
  } else if (acceptedStatus === "declined") {
    borderColor = "#DC2626";
    icon = (
      <Ionicons
        name="close-circle"
        size={22}
        color="#DC2626"
        style={{
          position: "absolute",
          bottom: -4,
          right: -4,
          backgroundColor: "#F9FAFB",
          borderRadius: 11,
        }}
      />
    );
  }
  return (
    <View style={styles.friendSquarePopupContainer}>
      <View style={styles.friendSquarePopup}>
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: user.profileImage }}
            style={[styles.friendImagePopup, { borderColor }]}
          />
          {icon}
        </View>
        <Text style={styles.friendNamePopup}>{user.name}</Text>
      </View>
      <View style={[
        styles.levelBadgePopup,
        levelRight ? styles.levelBadgeRight : styles.levelBadgeLeft
      ]}>
        <Text style={styles.levelBadgeTextPopup}>{roman(user.level)}</Text>
      </View>
    </View>
  );
}

function VSBlock() {
  return (
    <View style={styles.vsBlock}>
      <Text style={styles.vsText}>VS</Text>
    </View>
  );
}

export default function MatchPopup({
  visible,
  user,
  opponent,
  timerStart,
  onAccept,
  onDecline,
  onTimeout,
  searching,
  playerAccepted,
  opponentAccepted,
}: {
  visible: boolean,
  user: { profileImage: string, name: string, level: number },
  opponent: { profileImage: string, name: string, level: number },
  timerStart: number,
  onAccept: () => void,
  onDecline: () => void,
  onTimeout: () => void,
  searching?: boolean,
  playerAccepted?: boolean | null,
  opponentAccepted?: boolean | null,
}) {
  const [timer, setTimer] = useState(timerStart);
  const [expired, setExpired] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [searchingOpponent, setSearchingOpponent] = useState(opponent);

  useEffect(() => {
    if (!visible) return;
    setTimer(timerStart);
    setExpired(false);
    setMatchFound(false);
    setSearchingOpponent(opponent);

    if (searching) {
      let count = 0;
      const pool = [
        { profileImage: 'https://randomuser.me/api/portraits/men/24.jpg', name: 'Mike Swift', level: 3 },
        { profileImage: 'https://randomuser.me/api/portraits/women/33.jpg', name: 'Lisa Tran', level: 5 },
        { profileImage: 'https://randomuser.me/api/portraits/men/35.jpg', name: 'Alex Turner', level: 2 },
        { profileImage: 'https://randomuser.me/api/portraits/women/26.jpg', name: 'Tina Brown', level: 4 },
      ];
      const cycleInterval = setInterval(() => {
        setSearchingOpponent(pool[count % pool.length]);
        count += 1;
      }, 120);
      setTimeout(() => {
        clearInterval(cycleInterval);
        setSearchingOpponent(opponent);
        setMatchFound(true);
      }, Math.max(timerStart * 400, 1200));
      return () => clearInterval(cycleInterval);
    } else {
      setSearchingOpponent(opponent);
      setMatchFound(true);
    }
  }, [searching, visible, opponent, timerStart]);

  useEffect(() => {
    if (!visible || !matchFound) return;
    Animated.loop(
      Animated.timing(
        spinAnim,
        {
          toValue: 1,
          duration: timerStart * 1000,
          useNativeDriver: true,
        }
      )
    ).start();

    let interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(interval);
          setExpired(true);
          Promise.resolve().then(onTimeout);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
      spinAnim.setValue(0);
    };
  }, [visible, matchFound, timerStart, onTimeout]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  let playerStatus: "accepted" | "declined" | null = null;
  if (playerAccepted === true) playerStatus = "accepted";
  else if (playerAccepted === false) playerStatus = "declined";

  let opponentStatus: "accepted" | "declined" | null = null;
  if (opponentAccepted === true) opponentStatus = "accepted";
  else if (opponentAccepted === false) opponentStatus = "declined";

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.matchOverlay}>
        <View style={styles.matchPopup}>
          <View style={styles.matchRow}>
            <FriendSquareBase user={user} levelRight={true} acceptedStatus={playerStatus} />
            <VSBlock />
            <FriendSquareBase user={searching ? searchingOpponent : opponent} levelRight={false} acceptedStatus={opponentStatus} />
          </View>
          {matchFound && (
            <View style={styles.matchVerticalStack}>
              <View style={styles.matchTimerContainer}>
                <View style={styles.matchSpinnerContainer}>
                  <Animated.View style={[
                    styles.matchSpinner,
                    { transform: [{ rotate: spin }] }
                  ]}>
                    <View style={styles.matchSpinnerHalfWhite} />
                    <View style={styles.matchSpinnerHalfGold} />
                  </Animated.View>
                  <View style={styles.matchTimerCircle}>
                    <Text style={styles.matchTimerText}>{timer}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.matchBtnRow}>
                <TouchableOpacity
                  style={[
                    styles.matchBtn,
                    expired ? styles.matchBtnDisabled : styles.matchBtnAccept
                  ]}
                  disabled={expired || playerAccepted === true || playerAccepted === false}
                  onPress={onAccept}
                >
                  <Text style={styles.matchBtnLabel}>ACCEPT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.matchBtn,
                    expired ? styles.matchBtnDisabled : styles.matchBtnDecline
                  ]}
                  disabled={expired || playerAccepted === true || playerAccepted === false}
                  onPress={onDecline}
                >
                  <Text style={styles.matchBtnLabel}>DECLINE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  matchOverlay: {
    flex: 1,
    backgroundColor: "rgba(34,34,34,0.36)",
    justifyContent: "center",
    alignItems: "center",
  },
  matchPopup: {
    width: "85%",
    backgroundColor: "#F9FAFB",
    borderRadius: 22,
    alignItems: "center",
    paddingVertical: 34,
    paddingHorizontal: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#6366F1",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 18,
  },
  matchVerticalStack: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  matchTimerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 0,
    width: "100%",
  },
  matchSpinnerContainer: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  matchSpinner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  matchSpinnerHalfWhite: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 56,
    height: 28,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  matchSpinnerHalfGold: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 56,
    height: 28,
    backgroundColor: "#F59E0B",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  matchTimerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 2,
  },
  matchTimerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
    fontFamily: "SourGummy",
    textAlign: "center",
  },
  matchBtnRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    width: "100%",
    gap: 16,
  },
  matchBtn: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    minWidth: 120,
  },
  matchBtnAccept: {
    backgroundColor: "#16A34A",
  },
  matchBtnDecline: {
    backgroundColor: "#DC2626",
  },
  matchBtnDisabled: {
    backgroundColor: "#6B7280",
  },
  matchBtnLabel: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "SourGummy",
    textAlign: "center",
  },
  friendSquarePopupContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  friendSquarePopup: {
    width: 76,
    height: 100,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#6366F1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  friendImagePopup: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginBottom: 6,
    marginTop: 4,
    borderWidth: 2,
    borderColor: "#6366F1", // Default, overridden by prop
  },
  friendNamePopup: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#6366F1",
    textAlign: "center",
    fontFamily: "SourGummy",
  },
  levelBadgePopup: {
    position: "absolute",
    top: 30,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F9FAFB",
    zIndex: 2,
  },
  levelBadgeRight: {
    right: -16,
  },
  levelBadgeLeft: {
    left: -16,
  },
  levelBadgeTextPopup: {
    color: "#F9FAFB",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "SourGummy",
    textAlign: "center",
  },
  vsBlock: {
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  vsText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#DC2626",
    fontFamily: "DynaPuff",
    textAlign: "center",
    letterSpacing: 2,
  },
});