import CustomNavBar from "@/components/CustomNavBar";
import { Tabs } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Tabs tabBar={(props) => <CustomNavBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: "Lesson" }} />
      <Tabs.Screen name="search" options={{ title: "Explorer" }} />
      <Tabs.Screen name="analytics" options={{ title: "Ai Assistant" }} />
      <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
      <Tabs.Screen name="profile" options={{ title: "Personal" }} />
    </Tabs>
  );
}
