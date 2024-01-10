import {IResponse, IUser} from "./interfaces";
import {WinType} from "./enums";

let responseNum: number = 0;

export const getFakeResponse = (user: IUser): IResponse => {
    let resp: IResponse;
    switch (responseNum) {
        case 0:
            resp = {
                balance: user.balance,
                drum: [
                    [1,3,8],
                    [5,0,10],
                    [2,11,5],
                    [8,3,6],
                    [2,4,7]
                ]
            }
            break;
        case 1:
            resp = {
                balance: user.balance + 10,
                drum: [
                    [1,9,8],
                    [5,9,11],
                    [2,9,0],
                    [8,10,6],
                    [2,4,7]
                ],
                wins: {
                    win: 10,
                    winType: WinType.Regular,
                    paylines: [
                        {id: 1, win: 10, positions: [[0,1],[1,1],[2,1],[3,1]], symbol: 9}
                    ]
                }
            }
            break;
        case 2:
            resp = {
                balance: user.balance,
                drum: [
                    [3,3,8],
                    [2,0,6],
                    [2,7,2],
                    [4,3,6],
                    [9,4,0]
                ]
            }
            break;
        case 3:
            resp = {
                balance: user.balance+100,
                drum: [
                    [8,3,1],
                    [8,0,1],
                    [8,2,1],
                    [8,3,10],
                    [8,4,7]
                ],
                wins: {
                    win: 100,
                    winType: WinType.BigWin,
                    paylines: [
                        {id: 3, win: 90, positions: [[0,0],[1,0],[2,0],[3,0],[4,0]], symbol: 8},
                        {id: 2, win: 10, positions: [[0,2],[1,2],[2,2],[3,2]], symbol: 1}
                    ]
                }
            }
            break;
    }

    responseNum++;
    if (responseNum > 3)
        responseNum = 0;

    return resp;
}