function MatrixChallenge(strArr) {

  // code goes here  
  const board = [[]]; // the complete sudoko grid
  const quadrant = [[]]; // the quadrant which holds value wether it's ok or not.
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      quadrant.push([]);
      quadrant[i].push("0");
    }
  }

  for (let i = 0; i < 9; i++) {
    strArr[i] = strArr[i].replace("(", "")
    strArr[i] = strArr[i].replace(")", "")
    const row = strArr[i].replace(/,/g, "")
    for (let j = 0; j < 9; j++) {
      board.push([])
      board[i].push(row[j])
    }
  }

  for (let i = 0; i < 9; i++) {
    check(board[i].join(""), i, 0)
  }

  for (let i = 0; i < 9; i++) {
    let myCol = ""
    for (let j = 0; j < 9; j++) {
      myCol += board[j][i]
    }
    check(myCol, i, 1)
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const strQuadrant = getNumbersFromQuadrant(i, j)
      if (!check(strQuadrant, 0, 2)) quadrant[i][j] = "1"
    }
  }

  function check(str, num, type) {
    let checkRetval = true;
    const isRow = 0;
    const isCol = 1;

    for (let i = 0; i < 9; i++) {
      if (str[i] !== "x") {
        const searchString = str.substring(0, i) + str.substring(i + 1)

        for (let j = 0; j < 8; j++) {
          if (str[i] === searchString[j]) {
            checkRetval = false
            let x = 0
            let y = 0
            if (type === isRow) {
              x = parseInt(num / 3, 10)
              y = parseInt(i / 3, 10)
              quadrant[x][y] = "1"
            } else if (type === isCol) {
              x = parseInt(i / 3, 10)
              y = parseInt(num / 3, 10)
              quadrant[x][y] = "1"
            }
          }
        }
      }
    }
    return checkRetval
  }

  // function helper untuk mendapatkan number dari quadrant
   function getNumbersFromQuadrant(x, y) {
    x *= 3
    y *= 3
    const x2 = x + 3
    const y2 = y + 3
    let retVal = ""
    for (let i = x; i < x2; i++) {
      for (let j = y; i < y2; j++) {
        retVal += board[i][j]
      }
    }
    return retVal
  }




  let quadrantError = 0
  let retVal = ""
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      quadrantError++
      if (quadrant[i][j] === "1") retVal += quadrantError + ","
    }
  }

  retVal = retVal.substring(0, retVal.length - 1)
  if (retVal !== "") return retVal
  else return "legal"

}

// keep this function call here 
const inputParam = [
  "(1,2,3,4,5,6,7,8,9)",
  "(x,x,x,x,x,x,x,x,x)",
  "(6,x,5,x,3,x,x,4,x)",
  "(2,x,1,1,x,x,x,x,x)",
  "(x,x,x,x,x,x,x,x,x)",
  "(x,x,x,x,x,x,x,x,x)",
  "(x,x,x,x,x,x,x,x,x)",
  "(x,x,x,x,x,x,x,x,x)",
  "(x,x,x,x,x,x,x,x,9)",
];
console.log(MatrixChallenge(inputParam));
