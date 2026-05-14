import type { TabuleiroState, PecaType } from "./tchessTypes"

export const inicialTabuleiro = (): TabuleiroState => {
    const tabuleiro: TabuleiroState = Array(8).fill(null).map(() => Array(8).fill(null))

    for (let i = 0; i < 8; i++) {
        tabuleiro[1][i] = { tipo: "peao", cor: 'preto'}
        tabuleiro[6][i] = { tipo: 'peao', cor: 'branco'}
    }

    const ordemPecas: PecaType[] = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'bispo', 'cavalo', 'torre']

    for (let i = 0; i < 8; i++) {
        tabuleiro[0][i] = { tipo: ordemPecas[i], cor: 'preto'}
        tabuleiro[7][i] = { tipo: ordemPecas[i], cor: 'branco'}
    }

    return tabuleiro
}
