const checkRow = (board, r, c, v) => {
  for (let i = 0; i < 9; i++) {
    if (i !== c) {
      if (board[r][i] === v) {
        return false;
      }
    }
    return true;
  }
};

const checkColumn = (board, r, c, v) => {
  for (let i = 0; i < 9; i++) {
    if (i !== r) {
      if (board[i][c] === v) {
        return false;
      }
    }
    return true;
  }
};

const checkQuadran = (board, r, c, v) => {
  let count = 0;
  for (let i = 0; i < (3 * r, 3 * r + 3); i++) {
    for (let j = 0; j < (3 * 3, 3 * c + 3); j++) {
      if (board[i][j] === v) {
        count += 1;
      }
    }
  }
  return count === 1;
};

const sudokuQuadrantChecker = (strArr) => {
  // for every i in the string array replace x with null and change to array
  let board = [];
  for (let i = 0; i < strArr.length; i++) {
    board.push(strArr[i].replace(/x/g, null));
  }
  console.log(board);
  let res = new Set();
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let v = board[r][c];
      if (v === null) {
        continue;
      }
      const qr = Math.floor(r / 3);
      const qc = Math.floor(c / 3);
      const qnum = 3 * qr + qc + 1;
      if (
        checkRow(board, r, c, v) &&
        checkColumn(board, r, c, v) &&
        checkQuadran(board, qr, qc, v)
      ) {
        continue;
      }
      res.add(qnum);
    }
  }
  if (res.length !== 0) {
    return res;
  }
  return "legal";
};
console.log(
  sudokuQuadrantChecker([
    "(1,2,3,4,5,6,7,8,9)",
    "(x,x,x,x,x,x,x,x,x)",
    "(6,x,5,x,3,x,x,4,x)",
    "(2,x,1,1,x,x,x,x,x)",
    "(x,x,x,x,x,x,x,x,x)",
    "(x,x,x,x,x,x,x,x,x)",
    "(x,x,x,x,x,x,x,x,x)",
    "(x,x,x,x,x,x,x,x,x)",
    "(x,x,x,x,x,x,x,x,9)",
  ])
);
