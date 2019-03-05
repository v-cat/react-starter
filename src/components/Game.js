import React from 'react';
import Board from './Board';
import ShoppingList from './ShoppingList';
import { calculateWinner } from '../utils/calculate';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stapNumber: 0,
            xIsNext: true,
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stapNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stapNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            stapNumber: step,
            xIsNext: (step % 2) === 0
            // xIsNext: (step % 2) ? false : true
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stapNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Move#' + move : 'Game start';
            return (
                <li key={move}>
                    {/* <a href="#" onClick={() => this.jumpTo(move)}>
                        {desc}
                    </a> */}
                    <button onClick={
                        () => this.jumpTo(move)
                    }>
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'winner:' + winner;
        } else {
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />
                    <ShoppingList name="Mark" />,
                </div>
                <div className="game-info">
                    <div>
                        {status}
                    </div>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}