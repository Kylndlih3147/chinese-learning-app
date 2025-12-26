// components/common/ProgressBar.tsx - UPDATED TO REMOVE "PROGRESS" LABEL
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  showLabel?: boolean; // Keep this for other uses
  color?: string;
  backgroundColor?: string;
  animated?: boolean;
  // Add new prop for custom label
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showLabel = true,
  color = "#130057",
  backgroundColor = "#e0e0e0",
  animated = true,
  label, // Optional custom label
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const displayProgress = Math.round(clampedProgress);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(`${clampedProgress}%`, {
        damping: 20,
        stiffness: 90,
      }),
    };
  });

  const staticStyle = {
    width: `${clampedProgress}%`,
  };

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelRow}>
          {/* Use custom label if provided, otherwise show percentage only */}
          <Text style={styles.label}>{label || ""}</Text>
          <Text style={styles.percentage}>{displayProgress}%</Text>
        </View>
      )}

      <View style={[styles.track, { height, backgroundColor }]}>
        <Animated.View
          style={[
            styles.fill,
            animated ? animatedStyle : staticStyle,
            {
              backgroundColor: color,
              height,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  percentage: {
    fontSize: 14,
    color: "#130057",
    fontWeight: "600",
  },
  track: {
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  fill: {
    borderRadius: 4,
  },
});
