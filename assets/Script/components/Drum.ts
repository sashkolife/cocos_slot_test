import Reel from "./Reel";
import {slotConfig} from "../constants/config";
import {SlotEvents} from "../constants/enums";
import * as sounds from "../helpers/soundsHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Drum extends cc.Component {

    @property(sp.Skeleton) symbol_0_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_0_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_0_2: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_0_3: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_0_4: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_1_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_1_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_1_2: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_1_3: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_1_4: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_2_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_2_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_2_2: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_2_3: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_2_4: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_3_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_3_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_3_2: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_3_3: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_3_4: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_4_0: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_4_1: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_4_2: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_4_3: sp.Skeleton = null;
    @property(sp.Skeleton) symbol_4_4: sp.Skeleton = null;

    private _reels: Reel[] = [];
    private _isSpinning: boolean = false;

    private _spinningReelsAmount: number = null;

    start () {
    }

    init(): void {
        const symbolsData: sp.SkeletonData[] = [];
        for (let i: number = 0; i < slotConfig.symbols.length; i++)
            symbolsData.push(cc.resources.get(slotConfig.symbols[i].path, sp.SkeletonData));

        for (let i: number = 0; i < slotConfig.reels.length; i++) {
            const symbolsViews: sp.Skeleton[] = [];
            for (let j: number = 0; j < slotConfig.reels[i].symbolsAmount; j++)
                symbolsViews.push(this["symbol_"+i+"_"+j]);
            this._reels.push(new Reel(slotConfig.reels[i], symbolsViews, symbolsData));
        }

        cc.systemEvent.on(SlotEvents.OnReelStop, this.onReelStop.bind(this));
    }

    protected update(dt: number): void {
        if (this._isSpinning)
            this._reels.forEach(reel => reel.spin());
    }

    private onReelStop(reelId: number): void {
        this._spinningReelsAmount--;
        if (this._spinningReelsAmount == 0) {
            this._isSpinning = false;
            this.node.emit(SlotEvents.OnDrumFinish);
        }
    }

    startSpin(): void {
        this._isSpinning = true;
        this._reels.forEach(reel => reel.startSpin());
        sounds.play("reel_spin");
    }

    setSymbols(drum: number[][]): void {
        this._spinningReelsAmount = this._reels.length;
        for (let i: number = 0; i < this._spinningReelsAmount; i++) {
            this._reels[i].stopSpin(drum[i]);
        }
    }

    darkenSymbols(): void {
        this._reels.forEach(reel => reel.darkenSymbols());
    }
}