function applyMove(board, moveFrom, moveTo) {
    board[moveTo] = board[moveFrom]
    board[moveFrom] = 0
    return board
}

function generateMovesForPiece(board, index) {
    let validMoveIndices = []
    const piece = (board[index] & 7)

    if (piece === 1) {
        if (board[index - 8] === 0) {
            validMoveIndices.push(index - 8)
            if (board[index - 16] === 0 && (index >> 3) === 5) validMoveIndices.push(index - 16)
        }
        if (isCapture(board, index - 7)) validMoveIndices.push(index - 7)
        if (isCapture(board, index - 9)) validMoveIndices.push(index - 9)
    } else if (piece > 3 && (piece & 1) == 0) {
        for (let move = (piece === 4 ? 0x060A0F11 : 0x01070809); move != 0; move >>= 8) {
            if (isValid(board, index - (move & 0xFF))) validMoveIndices.push(index - (move & 0xFF))
            if (isValid(board, index + (move & 0xFF))) validMoveIndices.push(index + (move & 0xFF))
        }
    } else {
        if (piece !== 2) {
            for (let move = index - 1; isValid(board, move); move = move - 1) {
                validMoveIndices.push(move)
                if (isCapture(board, move)) break
            }
            for (let move = index + 1; isValid(board, move); move = move + 1) {
                validMoveIndices.push(move)
                if (isCapture(board, move)) break
            }
            for (let move = index - 8; isValid(board, move); move = move - 8) {
                validMoveIndices.push(move, isCapture(board, index))
                if (isCapture(board, move)) break
            }
            for (let move = index + 8; isValid(board, move); move = move + 8) {
                validMoveIndices.push(move)
                if (isCapture(board, move)) break
            }
        }
        if (piece !== 3) {
            for (let move = index - 7; isValid(board, move); move = move - 7) {
                validMoveIndices.push(move)
                if (isCapture(board, move)) break
            }
            for (let move = index + 7; isValid(board, move); move = move + 7) {
                validMoveIndices.push(move)
                if (isCapture(board, move)) break
            }
            for (let move = index - 9; isValid(board, move); move = move - 9) {
                validMoveIndices.push(move)
                if (isCapture(board, move)) break
            }
            for (let move = index + 9; isValid(board, move); move = move + 9) {
                if (move == 63) break
                validMoveIndices.push(move)
                if (isCapture(board, move)) break
            }
        }
    }

    return validMoveIndices
}

function isValid(board, index) {
    return index > 0
        && (Math.floor(0x7E7E7E7E7E7E00 / Math.pow(2, index)) & 1) == 1
        && ((board[index]) >> 3 === 0)
}

function isCapture(board, index) {
    return board[index] !== 0 && (board[index] >> 3) === 0
}

export {
    applyMove,
    generateMovesForPiece,
    isCapture,
}
