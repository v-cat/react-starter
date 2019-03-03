import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // constructor() {
//     //     super(); // 调用父类的constructor(x, y)
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//     render() {
//         return (
//             <button className='square' onClick={() => this.props.onClick()}>
//                 {/*TODO*/}
//                 {this.props.value}
//             </button>
//         );
//     }
// }
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,

        });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} />;
    }
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            // status = 'winner:' + winner;
            status = 'the winner is' + winner
            // alert('the winner is' + winner)

            // console.log(winner);

        } else {
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }
        // const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        return (
            <div>
                <div className="status">
                    {status}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                    <ShoppingList name="Mark" />,
                </div>
                <div className="game-info">
                    <div>
                        {/* status  */}
                    </div>
                    <ol>
                        {/*TODO */}
                    </ol>
                </div>
            </div>
        );
    }
}
// class ShoppingList extends React.Component {
//     render() {
//         return (
//             <div className="shopping-list">
//                 <h1 >
//                     Shopping List for{this.props.name}
//                 </h1>
//                 <ul>
//                     <li>
//                         Instagram
//                     </li>
//                     <li>
//                         WhatsApp
//                     </li>
//                     <li>
//                         Oculus
//                     </li>
//                 </ul>
//             </div>
//         )
//     }
// }
class ShoppingList extends React.Component {
    render() {
        return (
            React.createElement("div", {
                className: 'shopping-list'
            },
                React.createElement("h1", { className: 'shoppingli' }, null, "Shopping List for", this.props.name),
                React.createElement("ul", null, React.createElement("li", null, "Instagram"),
                    React.createElement("li", null, "WhatsApp"),
                    React.createElement("li", null, "Oculus")
                )
            )
        )
    }
}

// ============================================

ReactDOM.render(
    <Game />,

    document.getElementById('root')
);
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}