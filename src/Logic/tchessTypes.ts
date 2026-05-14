export type tabuleiroType = {
    board: number[][]
}

export type PecaType = 'peao' | 'torre' | 'cavalo' | 'bispo' | 'rainha' | 'rei'
export type PecaCor = 'branco' | 'preto' 

export interface Peca {
    tipo: PecaType,
    cor: PecaCor
}

export type TabuleiroState = (Peca | null)[][]
