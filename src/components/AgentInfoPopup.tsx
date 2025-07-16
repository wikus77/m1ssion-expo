import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";

interface AgentInfoPopupProps {
  visible: boolean;
  onClose: () => void;
  agentName: string;
  agentRank: string;
}

const AgentInfoPopup = ({
  visible,
  onClose,
  agentName,
  agentRank,
}: AgentInfoPopupProps) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Agent Info</Text>
          <Text style={styles.text}>Name: {agentName}</Text>
          <Text style={styles.text}>Rank: {agentRank}</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>CLOSE</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    width: "80%",
    padding: 20,
    backgroundColor: "#111",
    borderRadius: 12,
    borderColor: "#0ff",
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    color: "#0ff",
    fontWeight: "700",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#0ff",
    borderRadius: 6,
  },
  closeText: {
    color: "#000",
    fontWeight: "600",
  },
});

export default AgentInfoPopup;
