// app/(tabs)/analytics.tsx - FIXED WITH MARGIN
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Message = { id: string; text: string; sender: "user" | "ai" };

export default function AIChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "This is AI assistant placeholder", sender: "ai" },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      text: message,
      sender: "user" as const,
    };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        text: `thinking："${message}"...`,
        sender: "ai" as const,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <View style={styles.screen}>
      {/* Added safe area wrapper */}
      <View style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Assistant</Text>
          <Text style={styles.subtitle}>Ask about Chinese</Text>
        </View>

        <ScrollView
          style={styles.chat}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[styles.msgBox, msg.sender === "user" && styles.userBox]}>
              <View
                style={[
                  styles.bubble,
                  msg.sender === "user" ? styles.userBubble : styles.aiBubble,
                ]}>
                <Text
                  style={
                    msg.sender === "user" ? styles.userText : styles.aiText
                  }>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Type question..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Feather name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  safeArea: {
    flex: 1,
    marginBottom: 80, // KEY: Add margin at bottom for navigation bar
  },
  header: {
    backgroundColor: "#7ef714",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
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

  chat: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20, // Normal padding now
  },

  msgBox: {
    marginBottom: 12,
  },
  userBox: {
    alignItems: "flex-end",
  },

  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: "#7ef714",
    borderTopRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  aiText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    marginRight: 12,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#7ef714",
    justifyContent: "center",
    alignItems: "center",
  },
});
