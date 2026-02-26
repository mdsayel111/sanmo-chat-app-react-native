import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps,
} from "react-native";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
}

export default function TextInput({
  label,
  style,
  ...props
}: CustomTextInputProps) {
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <NativeTextInput
        style={[
          styles.input,
          props.multiline && styles.multilineInput,
          style,
        ]}
        {...props}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 15,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
});