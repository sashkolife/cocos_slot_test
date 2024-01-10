import {currencyFormat} from "../helpers/currencyFormat";
import PresentationComponentBase from "./PresentationComponentBase";
import {IPresentationSymbols} from "../constants/interfaces";
import {SpinPhase, SymbolAnimation} from "../constants/enums";
import {slotConfig} from "../constants/config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DrumPresentation extends PresentationComponentBase {

    @property(sp.Skeleton) symbol_0_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_0_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_0_2: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_1_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_1_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_1_2: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_2_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_2_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_2_2: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_3_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_3_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_3_2: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_4_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_4_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_4_2: sp.Skeleton = null;

    show(params: IPresentationSymbols): void {
        this.hide();
        this.node.active = true;
        params.positions.forEach(pos=>{
            const symbolId: number = params.drum[pos[0]][pos[1]];
            const symbol: sp.Skeleton = this["symbol_"+pos[0]+"_"+pos[1]];
            symbol.node.active = true;
            symbol.skeletonData = cc.resources.get(slotConfig.symbols[symbolId].path, sp.SkeletonData);
            symbol.setAnimation(0, params.animate ? SymbolAnimation.Win : SymbolAnimation.Static, false);
        });
    }
}