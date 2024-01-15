import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import params from "./src/params";

import MineField from "./src/components/MineField";
import {
  createMinedBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  cloneBoard,
} from "./src/functions";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: createMinedBoard(
        params.getRowsAmount(),
        params.getColumnsAmount(),
        this.minesAmount()
      ),
    };
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultlevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
    };
  };

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert("perdeeeu!");
    }
    if (won) {
      Alert.alert("parabens, não esperava menos de voce");
    }

    this.setState({ board, lost, won });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>iniciando o Mines!</Text>
        <Text>
          Tamanho da grade: {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  board: {
    alignItems: "center",
    backgroundColor: "#aaa",
  },
});

export default App;
