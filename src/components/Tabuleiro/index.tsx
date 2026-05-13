import React, { useState } from 'react';
import type { TabuleiroState } from '../../Logic/tchessTypes';

import { inicialTabuleiro } from '../../Logic/tchessLogic';
import { FaChessKing, FaChessQueen, FaChessBishop, FaChessKnight, FaChessRook, FaChessPawn } from 'react-icons/fa';

// 1. Define o tipo da sua matriz (ex: uma matriz 3x3 de números)

interface Posicao {
    linha: number;
    coluna: number;
}

export const Tabuleiro: React.FC = () => {

    const [tabuleiro, setTabuleiro] = useState<TabuleiroState>(inicialTabuleiro());
    const [ativo, setAtivo] = useState<boolean>(false);
    const [itemSelecionado, setItemSelecionado] = useState<Posicao | null>(null);

    const bordas = ['border-0', 'border-2 border-yellow-500']

    //Mapeamento das peças 
    const pecaSimbolos = {
        branco: { rei: <FaChessKing className='text-[#D4A35C]' />, rainha: <FaChessQueen className='text-[#D4A35C]' />, bispo: <FaChessBishop className='text-[#D4A35C]' />, cavalo: <FaChessKnight className='text-[#D4A35C]' />, torre: <FaChessRook className='text-[#D4A35C]' />, peao: <FaChessPawn className='text-[#D4A35C]' /> },
        preto: { rei: <FaChessKing className='text-[#A62E2E]' />, rainha: <FaChessQueen className='text-[#A62E2E]' />, bispo: <FaChessBishop className='text-[#A62E2E]' />, cavalo: <FaChessKnight className='text-[#A62E2E]' />, torre: <FaChessRook className='text-[#A62E2E]' />, peao: <FaChessPawn className='text-[#A62E2E]' /> },
    }

    function handleClick(linha: number, col: number) {
        const valorClicado = tabuleiro[linha][col]
        setItemSelecionado({ linha: linha, coluna: col })
        alert(`Você clicou em: ${valorClicado} (Linha: ${linha}, Coluna: ${col})`)
    }



    return (
        <div className='flex justify-center items-center h-screen bg-[#2D241E]'>
            <div className='grid grid-cols-8 grid-rows-8 border-4 border-[#3E322A]'>
                {tabuleiro.map((linha, linhaIndex) =>
                    linha.map((peca, colIndex) => {
                        const isDark = (linhaIndex + colIndex) % 2 === 1;
                        const backgroundColor = isDark ? 'bg-[#4A5D4E]' : 'bg-[#E8D8C8]';

                        const isSelecionado =
                            itemSelecionado?.linha === linhaIndex && itemSelecionado?.coluna === colIndex;

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
    );
};


