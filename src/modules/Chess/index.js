import styles from './style.module.css';
import { Chess } from 'chess.js';

const initBoard = () => {
  setTimeout(() => {
    console.log('loaded', document.getElementById('board'));
    Chessboard('board', {
      draggable: true,
      dropOffBoard: 'trash',
      sparePieces: true,
    });
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
