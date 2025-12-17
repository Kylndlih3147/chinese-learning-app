// app/(tabs)/search.tsx - UPDATED WITH SCREENCONTAINER
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FEATURED = [
  {
    id: "1",
    title: "Daily Conversations",
    chinese: "日常对话",
    icon: "message-circle",
    color: "#FF6B6B",
  },
  {
    id: "2",
    title: "Chinese Characters",
    chinese: "汉字",
    icon: "type",
    color: "#4ECDC4",
  },
  {
    id: "3",
    title: "Pinyin Mastery",
    chinese: "拼音",
    icon: "volume-2",
    color: "#FFD166",
  },
  {
    id: "4",
    title: "Shopping Vocabulary",
    chinese: "购物词汇",
    icon: "shopping-bag",
    color: "#06D6A0",
  },
];

const CATEGORIES = [
  { id: "1", title: "Vocabulary", icon: "book", count: 125 },
  { id: "2", title: "Grammar", icon: "edit-3", count: 42 },
  { id: "3", title: "Listening", icon: "headphones", count: 68 },
  { id: "4", title: "Speaking", icon: "mic", count: 35 },
  { id: "5", title: "Reading", icon: "book-open", count: 89 },
  { id: "6", title: "Writing", icon: "pen-tool", count: 56 },
];

const SEARCHES = ["你好怎么读？", "谢谢怎么写？", "基本问候语", "数字1-100"];

export default function ExplorerScreen() {
  return (
    <ScreenContainer scrollable={true}>
      {/* Header - YELLOW */}
      <View style={styles.header}>
        <Text style={styles.title}>Explorer</Text>
        <Text style={styles.subtitle}>Discover new lessons</Text>
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Feather name="search" size={20} color="#666" />
        <Text style={styles.searchText}>Search lessons...</Text>
      </View>

      {/* Featured Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}>
          {FEATURED.map((item) => (
            <Card key={item.id} style={styles.featuredCard}>
              <View
                style={[styles.featuredIcon, { backgroundColor: item.color }]}>
                <Feather name={item.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <Text style={styles.featuredChinese}>{item.chinese}</Text>
              <Button
                title="Start"
                onPress={() => console.log("Start:", item.title)}
                variant="secondary"
                size="small"
                style={styles.startBtn}
              />
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categories}>
          {CATEGORIES.map((cat) => (
            <Card key={cat.id} style={styles.categoryCard}>
              <View style={styles.categoryIcon}>
                <Feather name={cat.icon as any} size={20} color="#f0c829" />
              </View>
              <Text style={styles.categoryTitle}>{cat.title}</Text>
              <Text style={styles.categoryCount}>{cat.count} lessons</Text>
            </Card>
          ))}
        </View>
      </View>

      {/* Popular Searches Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Searches</Text>
        <View style={styles.chips}>
          {SEARCHES.map((text, i) => (
            <TouchableOpacity key={i} style={styles.chip}>
              <Feather name="search" size={14} color="#666" />
              <Text style={styles.chipText}>{text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f0c829",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -20,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  searchText: {
    fontSize: 16,
    color: "#999",
    marginLeft: 12,
    flex: 1,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },

  horizontalScroll: {
    paddingRight: 20,
  },

  featuredCard: {
    width: 200,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
  },
  featuredIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  featuredChinese: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  startBtn: {
    marginTop: 8,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fef9e7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: "#666",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  chipText: {
    fontSize: 14,
    color: "#666",
  },
});
