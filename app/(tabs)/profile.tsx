// app/(tabs)/profile.tsx
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ProgressBar } from "@/components/common/ProgressBar";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const STATS = [
  { label: "Total Lessons", value: "24", icon: "book", change: "+12%" },
  { label: "Study Time", value: "18h 30m", icon: "clock", change: "+2h" },
  { label: "Words Learned", value: "156", icon: "hash", change: "+24" },
  { label: "Quiz Accuracy", value: "82%", icon: "target", change: "+5%" },
];

const SETTINGS = [
  { icon: "bell", title: "Notifications", subtitle: "Study reminders" },
  { icon: "moon", title: "Dark Mode", subtitle: "Appearance" },
  { icon: "globe", title: "Language", subtitle: "English" },
  { icon: "help-circle", title: "Help & Support", subtitle: "FAQ, Contact" },
];

export default function ProfileScreen() {
  const overallProgress = 68;
  const streak = 5;
  const level = 3;

  return (
    <ScreenContainer scrollable={true}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>学</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Mandarin Learner</Text>
            <Text style={styles.profileLevel}>
              Level {level} • {streak} day streak
            </Text>
          </View>
          <Button
            title="Edit"
            onPress={() => console.log("Edit profile")}
            variant="outline"
            size="small"
            style={styles.editButton}
          />
        </View>
      </View>

      {/* Progress */}
      <View style={styles.section}>
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Learning Progress</Text>
            <Text style={styles.progressPercent}>{overallProgress}%</Text>
          </View>
          <ProgressBar
            progress={overallProgress}
            height={8}
            color="#fa113c"
            showLabel={false}
          />
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Feather name="trending-up" size={16} color="#06D6A0" />
              <Text style={styles.progressStatText}>Ahead of 75% users</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
          </View>
        </Card>
      </View>

      {/* Stats Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Stats</Text>
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <Card key={stat.label} style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={styles.statIcon}>
                  <Feather name={stat.icon as any} size={20} color="#fa113c" />
                </View>
                <Text style={styles.statChange}>{stat.change}</Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Card style={styles.settingsCard}>
          {SETTINGS.map((item, index) => (
            <View key={item.title}>
              <View style={styles.settingRow}>
                <View style={styles.settingIcon}>
                  <Feather name={item.icon as any} size={20} color="#fa113c" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#999" />
              </View>
              {index < SETTINGS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </Card>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <Button
          title="Share Progress"
          onPress={() => console.log("Share progress")}
          variant="outline"
          size="large"
          icon="share-2"
          fullWidth={true}
          style={styles.actionButton}
        />
        <Button
          title="Sign Out"
          onPress={() => console.log("Sign out")}
          variant="text"
          size="large"
          icon="log-out"
          fullWidth={true}
          style={styles.actionButton}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fa113c",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fa113c",
  },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  profileLevel: { fontSize: 14, color: "rgba(255,255,255,0.9)" },
  editButton: { borderColor: "#fff" },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  progressCard: { padding: 20 },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  progressTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  progressPercent: { fontSize: 18, fontWeight: "bold", color: "#fa113c" },
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  progressStat: { flexDirection: "row", alignItems: "center", gap: 8 },
  progressStatText: { fontSize: 14, color: "#666" },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: { width: "48%", padding: 16, marginBottom: 12 },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#ffe6ea",
    justifyContent: "center",
    alignItems: "center",
  },
  statChange: { fontSize: 12, color: "#06D6A0", fontWeight: "600" },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: { fontSize: 12, color: "#666" },
  settingsCard: { padding: 16 },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#ffe6ea",
    justifyContent: "center",
    alignItems: "center",
  },
  settingInfo: { flex: 1 },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  settingSubtitle: { fontSize: 14, color: "#666" },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginLeft: 56 },
  actionButton: { marginBottom: 12 },
});
