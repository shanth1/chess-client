import styles from './style.module.css';

const initBoard = () => {
  setTimeout(() => {
    Chessboard('board', {
      pieceTheme: 'assets/{piece}.png',
      position: 'start',
      draggable: true,
      dropOffBoard: 'trash',
      sparePieces: false,
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
