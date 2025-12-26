// app/(tabs)/index.tsx - COMPLETE UPDATED VERSION
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ProgressBar } from "@/components/common/ProgressBar";
import { ExerciseDemoModal } from "@/components/exercises/ExerciseDemoModal";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const LESSONS = [
  {
    id: "1",
    title: "Introduction",
    chinese: "介绍",
    icon: "globe",
    progress: 100,
    category: "Basics",
    duration: "10 min",
  },
  {
    id: "2",
    title: "Introducing yourself",
    chinese: "自我介绍",
    icon: "user",
    progress: 100,
    category: "Basics",
    duration: "15 min",
  },
  {
    id: "3",
    title: "Your jobs",
    chinese: "你的工作",
    icon: "briefcase",
    progress: 75,
    category: "Work",
    duration: "20 min",
  },
  {
    id: "4",
    title: "Nationality",
    chinese: "国籍",
    icon: "flag",
    progress: 50,
    category: "Basics",
    duration: "15 min",
  },
  {
    id: "5",
    title: "Your family",
    chinese: "你的家庭",
    icon: "users",
    progress: 25,
    category: "Family",
    duration: "25 min",
  },
  {
    id: "6",
    title: "Number 1-10",
    chinese: "数字1-10",
    icon: "hash",
    progress: 80,
    category: "Numbers",
    duration: "15 min",
  },
  {
    id: "7",
    title: "Days and week",
    chinese: "日期和星期",
    icon: "calendar",
    progress: 30,
    category: "Time",
    duration: "20 min",
  },
];

// Header Component
const Header = () => {
  const totalProgress = Math.round(
    LESSONS.reduce((sum, lesson) => sum + lesson.progress, 0) / LESSONS.length
  );
  const completedCount = LESSONS.filter((l) => l.progress === 100).length;
  const inProgressCount = LESSONS.filter(
    (l) => l.progress > 0 && l.progress < 100
  ).length;

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Chinese Lessons</Text>
      <Text style={styles.subtitle}>Master Mandarin step by step</Text>

      <Card style={styles.overallProgressCard}>
        <View style={styles.overallProgressHeader}>
          <Text style={styles.overallProgressTitle}>Your Learning Journey</Text>
          <Text style={styles.overallProgressPercent}>{totalProgress}%</Text>
        </View>
        <ProgressBar
          progress={totalProgress}
          height={10}
          color="#130057"
          animated={true}
          showLabel={false}
        />
      </Card>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <View style={[styles.statIcon, { backgroundColor: "#E8F5E9" }]}>
              <Feather name="check-circle" size={24} color="#4CAF50" />
            </View>
            <View style={styles.statText}>
              <Text style={styles.statNumber}>{completedCount}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <View style={[styles.statIcon, { backgroundColor: "#FFF3E0" }]}>
              <Feather name="play-circle" size={24} color="#FF9800" />
            </View>
            <View style={styles.statText}>
              <Text style={styles.statNumber}>{inProgressCount}</Text>
              <Text style={styles.statLabel}>In Progress</Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};

// ContinueLearning Component
const ContinueLearning = ({
  onContinue,
}: {
  onContinue: (lessonId: string) => void;
}) => {
  const continueLesson = LESSONS.find(
    (l) => l.progress > 0 && l.progress < 100
  );
  if (!continueLesson) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Continue Learning</Text>
      <Card style={styles.continueCard}>
        <View style={styles.continueContent}>
          <View style={styles.continueHeader}>
            <View style={[styles.lessonIcon, { backgroundColor: "#f0f0ff" }]}>
              <Feather
                name={continueLesson.icon as any}
                size={24}
                color="#130057"
              />
            </View>
            <View style={styles.continueInfo}>
              <Text style={styles.continueTitle}>{continueLesson.title}</Text>
              <Text style={styles.continueChinese}>
                {continueLesson.chinese}
              </Text>
            </View>
          </View>
          <ProgressBar
            progress={continueLesson.progress}
            height={6}
            color="#130057"
            showLabel={false}
          />
          <Button
            title="Continue Lesson"
            onPress={() => onContinue(continueLesson.id)}
            variant="primary"
            size="medium"
            style={styles.continueButton}
          />
        </View>
      </Card>
    </View>
  );
};

