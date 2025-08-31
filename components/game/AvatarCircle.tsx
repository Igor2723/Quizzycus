import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function AvatarCircle({
  image,
  name,
  borderColor,
}: {
  image: string;
  name: string;
  borderColor: string;
}) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={[styles.avatarCircle, { borderColor }]}>
        <Image source={{ uri: image }} style={styles.avatarImage} />
      </View>
      <Text style={styles.avatarName}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    marginHorizontal: 8,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarName: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
  },
});