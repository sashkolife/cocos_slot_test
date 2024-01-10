import {ISlotConfig} from "./interfaces";

export const slotConfig: ISlotConfig = {
    symbols: [
        {
            id: 0,
            path: "symbols/symbols_low_one",
            type: "spine"
        },
        {
            id: 1,
            path: "symbols/symbols_low_two",
            type: "spine"
        },
        {
            id: 2,
            path: "symbols/symbols_low_three",
            type: "spine"
        },
        {
            id: 3,
            path: "symbols/symbols_low_four",
            type: "spine"
        },
        {
            id: 4,
            path: "symbols/symbols_low_five",
            type: "spine"
        },
        {
            id: 5,
            path: "symbols/symbols_high_one",
            type: "spine"
        },
        {
            id: 6,
            path: "symbols/symbols_high_two",
            type: "spine"
        },
        {
            id: 7,
            path: "symbols/symbols_high_three",
            type: "spine"
        },
        {
            id: 8,
            path: "symbols/symbols_high_four",
            type: "spine"
        },
        {
            id: 9,
            path: "symbols/symbols_high_five",
            type: "spine"
        },
        {
            id: 10,
            path: "symbols/symbols_wild",
            type: "spine"
        },
        {
            id: 11,
            path: "symbols/symbols_bonus",
            type: "spine"
        }
    ],
    reels: [
        {
            id: 0,
            ribbon: [1,8,5,4,0,1,5,6,10,7,6,4,11,0,2,3,6,9,1,4,2,3,5,8,10,2,7,1,0,3,6,5,8,9,1,7],
            startDelay: 0,
            stopDelay: 0,
            accelerate: 1.6,
            accelerateBounce: -1.5,
            maxSpeedBounce: -9,
            maxSpeed: 52,
            slowdown: -2.1,
            symbolsAmount: 5,
            outsideSymbolsAmount: 1,
            symbolHeight: 193
        },
        {
            id: 1,
            ribbon: [5,2,9,4,11,3,2,1,0,6,4,8,10,0,1,3,7,2,1,5,9,7,1,8,0,10,4,6,8,5,7,6,1,3,0,6],
            startDelay: 50,
            stopDelay: 100,
            accelerate: 1.6,
            accelerateBounce: -1.5,
            maxSpeedBounce: -9,
            maxSpeed: 52,
            slowdown: -2.1,
            symbolsAmount: 5,
            outsideSymbolsAmount: 1,
            symbolHeight: 193
        },
        {
            id: 2,
            ribbon: [3,10,1,0,5,2,6,11,8,0,7,3,4,2,1,5,3,9,10,4,1,0,3,8,9,5,1,6,8,9,7,4,0,2,3,9],
            startDelay: 100,
            stopDelay: 200,
            accelerate: 1.6,
            accelerateBounce: -1.5,
            maxSpeedBounce: -9,
            maxSpeed: 52,
            slowdown: -2.1,
            symbolsAmount: 5,
            outsideSymbolsAmount: 1,
            symbolHeight: 193
        },
        {
            id: 3,
            ribbon: [3,10,1,0,5,2,6,11,8,0,7,3,4,2,1,5,3,9,10,4,1,0,3,8,9,5,1,6,8,9,7,4,0,2,3,9],
            startDelay: 150,
            stopDelay: 300,
            accelerate: 1.6,
            accelerateBounce: -1.5,
            maxSpeedBounce: -9,
            maxSpeed: 52,
            slowdown: -2.1,
            symbolsAmount: 5,
            outsideSymbolsAmount: 1,
            symbolHeight: 193
        },
        {
            id: 4,
            ribbon: [3,10,1,0,5,2,6,11,8,0,7,3,4,2,1,5,3,9,10,4,1,0,3,8,9,5,1,6,8,9,7,4,0,2,3,9],
            startDelay: 200,
            stopDelay: 400,
            accelerate: 1.6,
            accelerateBounce: -1.5,
            maxSpeedBounce: -9,
            maxSpeed: 52,
            slowdown: -2.1,
            symbolsAmount: 5,
            outsideSymbolsAmount: 1,
            symbolHeight: 193
        }
    ],
    spinningTime: 2000,
    presentation: {
        bigWinDelay: 5000,
        paylinesShowPause: 1000,
        nextPaylineStaticDelay: 1200,
        nextPaylineAnimateDelay: 2200

    }
}