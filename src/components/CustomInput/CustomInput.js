import { StyleSheet, Text, Dimensions, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");
export default function CustomInput({
  innerRef,
  onFocus,
  selectTextOnFocus,
  value,
  style,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoFocus,
  paddingVertical,
  editable,
  returnKeyType,
  onSubmitEditing,
  onChangeText,
  disabled,
}) {
  return (
    <View style={styles.root}>
      <TextInput
      
        selectTextOnFocus={selectTextOnFocus}
        ref={innerRef}
        onFocus={onFocus}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        style={[style, styles.input]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        editable={editable}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // backgroundColor: "#DEE0E2",
    borderRadius: 30,
    paddingHorizontal: width * 0.01,
    paddingVertical: height * 0.01,
    // marginVertical: height * 0.005,

    // marginHorizontal: '2.5%',

    flex: 1,
    // backgroundColor:'red'
  },

  input: {
    // paddingVertical: height * 0.01,
    // backgroundColor: 'red',
    fontSize: RFPercentage(2),
  },
});
