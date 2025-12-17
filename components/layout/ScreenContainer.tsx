import React from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = true,
  style,
  contentContainerStyle,
}) => {
  if (scrollable) {
    return (
      <View style={[styles.screen, style]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={false}>
          {children}
          {/* Space for navigation bar */}
          <View style={styles.navBarSpace} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.screen, style]}>
      {children}
      <View style={styles.navBarSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  navBarSpace: {
    height: 100,
  },
});
