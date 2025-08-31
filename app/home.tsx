import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BackgroundPattern from "../components/BackgroundPattern";
import CustomButton from "../components/CustomButton";
import FriendDetailsPopup from "../components/FriendDetailsPopup";
import FriendSquare from "../components/FriendSquare";
import MatchPopup from "../components/MatchPopup";
import QuizzycusText from "../components/QuizzycusText";
import SharePopup from "../components/SharePopup";
import styles from "../styles/HomeScreenStyles";
import roman from "../utils/roman";

const mockUser = {
  id: 'user_123',
  name: 'Jane Doe',
  profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  coins: 1520,
  progress: 0.65,
  level: 4,
  friends: [
    {
      id: 'friend_1',
      name: 'John Smith',
      profileImage: 'https://randomuser.me/api/portraits/men/21.jpg',
      online: true,
      progress: 0.45,
      level: 2,
    },
    {
      id: 'friend_2',
      name: 'Emily Jones',
      profileImage: 'https://randomuser.me/api/portraits/women/30.jpg',
      online: false,
      progress: 0.72,
      level: 3,
    },
  ],
  loginType: 'google',
};

export default function Home() {
  // All hooks are always called at the top level
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<typeof mockUser.friends[0] | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [matchExpired, setMatchExpired] = useState(false);
  const [playerAccepted, setPlayerAccepted] = useState<boolean | null>(null);
  const [opponentAccepted, setOpponentAccepted] = useState<boolean | null>(null);

  const router = useRouter();

  const defaultOpponent = {
    profileImage: "https://randomuser.me/api/portraits/men/28.jpg",
    name: "Random Opponent",
    level: 3,
  };

  // Simulate user login and data fetch
  useEffect(() => {
    setUser(mockUser);
  }, []);

  // When both players accept, navigate to game
  useEffect(() => {
    if (playerAccepted === true && opponentAccepted === true) {
      setShowMatch(false);
      setMatchExpired(false);
      router.push('/game');
      setPlayerAccepted(null);
      setOpponentAccepted(null);
    }
  }, [playerAccepted, opponentAccepted, router]);

  function handleAccept() {
    setPlayerAccepted(true);
    setTimeout(() => setOpponentAccepted(true), 600);
  }

  function handleDecline() {
    setPlayerAccepted(false);
    setOpponentAccepted(false);
    setShowMatch(false);
    setMatchExpired(false);
    setTimeout(() => {
      setPlayerAccepted(null);
      setOpponentAccepted(null);
    }, 1000);
  }

  function handleTimeout() {
    setMatchExpired(true);
    setShowMatch(false);
    setTimeout(() => {
      setMatchExpired(false);
      setPlayerAccepted(null);
      setOpponentAccepted(null);
    }, 800);
  }

  // Only render when user is loaded (fonts are loaded globally)
  if (!user) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackgroundPattern />
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewRoot}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={28} color="#374151" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <QuizzycusText />
          </View>
          <TouchableOpacity onPress={() => setShowShare(true)}>
            <Ionicons name="share-social-outline" size={28} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Progress bar & level */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${(user.progress ?? 0) * 100}%` }]} />
          </View>
          <Text style={[styles.levelText, { fontFamily: "SourGummy" }]}>Level {roman(user.level)}</Text>
        </View>

        {/* Coins & Buy Coins */}
        <View style={styles.coinsRow}>
          <View style={styles.coinIcon}>
            <Text style={styles.coinLetter}>C</Text>
          </View>
          <Text style={styles.coinCount}>
            <Text style={{ color: "#FFFFFF", fontFamily: "SourGummy" }}>{user.coins}</Text>
          </Text>
          <View style={{ width: 32 }} />
          <TouchableOpacity style={styles.buyCoinsButton}>
            <Text style={[styles.buyCoinsText, { fontFamily: "SourGummy" }]}>BUY COINS</Text>
          </TouchableOpacity>
        </View>

        {/* Button stack */}
        <View style={styles.buttonStack}>
          <CustomButton
            text="START GAME"
            bg="#4F46E5"
            color="#F9FAFB"
            icon={
              <MaterialCommunityIcons
                name="flag-checkered"
                size={24}
                style={{ marginLeft: 8 }}
                color="#F9FAFB"
              />
            }
            onPress={() => setShowMatch(true)}
          />
          <CustomButton
            text="TOURNAMENT"
            bg="#78C8C0"
            color="#FFFFFF"
            icon={<MaterialCommunityIcons name="trophy" size={24} color="#F59E0B" style={{ marginLeft: 8 }} />}
          />
          <CustomButton
            text="Invite Friends"
            bg="#16A34A"
            color="#FFFFFF"
            icon={<MaterialCommunityIcons name="account-multiple-plus" size={24} color="#FFFFFF" style={{ marginLeft: 8 }} />}
          />
          <CustomButton
            text="Challenge a Friend"
            bg="#A79696"
            color="#FFFFFF"
            icon={<MaterialCommunityIcons name="sword-cross" size={24} color="#FFFFFF" style={{ marginLeft: 8 }} />}
          />
        </View>

        {/* Friends list heading */}
        <Text style={styles.friendsHeading}>Friends list</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.activeUsersScroll}
          contentContainerStyle={styles.activeUsers}
        >
          {user.friends.length === 0 ? (
            <View style={styles.noFriendsContainer}>
              <Text style={styles.noFriendsText}>No friends added</Text>
            </View>
          ) : (
            user.friends.map(friend => (
              <FriendSquare
                key={friend.id}
                friend={friend}
                onPress={() => setSelectedFriend(friend)}
              />
            ))
          )}
        </ScrollView>
        <View style={{ height: 32 }} />
        <FriendDetailsPopup
          friend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
        <SharePopup visible={showShare} onClose={() => setShowShare(false)} />
        <MatchPopup
          visible={showMatch}
          user={user}
          opponent={defaultOpponent}
          timerStart={3}
          onAccept={handleAccept}
          onDecline={handleDecline}
          onTimeout={handleTimeout}
          searching={true}
          playerAccepted={playerAccepted}
          opponentAccepted={opponentAccepted}
        />
      </ScrollView>
    </SafeAreaView>
  );
}