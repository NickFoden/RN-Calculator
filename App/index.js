import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

import Row from "./components/Row";
import Button from "./components/Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end"
  },
  value: {
    color: "#fff",
    fontSize: 40,
    marginBottom: 10,
    marginRight: 20,
    textAlign: "right"
  }
});
export default class App extends React.Component {
  state = {
    currentValue: "0",
    operator: null,
    previousValue: null
  };

  handleTap = (type, value) => {
    this.setState(state => {
      if (type === "number") {
        if (state.currentValue === "0") {
          return { currentValue: `${value}` };
        }
        return { currentValue: `${state.currentValue}${value}` };
      }

      if (type === "operator") {
        return {
          currentValue: "0",
          operator: value,
          previousValue: state.currentValue
        };
      }

      if (type === "equal") {
        const { currentValue, previousValue, operator } = state;

        const current = parseFloat(currentValue);
        const previous = parseFloat(previousValue);
        const resetState = {
          operator: null,
          previousValue: null
        };
        if (operator === "/") {
          return {
            currentValue: previous / current,
            ...resetState
          };
        }

        if (operator === "*") {
          return {
            currentValue: previous * current,
            ...resetState
          };
        }

        if (operator === "+") {
          return {
            currentValue: previous + current,
            ...resetState
          };
        }

        if (operator === "-") {
          return {
            currentValue: previous - current,
            ...resetState
          };
        }
      }
      return state;
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>
          <Row>
            <Button text="C" theme="secondary" onPress={() => alert("todo")} />
            <Button
              text="+/-"
              theme="secondary"
              onPress={() => alert("todo")}
            />
            <Button text="%" theme="secondary" onPress={() => alert("todo")} />
            <Button
              text="/"
              theme="secondary"
              onPress={() => this.handleTap("operator", "/")}
            />
          </Row>
          <Row>
            <Button text="7" onPress={() => this.handleTap("number", 7)} />
            <Button text="8" onPress={() => this.handleTap("number", 8)} />
            <Button text="9" onPress={(() => this.handleTap("number"), 9)} />
            <Button
              text="*"
              theme="accent"
              onPress={() => this.handleTap("operator", "*")}
            />
          </Row>

          <Row>
            <Button text="4" onPress={() => this.handleTap("number", 4)} />
            <Button text="5" onPress={() => this.handleTap("number", 5)} />
            <Button text="6" onPress={() => this.handleTap("number", 6)} />
            <Button
              text="-"
              theme="accent"
              onPress={() => this.handleTap("operator", "-")}
            />
          </Row>
          <Row>
            <Button text="1" onPress={() => this.handleTap("number", 1)} />
            <Button text="2" onPress={() => this.handleTap("number", 2)} />
            <Button text="3" onPress={() => this.handleTap("number", 3)} />
            <Button
              text="+"
              theme="accent"
              onPress={() => this.handleTap("operator", "+")}
            />
          </Row>
          <Row>
            <Button
              text="0"
              size="double"
              onPress={() => this.handleTap("number", 0)}
            />
            <Button text="." onPress={() => this.handleTap("number", ".")} />
            <Button
              text="="
              theme="accent"
              onPress={() => this.handleTap("equal")}
            />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}
