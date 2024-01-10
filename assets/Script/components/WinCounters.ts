import {currencyFormat} from "../helpers/currencyFormat";
import PresentationComponentBase from "./PresentationComponentBase";
import {IPresentationWinCounter} from "../constants/interfaces";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinCounters extends PresentationComponentBase {

    @property(cc.Label) labelWin1: cc.Label = null;
    @property(cc.Label) labelWin2: cc.Label = null;
    @property(cc.Label) labelWin3: cc.Label = null;

    show(params: IPresentationWinCounter): void {
        this.hide();
        this.node.active = true;
        this["labelWin"+params.id].node.active = true;
        this["labelWin"+params.id].string = currencyFormat(params.value);
    }
}