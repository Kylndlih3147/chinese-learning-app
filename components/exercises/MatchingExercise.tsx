// components/exercises/MatchingExercise.tsx - SIMPLE WORKING VERSION
import { Card } from "@/components/common/Card";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MatchingExerciseProps {
  pairs: {
    id: string;
    left: string;
    right: string;
    leftType: "character" | "pinyin";
    rightType: "meaning" | "character";
  }[];
  onComplete: (score: number) => void;
}

export const MatchingExercise: React.FC<MatchingExerciseProps> = ({
  pairs,
  onComplete,
}) => {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());

  // Shuffle right items
  const rightItems = useMemo(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  }, [pairs]);

  // Check for completion
  useEffect(() => {
    if (matchedPairs.size === pairs.length) {
      // Changed from pairs.length * 2
      console.log("✅ All pairs matched! Moving to next...");
      setTimeout(() => {
        onComplete(pairs.length);
      }, 1000);
    }
  }, [matchedPairs, pairs.length, onComplete]);

  const handleLeftSelect = (id: string) => {
    if (matchedPairs.has(id)) return;
    setSelectedLeftId(id);
    if (selectedRightId) {
      checkMatch(id, selectedRightId);
    }
  };

  const handleRightSelect = (id: string) => {
    if (matchedPairs.has(id)) return;
    setSelectedRightId(id);
    if (selectedLeftId) {
      checkMatch(selectedLeftId, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    // Find the original pair for left
    const leftPair = pairs.find((p) => p.id === leftId);
    // Find where this rightId is in the shuffled array
    const rightPair = rightItems.find((p) => p.id === rightId);

    // They match if they have the SAME ID (same original pair)
    if (leftPair && rightPair && leftId === rightId) {
      // Correct match - only add ONE ID to matchedPairs
      setMatchedPairs((prev) => new Set([...prev, leftId]));

      // Reset selection
      setTimeout(() => {
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }, 300);
    } else {
      // Wrong match
      setTimeout(() => {
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }, 500);
    }
  };

  const isMatched = (id: string) => matchedPairs.has(id);
  const isSelected = (id: string) =>
    selectedLeftId === id || selectedRightId === id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match the pairs</Text>
      <Text style={styles.subtitle}>
        Tap one from left, then one from right
      </Text>

      <View style={styles.columns}>
        {/* Left Column */}
        <View style={styles.column}>
          {pairs.map((pair) => (
            <TouchableOpacity
              key={`left-${pair.id}`}
              style={[
                styles.item,
                styles.leftItem,
                selectedLeftId === pair.id && styles.selectedItem,
                isMatched(pair.id) && styles.matchedItem,
              ]}
              onPress={() => handleLeftSelect(pair.id)}
              disabled={isMatched(pair.id)}>
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>
                  {pair.leftType === "character" ? pair.left : `"${pair.left}"`}
                </Text>
                {isMatched(pair.id) && (
                  <Feather name="check" size={16} color="#4CAF50" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Right Column - Shuffled */}
        <View style={styles.column}>
          {rightItems.map((pair) => (
            <TouchableOpacity
              key={`right-${pair.id}`}
              style={[
                styles.item,
                styles.rightItem,
                selectedRightId === pair.id && styles.selectedItem,
                isMatched(pair.id) && styles.matchedItem,
              ]}
              onPress={() => handleRightSelect(pair.id)}
              disabled={isMatched(pair.id)}>
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>
                  {pair.rightType === "character"
                    ? pair.right
                    : `"${pair.right}"`}
                </Text>
                {isMatched(pair.id) && (
                  <Feather name="check" size={16} color="#4CAF50" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.progress}>
        <Text style={styles.progressText}>
          {matchedPairs.size} of {pairs.length} matched {/* Removed / 2 */}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(matchedPairs.size / pairs.length) * 100}%` }, // Removed * 2
            ]}
          />
        </View>
      </View>

      {/* Debug info */}
      <Card style={styles.debugCard}>
        <Text style={styles.debugText}>
          Selected: Left={selectedLeftId || "none"}, Right=
          {selectedRightId || "none"} | Matched IDs:{" "}
          {Array.from(matchedPairs).join(", ") || "none"}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  columns: { flexDirection: "row", justifyContent: "space-between", flex: 1 },
  column: { width: "48%" },
  item: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: "#FFF",
    marginBottom: 12,
    minHeight: 60,
    justifyContent: "center",
  },
  leftItem: { borderColor: "#130057" },
  rightItem: { borderColor: "#FF9800" },
  selectedItem: { backgroundColor: "#f0f0ff", borderColor: "#4CAF50" },
  matchedItem: { backgroundColor: "#E8F5E9", borderColor: "#4CAF50" },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontFamily: "Noto Sans SC",
    fontWeight: "500",
    color: "#333",
  },
  progress: { marginTop: 24, marginBottom: 16 },
  progressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#4CAF50", borderRadius: 3 },
  debugCard: { marginTop: 12, padding: 8, backgroundColor: "#FFF3E0" },
  debugText: { fontSize: 10, color: "#666", textAlign: "center" },
});
