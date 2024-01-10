import {WinType} from "./enums";

export interface IUser {
    id: string,
    balance: number,
    bet: number
}

export interface ISlotConfig {
    symbols: ISymbolConfig[],
    reels: IReelConfig[],
    spinningTime: number,
    presentation: IPresentationConfig
}

export interface IReelConfig {
    id: number,
    ribbon: number[],
    startDelay: number,
    stopDelay: number,
    accelerateBounce: number,
    maxSpeedBounce: number,
    accelerate: number,
    maxSpeed: number,
    slowdown: number,
    symbolsAmount: number,
    outsideSymbolsAmount: number,
    symbolHeight: number
}

export interface ISymbolConfig {
    id: number,
    type: string,
    path: string
}

export interface IPresentationConfig {
    bigWinDelay: number,
    paylinesShowPause: number,
    nextPaylineStaticDelay: number,
    nextPaylineAnimateDelay: number
}

export interface IPresentationWinCounter {
    id: number,
    value: number
}

export interface IPresentationSymbols {
    positions: number[][],
    drum: number[][],
    animate?: boolean
}

export interface IPresentationPaylines {
    id: number,
    animate?: boolean,
    all?: boolean
}

export interface IPresentationStep {
    delay: number,
    action?: Function,
    actionParams?: any[]
}

export interface IResponse {
    balance: number,
    drum: number[][]
    wins?: IResponseWin
}

export interface IResponseWin {
    win: number,
    winType?: WinType,
    paylines: IResponsePayline[]
}

export interface IResponsePayline {
    id: number,
    win: number,
    symbol: number,
    positions: number[][]
}