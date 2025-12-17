// components/exercises/CharacterWriting.tsx
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface CharacterWritingProps {
  character: string;
  pinyin: string;
  meaning: string;
  strokeOrder: string[];
  onComplete: (accuracy: number) => void;
}

export const CharacterWriting: React.FC<CharacterWritingProps> = ({
  character,
  pinyin,
  meaning,
  strokeOrder,
  onComplete,
}) => {
  const [currentStroke, setCurrentStroke] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleStrokeComplete = () => {
    if (currentStroke < strokeOrder.length - 1) {
      setCurrentStroke((prev) => prev + 1);
    } else {
      setCompleted(true);
      setTimeout(() => {
        onComplete(100);
      }, 1000);
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 2000);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <View style={styles.characterDisplay}>
          <Text style={styles.character}>{character}</Text>
          <View style={styles.characterInfo}>
            <Text style={styles.pinyin}>{pinyin}</Text>
            <Text style={styles.meaning}>{meaning}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Feather name="edit-3" size={20} color="#666" />
            <Text style={styles.statText}>
              Stroke {currentStroke + 1}/{strokeOrder.length}
            </Text>
          </View>
          <Button
            title="Show Hint"
            onPress={handleShowHint}
            variant="text"
            size="small"
            icon="help-circle"
          />
        </View>
      </Card>

      <Card style={styles.practiceArea}>
        <Text style={styles.practiceTitle}>Practice Writing</Text>

        <View style={styles.characterGrid}>
          {/* This would be replaced with actual drawing canvas */}
          <View style={styles.drawingArea}>
            <View style={styles.gridLines}>
              {Array.from({ length: 9 }).map((_, i) => (
                <View key={`h-${i}`} style={styles.gridLineHorizontal} />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <View key={`v-${i}`} style={styles.gridLineVertical} />
              ))}
            </View>
            <Text style={styles.guideCharacter}>{character}</Text>
            {showHint && (
              <View style={styles.hintOverlay}>
                <Text style={styles.hintText}>Follow the stroke order</Text>
                <Feather name="arrow-up" size={24} color="#FF9800" />
              </View>
            )}
          </View>
        </View>

        <View style={styles.controls}>
          <Button
            title="Clear"
            onPress={() => setCurrentStroke(0)}
            variant="outline"
            size="medium"
            icon="trash-2"
          />
          <Button
            title={
              currentStroke < strokeOrder.length - 1
                ? "Next Stroke"
                : "Complete"
            }
            onPress={handleStrokeComplete}
            variant="primary"
            size="medium"
            icon="check"
            disabled={completed}
          />
        </View>
      </Card>

      <Card style={styles.strokeOrderCard}>
        <Text style={styles.strokeTitle}>Stroke Order</Text>
        <View style={styles.strokeContainer}>
          {strokeOrder.map((stroke, index) => (
            <View
              key={index}
              style={[
                styles.strokeBox,
                index === currentStroke && styles.currentStroke,
                index < currentStroke && styles.completedStroke,
              ]}>
              <Text style={styles.strokeNumber}>{index + 1}</Text>
              <Text style={styles.strokeCharacter}>{stroke}</Text>
            </View>
          ))}
        </View>
      </Card>

      {completed && (
        <Card style={styles.completionCard}>
          <View style={styles.completionContent}>
            <Feather name="award" size={48} color="#FFD166" />
            <Text style={styles.completionTitle}>Excellent!</Text>
            <Text style={styles.completionText}>
              You've completed writing {character}
            </Text>
            <Button
              title="Continue"
              onPress={() => onComplete(100)}
              variant="secondary"
              size="large"
              icon="arrow-right"
              style={styles.continueButton}
            />
          </View>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerCard: { padding: 20, marginBottom: 20 },
  characterDisplay: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  character: {
    fontSize: 48,
    fontFamily: "Noto Sans SC",
    fontWeight: "bold",
    marginRight: 20,
  },
  characterInfo: { flex: 1 },
  pinyin: { fontSize: 20, color: "#D32F2F", marginBottom: 4 },
  meaning: { fontSize: 16, color: "#666" },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stat: { flexDirection: "row", alignItems: "center", gap: 8 },
  statText: { fontSize: 14, color: "#666" },
  practiceArea: { padding: 20, marginBottom: 20 },
  practiceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  characterGrid: { alignItems: "center" },
  drawingArea: {
    width: 200,
    height: 200,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  gridLines: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gridLineHorizontal: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  gridLineVertical: {
    position: "absolute",
    height: "100%",
    width: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  guideCharacter: {
    fontSize: 64,
    fontFamily: "Noto Sans SC",
    color: "rgba(0,0,0,0.2)",
    position: "absolute",
  },
  hintOverlay: {
    position: "absolute",
    backgroundColor: "rgba(255, 152, 0, 0.1)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  hintText: { fontSize: 12, color: "#FF9800", marginBottom: 4 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  strokeOrderCard: { padding: 20 },
  strokeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  strokeContainer: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  strokeBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  currentStroke: { borderColor: "#130057", backgroundColor: "#f0f0ff" },
  completedStroke: { borderColor: "#4CAF50", backgroundColor: "#E8F5E9" },
  strokeNumber: {
    position: "absolute",
    top: 2,
    left: 2,
    fontSize: 10,
    color: "#666",
  },
  strokeCharacter: { fontSize: 20, fontFamily: "Noto Sans SC" },
  completionCard: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 40,
  },
  completionContent: { alignItems: "center" },
  completionTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 16,
  },
  completionText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  continueButton: { marginTop: 20 },
});
