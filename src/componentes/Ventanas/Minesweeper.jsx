import React, { useState, useEffect } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { Frame } from 'react95';

function Minesweeper({ onClose }) {
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds to complete
    const rows = 8;
    const cols = 8;
    const mines = 10;

    useEffect(() => {
        initializeBoard();
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleGameOver();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (win) {
            setTimeout(() => {
                onClose();
            }, 1000);
        }
    }, [win]);

    const initializeBoard = () => {
        const newBoard = [];
        for (let i = 0; i < rows; i++) {
            newBoard[i] = [];
            for (let j = 0; j < cols; j++) {
                newBoard[i][j] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                };
            }
        }

        // Place mines randomly
        let minesPlaced = 0;
        while (minesPlaced < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (!newBoard[row][col].isMine) {
                newBoard[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate neighbor mines
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!newBoard[i][j].isMine) {
                    newBoard[i][j].neighborMines = countNeighborMines(newBoard, i, j);
                }
            }
        }

        setBoard(newBoard);
    };

    const countNeighborMines = (board, row, col) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    if (board[newRow][newCol].isMine) count++;
                }
            }
        }
        return count;
    };

    const handleClick = (row, col) => {
        if (gameOver || board[row][col].isFlagged) return;

        const newBoard = [...board];
        if (newBoard[row][col].isMine) {
            handleGameOver();
            return;
        }

        revealCell(newBoard, row, col);
        setBoard(newBoard);

        // Check win condition
        if (checkWin(newBoard)) {
            setWin(true);
        }
    };

    const revealCell = (board, row, col) => {
        if (row < 0 || row >= rows || col < 0 || col >= cols || 
            board[row][col].isRevealed || board[row][col].isFlagged) return;

        board[row][col].isRevealed = true;

        if (board[row][col].neighborMines === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    revealCell(board, row + i, col + j);
                }
            }
        }
    };

    const handleRightClick = (e, row, col) => {
        e.preventDefault();
        if (gameOver || board[row][col].isRevealed) return;

        const newBoard = [...board];
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
        setBoard(newBoard);
    };

    const handleGameOver = () => {
        setGameOver(true);
        const newBoard = board.map(row => 
            row.map(cell => ({
                ...cell,
                isRevealed: true
            }))
        );
        setBoard(newBoard);
        setTimeout(() => {
            onClose();
        }, 1000);
    };

    const checkWin = (board) => {
        return board.every(row => 
            row.every(cell => 
                (cell.isMine && !cell.isRevealed) || (!cell.isMine && cell.isRevealed)
            )
        );
    };

    const getCellColor = (cell) => {
        if (cell.isFlagged) return '#c0c0c0';
        if (!cell.isRevealed) return '#c0c0c0';
        if (cell.isMine) return 'red';
        return '#e0e0e0';
    };

    const getCellContent = (cell) => {
        if (cell.isFlagged) return '🚩';
        if (!cell.isRevealed) return '';
        if (cell.isMine) return '💣';
        return cell.neighborMines || '';
    };

    const getNumberColor = (number) => {
        const colors = ['', 'blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
        return colors[number] || 'black';
    };

    return (
        <Window style={{ width: '400px' }}>
            <WindowHeader className='window-header'>
                <span>Minesweeper</span>
                <Button onClick={onClose} style={{ position: 'absolute', right: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>X</span>
                </Button>
            </WindowHeader>
            <WindowContent>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <Frame variant="well" style={{ padding: '5px 10px' }}>
                        Time: {timeLeft}s
                    </Frame>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 30px)`, gap: '1px' }}>
                    {board.map((row, rowIndex) => (
                        row.map((cell, colIndex) => (
                            <Frame
                                key={`${rowIndex}-${colIndex}`}
                                variant="well"
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: getCellColor(cell),
                                    cursor: gameOver ? 'default' : 'pointer',
                                    userSelect: 'none'
                                }}
                                onClick={() => handleClick(rowIndex, colIndex)}
                                onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                            >
                                <span style={{ 
                                    color: cell.isRevealed && !cell.isMine ? getNumberColor(cell.neighborMines) : 'black',
                                    fontWeight: 'bold'
                                }}>
                                    {getCellContent(cell)}
                                </span>
                            </Frame>
                        ))
                    ))}
                </div>
                {(gameOver || win) && (
                    <div style={{ 
                        textAlign: 'center', 
                        marginTop: '10px',
                        fontWeight: 'bold',
                        color: win ? 'green' : 'red'
                    }}>
                        {win ? '¡Ganaste!' : '¡Game Over!'}
                    </div>
                )}
            </WindowContent>
        </Window>
    );
}

export default Minesweeper; 