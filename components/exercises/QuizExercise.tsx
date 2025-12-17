// components/exercises/QuizExercise.tsx
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface QuizExerciseProps {
  question: string;
  type: "character" | "pinyin" | "meaning" | "audio";
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
  showExplanation?: boolean;
}

export const QuizExercise: React.FC<QuizExerciseProps> = ({
  question,
  type,
  options,
  correctAnswer,
  onAnswer,
  showExplanation = true,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const correct = answer === correctAnswer;
    setIsCorrect(correct);

    setTimeout(() => {
      setShowResult(true);
      setTimeout(() => {
        onAnswer(correct);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowResult(false);
      }, 1500);
    }, 500);
  };

  const getQuestionIcon = () => {
    switch (type) {
      case "character":
        return "type";
      case "pinyin":
        return "volume-2";
      case "meaning":
        return "book";
      case "audio":
        return "headphones";
      default:
        return "help-circle";
    }
  };

  const getQuestionType = () => {
    switch (type) {
      case "character":
        return "Choose the correct meaning";
      case "pinyin":
        return "Choose the correct pinyin";
      case "meaning":
        return "Choose the correct character";
      case "audio":
        return "Listen and choose";
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <View style={styles.questionIcon}>
            <Feather name={getQuestionIcon()} size={24} color="#130057" />
          </View>
          <Text style={styles.questionType}>{getQuestionType()}</Text>
        </View>

        <Text style={styles.questionText}>{question}</Text>

        {type === "audio" && (
          <Button
            title="Play Audio"
            onPress={() => console.log("Play audio")}
            variant="outline"
            size="small"
            icon="play"
            style={styles.audioButton}
          />
        )}
      </Card>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isRightAnswer = option === correctAnswer;

          let optionStyle = styles.option;
          let textStyle = styles.optionText;

          if (isSelected && showResult) {
            optionStyle = isCorrect ? styles.correctOption : styles.wrongOption;
            textStyle = styles.selectedOptionText;
          } else if (showResult && isRightAnswer) {
            optionStyle = styles.correctOption;
            textStyle = styles.selectedOptionText;
          } else if (isSelected) {
            optionStyle = styles.selectedOption;
            textStyle = styles.selectedOptionText;
          }

          return (
            <Button
              key={index}
              title={option}
              onPress={() => handleSelect(option)}
              variant="outline"
              size="large"
              style={[optionStyle, styles.optionButton]}
              textStyle={textStyle}
              disabled={!!selectedAnswer}
              icon={showResult && isRightAnswer ? "check" : undefined}
              iconPosition="right"
            />
          );
        })}
      </View>

      {showResult && showExplanation && (
        <Card
          style={[
            styles.explanationCard,
            isCorrect ? styles.correctExplanation : styles.wrongExplanation,
          ]}>
          <View style={styles.explanationHeader}>
            <Feather
              name={isCorrect ? "check-circle" : "x-circle"}
              size={24}
              color={isCorrect ? "#4CAF50" : "#F44336"}
            />
            <Text style={styles.explanationTitle}>
              {isCorrect ? "Correct!" : "Incorrect"}
            </Text>
          </View>
          <Text style={styles.explanationText}>
            The correct answer is: {correctAnswer}
          </Text>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  questionCard: { padding: 24, marginBottom: 24 },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  questionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f0f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  questionType: { fontSize: 14, color: "#666", fontWeight: "500" },
  questionText: {
    fontSize: 28,
    fontFamily: "Noto Sans SC",
    fontWeight: "bold",
    textAlign: "center",
  },
  audioButton: { marginTop: 16, alignSelf: "center" },
  optionsContainer: { gap: 12 },
  optionButton: { borderWidth: 2 },
  option: { borderColor: "#E0E0E0", backgroundColor: "#FFF" },
  selectedOption: { borderColor: "#130057", backgroundColor: "#f0f0ff" },
  correctOption: { borderColor: "#4CAF50", backgroundColor: "#E8F5E9" },
  wrongOption: { borderColor: "#F44336", backgroundColor: "#FFEBEE" },
  optionText: { color: "#333" },
  selectedOptionText: { fontWeight: "600" },
  explanationCard: { marginTop: 24, padding: 20 },
  correctExplanation: { backgroundColor: "#E8F5E9" },
  wrongExplanation: { backgroundColor: "#FFEBEE" },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#333",
  },
  explanationText: { fontSize: 16, color: "#666", lineHeight: 24 },
});