// LessonCard Component
const LessonCard = ({
  lesson,
  index,
  onPress,
}: {
  lesson: any;
  index: number;
  onPress?: () => void;
}) => (
  <Card onPress={onPress} style={styles.lessonCard}>
    <View style={styles.lessonHeader}>
      <View style={styles.lessonNumber}>
        <Text style={styles.lessonNumberText}>
          {(index + 1).toString().padStart(2, "0")}
        </Text>
      </View>
      <View style={[styles.lessonIconSmall, { backgroundColor: "#f0f0ff" }]}>
        <Feather name={lesson.icon as any} size={20} color="#130057" />
      </View>
    </View>

    <Text style={styles.lessonTitle}>{lesson.title}</Text>
    <Text style={styles.lessonChinese}>{lesson.chinese}</Text>

    <View style={styles.lessonMeta}>
      <View style={styles.metaItem}>
        <Feather name="clock" size={12} color="#666" />
        <Text style={styles.metaText}>{lesson.duration}</Text>
      </View>
      <View style={styles.metaItem}>
        <Feather name="folder" size={12} color="#666" />
        <Text style={styles.metaText}>{lesson.category}</Text>
      </View>
    </View>

    <ProgressBar
      progress={lesson.progress}
      height={4}
      color={lesson.progress === 100 ? "#4CAF50" : "#130057"}
      showLabel={false}
    />

    <View style={styles.lessonFooter}>
      <Text style={styles.progressText}>
        {lesson.progress === 100
          ? "Completed"
          : `${Math.round(lesson.progress)}%`}
      </Text>
      <Feather
        name={lesson.progress === 100 ? "check-circle" : "chevron-right"}
        size={20}
        color={lesson.progress === 100 ? "#4CAF50" : "#999"}
      />
    </View>
  </Card>
);

// DailyGoalSection Component
const DailyGoalSection = ({ onStartDaily }: { onStartDaily: () => void }) => (
  <View style={styles.section}>
    <Card style={styles.dailyGoalCard}>
      <View style={styles.dailyGoalContent}>
        <View style={styles.dailyGoalHeader}>
          <Feather name="target" size={28} color="#FF9800" />
          <View style={styles.dailyGoalText}>
            <Text style={styles.dailyGoalTitle}>Daily Goal</Text>
            <Text style={styles.dailyGoalSubtitle}>
              Complete 1 lesson today
            </Text>
          </View>
        </View>
        <Button
          title="Start Today's Lesson"
          onPress={onStartDaily}
          variant="secondary"
          size="large"
          fullWidth={true}
        />
      </View>
    </Card>
  </View>
);

// Main Screen Component
export default function LessonsScreen() {
  const [showDemo, setShowDemo] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const handleContinueLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setShowDemo(true);
  };

  const handleDemoComplete = () => {
    setShowDemo(false);
    setSelectedLessonId(null);
    console.log("Demo completed for lesson:", selectedLessonId);
  };

  const handleStartDaily = () => {
    // Find first unstarted or in-progress lesson for daily goal
    const dailyLesson = LESSONS.find((l) => l.progress < 100) || LESSONS[0];
    handleContinueLesson(dailyLesson.id);
  };

  return (
    <>
      <ScreenContainer scrollable={true}>
        <Header />
        <ContinueLearning onContinue={handleContinueLesson} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Lessons</Text>
            <Text style={styles.sectionSubtitle}>
              {LESSONS.length} lessons available
            </Text>
          </View>

          <FlatList
            data={LESSONS}
            renderItem={({ item, index }) => (
              <LessonCard
                lesson={item}
                index={index}
                onPress={() => handleContinueLesson(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.lessonsGrid}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <DailyGoalSection onStartDaily={handleStartDaily} />
      </ScreenContainer>

      <ExerciseDemoModal
        visible={showDemo}
        onClose={() => setShowDemo(false)}
        onComplete={handleDemoComplete}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#130057",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 24 },
  overallProgressCard: { marginBottom: 20 },
  overallProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  overallProgressTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  overallProgressPercent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#130057",
  },
  statsContainer: { flexDirection: "row", justifyContent: "center", gap: 12 },
  statCard: { flex: 1, maxWidth: 160, padding: 16 },
  statContent: { flexDirection: "row", alignItems: "center" },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statText: { flex: 1 },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  statLabel: { fontSize: 12, color: "#666", textTransform: "uppercase" },
  section: { paddingHorizontal: 20, marginTop: 30 },
  sectionHeader: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  sectionSubtitle: { fontSize: 14, color: "#666" },
  continueCard: { padding: 20 },
  continueContent: { gap: 16 },
  continueHeader: { flexDirection: "row", alignItems: "center", gap: 16 },
  lessonIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  continueInfo: { flex: 1 },
  continueTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  continueChinese: { fontSize: 16, color: "#666" },
  continueButton: { marginTop: 8 },
  lessonsGrid: { gap: 12, justifyContent: "space-between" },
  lessonCard: { width: "48%", padding: 16, marginBottom: 12 },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  lessonNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f0ff",
    justifyContent: "center",
    alignItems: "center",
  },
  lessonNumberText: { fontSize: 14, fontWeight: "bold", color: "#130057" },
  lessonIconSmall: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  lessonChinese: { fontSize: 14, color: "#666", marginBottom: 8 },
  lessonMeta: { flexDirection: "row", gap: 12, marginBottom: 12 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, color: "#666" },
  lessonFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  progressText: { fontSize: 12, color: "#666", fontWeight: "500" },
  dailyGoalCard: { padding: 20, backgroundColor: "#FFF3E0", borderWidth: 0 },
  dailyGoalContent: { gap: 20 },
  dailyGoalHeader: { flexDirection: "row", alignItems: "center", gap: 16 },
  dailyGoalText: { flex: 1 },
  dailyGoalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  dailyGoalSubtitle: { fontSize: 14, color: "#666" },
});
