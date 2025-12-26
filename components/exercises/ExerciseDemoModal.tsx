// components/exercises/ExerciseDemoModal.tsx - FIXED VERSION
import { Button } from "@/components/common/Button";
import { CharacterWriting } from "@/components/exercises/CharacterWriting";
import { MatchingExercise } from "@/components/exercises/MatchingExercise";
import { QuizExercise } from "@/components/exercises/QuizExercise";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

interface ExerciseDemoModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

// Exercise samples - MUST HAVE 4 ITEMS
const EXERCISE_SAMPLES = [
  {
    type: "quiz",
    data: {
      question: "你好",
      type: "meaning" as const,
      options: ["Goodbye", "Hello", "Thank you", "Sorry"],
      correctAnswer: "Hello",
    },
    title: "Quiz: Character Meaning",
  },
  {
    type: "matching",
    data: {
      pairs: [
        {
          id: "1",
          left: "你好",
          leftType: "character" as const,
          right: "Hello",
          rightType: "meaning" as const,
        },
        {
          id: "2",
          left: "谢谢",
          leftType: "character" as const,
          right: "Thank you",
          rightType: "meaning" as const,
        },
      ],
    },
    title: "Matching: Connect Pairs",
  },
  {
    type: "quiz",
    data: {
      question: "谢谢",
      type: "meaning" as const,
      options: ["Hello", "Sorry", "Thank you", "Goodbye"],
      correctAnswer: "Thank you",
    },
    title: "Quiz: Translation",
  },
  {
    type: "writing",
    data: {
      character: "人",
      pinyin: "rén",
      meaning: "person, people",
      strokeOrder: ["丿", "㇏"],
    },
    title: "Writing: Practice Character",
  },
];

export const ExerciseDemoModal: React.FC<ExerciseDemoModalProps> = ({
  visible,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(0);
  const [shuffledExercises, setShuffledExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      setIsLoading(true);
      // Always take exactly 4 exercises from the samples
      const shuffled = [...EXERCISE_SAMPLES]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setShuffledExercises(shuffled);
      setStep(0);
      setTimeout(() => setIsLoading(false), 100); // Small delay to prevent flash
    }
  }, [visible]);

  const currentExercise = shuffledExercises[step];

  const handleNext = () => {
    if (step < shuffledExercises.length - 1) {
      setStep((s) => s + 1);
    } else {
      // All exercises completed
      onComplete();
    }
  };

  const handleClose = () => {
    setShuffledExercises([]);
    setStep(0);
    setIsLoading(true);
    onClose();
  };

  const renderExercise = () => {
    if (!currentExercise) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No exercise data available</Text>
          <Button
            title="Continue Anyway"
            onPress={handleNext}
            variant="primary"
            style={styles.continueButton}
          />
        </View>
      );
    }

    switch (currentExercise.type) {
      case "quiz":
        return (
          <QuizExercise
            {...currentExercise.data}
            onAnswer={() => setTimeout(handleNext, 1500)}
          />
        );
      case "matching":
        return (
          <MatchingExercise
            {...currentExercise.data}
            onComplete={() => setTimeout(handleNext, 1500)}
          />
        );
      case "writing":
        return (
          <CharacterWriting
            {...currentExercise.data}
            onComplete={() => setTimeout(handleNext, 1500)}
          />
        );
      default:
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Unknown exercise type: {currentExercise.type}
            </Text>
            <Button
              title="Skip to Next"
              onPress={handleNext}
              variant="outline"
              style={styles.continueButton}
            />
          </View>
        );
    }
  };

  if (isLoading) {
    return (
      <Modal visible={visible}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Preparing exercises...</Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Exercise Demo</Text>
            <Text style={styles.exerciseTitle}>
              {currentExercise?.title || `Exercise ${step + 1}`}
            </Text>
          </View>
          <Button
            title="✕"
            onPress={handleClose}
            variant="text"
            style={styles.closeBtn}
          />
        </View>

        {/* Content */}
        <View style={styles.content}>{renderExercise()}</View>

        {/* Progress */}
        <View style={styles.footer}>
          <View style={styles.progress}>
            {shuffledExercises.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === step && styles.activeDot]}
              />
            ))}
          </View>
          <Text style={styles.hint}>
            {step + 1} of {shuffledExercises.length}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: { fontSize: 16, color: "#666" },
  header: {
    backgroundColor: "#130057",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  exerciseTitle: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 },
  closeBtn: { padding: 0, minWidth: 40 },
  content: { flex: 1, padding: 20 },
  footer: { padding: 20, alignItems: "center" },
  progress: { flexDirection: "row", gap: 8, marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ccc" },
  activeDot: { backgroundColor: "#130057", width: 16 },
  hint: { fontSize: 12, color: "#666", textAlign: "center" },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  continueButton: { marginTop: 10 },
});
