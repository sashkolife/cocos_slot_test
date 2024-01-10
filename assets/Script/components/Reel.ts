import {IReelConfig} from "../constants/interfaces";
import {SlotEvents, SpinPhase, SymbolAnimation} from "../constants/enums";

export default class Reel {
    private readonly _config: IReelConfig;
    private readonly _symbolsViews: sp.Skeleton[];
    private readonly _symbolsData: sp.SkeletonData[];
    private readonly _borderTop: number;
    private readonly _borderBottom: number;
    private readonly _borderBottomVisible: number;

    private _currentPhase: SpinPhase = SpinPhase.Stop;
    private _currentSpeed: number = 0;
    private _stopIds: number[] = null;
    private _ribbonI: number = 0;
    private _stopI: number = 0;
    private _bottomSymbol: sp.Skeleton = null;

    constructor(config: IReelConfig, symbolsViews: sp.Skeleton[], symbolsData: sp.SkeletonData[]) {
        this._config = config;
        this._symbolsViews = symbolsViews;
        this._symbolsData = symbolsData;
        const lastSymbolId: number = this._symbolsViews.length - 1;
        this._borderTop = this._symbolsViews[0].node.y;
        this._borderBottom = this._borderTop - this._config.symbolHeight * this._config.symbolsAmount;

        for (let i: number = 0; i < this._symbolsViews.length; i++)
            this._symbolsViews[i].node.y = this._borderTop - this._config.symbolHeight*i;

        this._borderBottomVisible = this._symbolsViews[lastSymbolId-this._config.outsideSymbolsAmount].node.y;

    }

    startSpin(): void {
        this._currentSpeed = 0;
        this._stopIds = null;
        this._stopI = 0;
        this._bottomSymbol = null;

        this.staticSymbols();

        setTimeout(() => {
            this._currentPhase = SpinPhase.StartBounce;
        }, this._config.startDelay);
    }

    stopSpin(stopIds: number[]): void {
        setTimeout(() => {
            this._stopIds = stopIds;
        }, this._config.stopDelay);
    }

    spin(): void {
        if (this._currentPhase == SpinPhase.Stop)
            return;

        this.updateSpeed();

        if (this._currentSpeed <= this._config.maxSpeedBounce && this._currentPhase == SpinPhase.StartBounce)
            this._currentPhase = SpinPhase.Accelerate;

        if (this._currentSpeed >= this._config.maxSpeed && this._currentPhase == SpinPhase.Accelerate)
            this._currentPhase = SpinPhase.Spinning;

        let newTopSymbol: sp.Skeleton = null;
        this._symbolsViews.forEach(symbol => {
            symbol.node.y -= this._currentSpeed;
            if (symbol.node.y < this._borderBottom) {
                newTopSymbol = symbol;
                symbol.node.y = this._borderTop - (this._borderBottom - symbol.node.y);
            }
        });

        if (newTopSymbol) {
            let symbolId: number;
            if (this._stopIds && this._stopI < this._stopIds.length) {
                symbolId = this._stopIds[this._stopI];
                this._stopI++;
                if (this._currentPhase == SpinPhase.Spinning) {
                    this._currentPhase = SpinPhase.Slowdown;
                    this._bottomSymbol = newTopSymbol;
                }
            } else {
                symbolId = this._config.ribbon[this._ribbonI];
                this._ribbonI++;
                if (this._ribbonI >= this._config.ribbon.length) {
                    this._ribbonI = 0;
                }
            }

            newTopSymbol.skeletonData = this._symbolsData[symbolId];
            newTopSymbol.setAnimation(0, this._currentPhase == SpinPhase.Spinning ? SymbolAnimation.Blur : SymbolAnimation.Static, false);
        }

        if (this._bottomSymbol && this._bottomSymbol.node.y < this._borderBottomVisible) {
            this.finishSpin();
        }
    }

    private updateSpeed(): void {
        switch (this._currentPhase) {
            case SpinPhase.StartBounce:
                this._currentSpeed += this._config.accelerateBounce;
                break;
            case SpinPhase.Accelerate:
                this._currentSpeed += this._config.accelerate;
                break;
            case SpinPhase.Slowdown:
                this._currentSpeed += this._config.slowdown;
                break;
        }
    }

    private finishSpin(): void {
        this._currentPhase = SpinPhase.Stop;

        const positionDiff: number = Math.abs(this._bottomSymbol.node.y) - Math.abs(this._borderBottomVisible);
        this._symbolsViews.forEach(symbol => {
            symbol.node.y += positionDiff;
            symbol.setAnimation(0, SymbolAnimation.Landing, false);
        });

        cc.systemEvent.emit(SlotEvents.OnReelStop, this._config.id);
    }

    public darkenSymbols(): void {
        this._symbolsViews.forEach(symbol => {
            symbol.setAnimation(0, SymbolAnimation.Dark, false);
        });
    }

    public staticSymbols(): void {
        this._symbolsViews.forEach(symbol => {
            symbol.setAnimation(0, SymbolAnimation.Static, false);
        });
    }
}