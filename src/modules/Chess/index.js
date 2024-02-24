import { Chess } from 'chess.js';
import { connection } from '../../app/connection';
import styles from './style.module.css';

const initBoard = () => {
  setTimeout(() => {
    function onDragStart(_, piece) {
      if (game.isGameOver()) return false;

      if (
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)
      ) {
        return false;
      }
    }

    function onDrop(source, target) {
      try {
        var move = game.move({
          from: source,
          to: target,
          promotion: 'q',
        });
        if (connection.dataChannel) {
          const movePresentation = JSON.stringify({ message: '', move });
          connection.dataChannel.send(movePresentation);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    function onSnapEnd() {
      board.position(game.fen());
    }

    const game = new Chess();
    const board = Chessboard('board', {
      pieceTheme: 'assets/{piece}.png',
      position: 'start',
      draggable: true,
      dropOffBoard: 'trash',
      sparePieces: false,
      onDragStart,
      onDrop,
      onSnapEnd,
    });

    if (connection.dataChannel) {
      connection.dataChannel.addEventListener('message', () => {
        const move = JSON.parse(event.data).move;
        if (move) {
          game.move(move);
          board.position(game.fen());
        }
      });
    }
  });
};

export default () => {
  const element = document.createElement('div');
  element.classList.add(styles.module);

  const boardElement = document.createElement('div');
  boardElement.id = 'board';
  boardElement.classList.add(styles.board);

  initBoard();
  element.appendChild(boardElement);
  return element;
};
