import React, { useState } from 'react';
import type { PecaCor, TabuleiroState } from '../../Logic/tchessTypes';

import { inicialTabuleiro } from '../../Logic/tchessLogic';
import { FaChessKing, FaChessQueen, FaChessBishop, FaChessKnight, FaChessRook, FaChessPawn } from 'react-icons/fa';


interface Posicao {
    linha: number;
    coluna: number;
}

export const Tabuleiro: React.FC = () => {

    const [tabuleiro, setTabuleiro] = useState<TabuleiroState>(inicialTabuleiro());
    const [pecaSelecionada, setpecaSelecionada] = useState<Posicao | null>(null);
    const [currentTurn, setCurrentTurn] = useState<PecaCor>('branco');
    const [actions, setActions] = useState(0);

    const handleTurnChange = () => {
        setCurrentTurn(prevTurn =>
            prevTurn === 'preto' ? 'branco' : 'preto'
        );
        setActions(0); // Reseta ações do turno anterior
        console.log(`Turno mudado para: ${currentTurn}`);
    };

    //Mapeamento das peças 
    const pecaSimbolos = {
        branco: { rei: <FaChessKing className='text-[#D4A35C]' />, rainha: <FaChessQueen className='text-[#D4A35C]' />, bispo: <FaChessBishop className='text-[#D4A35C]' />, cavalo: <FaChessKnight className='text-[#D4A35C]' />, torre: <FaChessRook className='text-[#D4A35C]' />, peao: <FaChessPawn className='text-[#D4A35C]' /> },
        preto: { rei: <FaChessKing className='text-[#A62E2E]' />, rainha: <FaChessQueen className='text-[#A62E2E]' />, bispo: <FaChessBishop className='text-[#A62E2E]' />, cavalo: <FaChessKnight className='text-[#A62E2E]' />, torre: <FaChessRook className='text-[#A62E2E]' />, peao: <FaChessPawn className='text-[#A62E2E]' /> },
    }

    function handleClick(linha: number, col: number) {
        const selectedLinha = linha
        const selectedCol = col

        if (pecaSelecionada) {
            if (pecaSelecionada.linha === selectedLinha && pecaSelecionada.coluna === selectedCol) {
                if (tabuleiro[linha][col] !== null) {
                    setpecaSelecionada({ linha: linha, coluna: col })
                }
            } else {
                const novoTabuleiro = tabuleiro.map((t) => [...t])
                const valorMovimento = novoTabuleiro[pecaSelecionada.linha][pecaSelecionada.coluna]

                novoTabuleiro[linha][col] = valorMovimento;
                novoTabuleiro[pecaSelecionada.linha][pecaSelecionada.coluna] = null;

                setTabuleiro(novoTabuleiro);
                setpecaSelecionada(null);

                setActions(prev => prev + 1);

                if (actions < 1) {
                    handleTurnChange();
                }
            }

        } else {
            if (tabuleiro[linha][col] !== null) {
                setpecaSelecionada({ linha: linha, coluna: col })
            }
        }
    }

    return (
        <div className='flex flex-col-reverse justify-center items-center'>
            <div className='flex justify-center items-center h-1/2 bg-[#2D241E]'>
                <div className='grid grid-cols-8 grid-rows-8 border-4 border-[#3E322A]'>
                    {tabuleiro.map((linha, linhaIndex) =>
                        linha.map((peca, colIndex) => {
                            const isDark = (linhaIndex + colIndex) % 2 === 1;
                            const backgroundColor = isDark ? 'bg-[#4A5D4E]' : 'bg-[#E8D8C8]';

                            const isSelecionado =
                                pecaSelecionada?.linha === linhaIndex && pecaSelecionada?.coluna === colIndex;

                            return (
                                <div
                                    key={`${linhaIndex}-${colIndex}`}
                                    className={`${backgroundColor} p-1 flex justify-center items-center 
                                            ${isSelecionado
                                            ? 'bg-yellow-400 text-white font-bold scale-95 shadow-inner'
                                            : ''
                                        }`}
                                    onClick={() => handleClick(linhaIndex, colIndex)}
                                >
                                    {peca && (
                                        <span>
                                            {pecaSimbolos[peca.cor][peca.tipo]}
                                        </span>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <div>
                Turno: {currentTurn === 'branco' ? 'branco' : 'preto'}
            </div>
        </div >
    );
};

