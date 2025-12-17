// app/(tabs)/wallet.tsx
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ProgressBar } from "@/components/common/ProgressBar";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const REWARDS = [
  { id: "1", name: "7-Day Streak", icon: "calendar", cost: 50, claimed: true },
  { id: "2", name: "Quiz Master", icon: "award", cost: 100, claimed: false },
  { id: "3", name: "Fast Learner", icon: "zap", cost: 75, claimed: false },
  {
    id: "4",
    name: "Grammar Pro",
    icon: "book-open",
    cost: 150,
    claimed: false,
  },
];

const ACHIEVEMENTS = [
  { id: "1", name: "First Lesson", icon: "check-circle", progress: 100 },
  { id: "2", name: "10 Words Learned", icon: "hash", progress: 80 },
  { id: "3", name: "5 Day Streak", icon: "trending-up", progress: 60 },
  { id: "4", name: "Perfect Quiz", icon: "star", progress: 40 },
];

export default function WalletScreen() {
  const coins = 320;
  const streak = 7;
  const nextReward = 50;

  return (
    <ScreenContainer scrollable={true}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Wallet</Text>
        <Text style={styles.subtitle}>Your learning rewards</Text>
      </View>

      {/* Balance Card */}
      <View style={styles.section}>
        <Card style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Feather name="dollar-sign" size={32} color="#2b67ff" />
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>Learning Coins</Text>
              <Text style={styles.balanceAmount}>{coins}</Text>
            </View>
          </View>
          <View style={styles.balanceStats}>
            <View style={styles.stat}>
              <Feather name="flame" size={20} color="#FF6B6B" />
              <Text style={styles.statText}>{streak} day streak</Text>
            </View>
            <View style={styles.stat}>
              <Feather name="gift" size={20} color="#06D6A0" />
              <Text style={styles.statText}>{nextReward} coins next</Text>
            </View>
          </View>
          <Button
            title="Earn More Coins"
            onPress={() => console.log("Earn coins")}
            variant="primary"
            size="medium"
            icon="plus"
            fullWidth={true}
          />
        </Card>
      </View>

      {/* Daily Rewards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Rewards</Text>
        <View style={styles.rewardsGrid}>
          {REWARDS.map((reward) => (
            <Card key={reward.id} style={styles.rewardCard}>
              <View
                style={[
                  styles.rewardIcon,
                  { backgroundColor: reward.claimed ? "#2b67ff" : "#f0f5ff" },
                ]}>
                <Feather
                  name={reward.icon as any}
                  size={24}
                  color={reward.claimed ? "#fff" : "#2b67ff"}
                />
              </View>
              <Text style={styles.rewardName}>{reward.name}</Text>
              <View style={styles.rewardCost}>
                <Feather name="coffee" size={16} color="#FFD166" />
                <Text style={styles.costText}>{reward.cost}</Text>
              </View>
              <Button
                title={reward.claimed ? "Claimed" : "Claim"}
                onPress={() => console.log("Claim:", reward.id)}
                variant={reward.claimed ? "outline" : "primary"}
                size="small"
                disabled={reward.claimed}
                fullWidth={true}
              />
            </Card>
          ))}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <Card style={styles.achievementsCard}>
          {ACHIEVEMENTS.map((ach) => (
            <View key={ach.id} style={styles.achievementRow}>
              <View style={styles.achievementIcon}>
                <Feather name={ach.icon as any} size={20} color="#2b67ff" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementName}>{ach.name}</Text>
                <ProgressBar
                  progress={ach.progress}
                  height={4}
                  color="#2b67ff"
                  showLabel={false}
                />
              </View>
              <Text style={styles.achievementPercent}>{ach.progress}%</Text>
            </View>
          ))}
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2b67ff",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  subtitle: { fontSize: 16, color: "rgba(255,255,255,0.9)" },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  balanceCard: { padding: 20 },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  balanceInfo: { flex: 1 },
  balanceLabel: { fontSize: 14, color: "#666", marginBottom: 4 },
  balanceAmount: { fontSize: 36, fontWeight: "bold", color: "#2b67ff" },
  balanceStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  stat: { flexDirection: "row", alignItems: "center", gap: 8 },
  statText: { fontSize: 14, color: "#666", fontWeight: "500" },
  rewardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  rewardCard: {
    width: "48%",
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  rewardName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  rewardCost: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  costText: { fontSize: 16, fontWeight: "bold", color: "#FFD166" },
  achievementsCard: { padding: 16 },
  achievementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f0f5ff",
    justifyContent: "center",
    alignItems: "center",
  },
  achievementInfo: { flex: 1 },
  achievementName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  achievementPercent: { fontSize: 14, fontWeight: "bold", color: "#2b67ff" },
});
