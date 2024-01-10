import Main from "../Main";
import {IPresentationStep, IResponse, IResponsePayline, IResponseWin} from "../constants/interfaces";
import {WinType} from "../constants/enums";
import {slotConfig} from "../constants/config";

/**
 * We can override this class
 * and make specify presentation steps
 */
export default class PresentationBase {
    private _steps: IPresentationStep[] = [];
    private _delay: number = null;
    private _nextPaylineTimeout: number = null;
    private _response: IResponse = null;

    constructor(private readonly _main: Main) {}

    start(response: IResponse): void {
        this._response = response;

        this.addPresentStep({
            delay: 700,
            action: () => this._main.setWin(this._response.wins.win)
        });

        this.addPresentStep({
            delay: 0,
            action: () => this._main.drum.darkenSymbols()
        });

        if (!this._response.wins.winType || this._response.wins.winType == WinType.Regular) {
            this.addPresentStep({
                delay: 0,
                action: () => this.showPaylinesSequence(true)
            });
        } else {
            this.addPresentStep({
                delay: 0,
                action: () => {
                    this.showAllPaylinesStatic();
                    this._main.winCounters.show({id: 1, value: this._response.wins.win})
                }
            });

            this.addPresentStep({
                delay: slotConfig.presentation.bigWinDelay,
                action: () => this._main.winMessages.show(this._response.wins.winType)
            });

            this.addPresentStep({
                delay: 0,
                action: () => this.showPaylinesSequence(false)
            });
        }

        this.presentNext();
    }

    stop(): void {
        clearTimeout(this._delay);
        clearTimeout(this._nextPaylineTimeout);
        this._steps.length = 0;

        this._main.paylines.hide();
        this._main.winCounters.hide();
        this._main.winMessages.hide();
        this._main.drumPresentation.hide();
    }

    private showPaylinesSequence(animate?: boolean): void {
        this._main.setBalance(this._response.balance, true);
        let paylineI: number = 0;

        const showNextPayline = () => {
            const payline: IResponsePayline = this._response.wins.paylines[paylineI];
            this._main.paylines.show({id: payline.id, animate: animate});
            this._main.winCounters.show({id: payline.id, value: payline.win});
            this._main.drumPresentation.show({positions: payline.positions, drum: this._response.drum, animate: animate});
            paylineI++;

            if (paylineI >= this._response.wins.paylines.length) {
                paylineI = 0;
                animate = false;

                if (this._response.wins.paylines.length == 1) {
                    this._nextPaylineTimeout = setTimeout(() => {
                        this._main.paylines.hide();
                        this._main.winCounters.hide();
                        this._nextPaylineTimeout = setTimeout(showNextPayline, slotConfig.presentation.paylinesShowPause);
                    }, slotConfig.presentation.nextPaylineStaticDelay);
                } else {
                    this._nextPaylineTimeout = setTimeout(showNextPayline, slotConfig.presentation.nextPaylineAnimateDelay);
                }
            } else {
                this._nextPaylineTimeout = setTimeout(showNextPayline, slotConfig.presentation.nextPaylineAnimateDelay);
            }
        }

        showNextPayline();
    }

    private showAllPaylinesStatic(): void {
        let allPositions: number[][] = [];
        this._response.wins.paylines?.forEach(payline => {
            this._main.paylines.show({id: payline.id, animate: false, all: true});
            allPositions = allPositions.concat(payline.positions);
        });
        this._main.drumPresentation.show({positions: allPositions, drum: this._response.drum, animate: true});
    }

    private addPresentStep(presentStep: IPresentationStep): void {
        this._steps.push(presentStep);
    }

    private presentNext(): void {
        if (this._steps.length > 0) {
            const presentation: IPresentationStep = this._steps.shift();
            if (presentation.action)
                presentation.action(presentation.actionParams);

            this._delay = setTimeout(() => this.presentNext(), presentation.delay);
        }
    }
}