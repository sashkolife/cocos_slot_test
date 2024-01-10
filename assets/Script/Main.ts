import Paylines from "./components/Paylines";
import {SlotEvents} from "./constants/enums";
import {slotConfig} from "./constants/config";
import {IResponse, IUser} from "./constants/interfaces";
import {getFakeResponse} from "./constants/fakeResponses";
import {currencyFormat} from "./helpers/currencyFormat";
import Drum from "./components/Drum";
import WinCounters from "./components/WinCounters";
import PresentationBase from "./presentations/PresentationBase";
import WinMessages from "./components/WinMessages";
import DrumPresentation from "./components/DrumPresentation";
import * as sounds from "./helpers/soundsHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(Drum) drum: Drum = null;
    @property(DrumPresentation) drumPresentation: DrumPresentation = null;
    @property(Paylines) paylines: Paylines = null;
    @property(WinCounters) winCounters: WinCounters = null;
    @property(WinMessages) winMessages: WinMessages = null;
    @property(sp.Skeleton) spineMoneySwap: sp.Skeleton = null;
    @property(cc.Button) buttonPlay: cc.Button = null;
    @property(cc.Button) buttonStop: cc.Button = null;
    @property(cc.Button) buttonSoundOn: cc.Button = null;
    @property(cc.Button) buttonSoundOff: cc.Button = null;
    @property(cc.Label) labelBalance: cc.Label = null;
    @property(cc.Label) labelWin: cc.Label = null;
    @property(cc.Label) labelBet: cc.Label = null;

    private _user: IUser = {id: "test", balance: 10000, bet: 1};
    private _response: IResponse = null;

    private _presentation: PresentationBase;

    private _endSpinTimeout: number = null;

    start (): void {

        cc.resources.loadDir("", (error, assets) => {
            this.drum.init();
            this.drum.node.on(SlotEvents.OnDrumFinish, this.onDrumFinish.bind(this));

            this.buttonPlay.node.active = true;
        });

        this._presentation = new PresentationBase(this);

        this.setBalance(this._user.balance);
        this.setBet(this._user.bet);
        this.setWin(0);

    }

    onPlayClick(): void {
        this.spinStart();
    }

    onSoundSwitch(): void {
        sounds.setEnabled(!sounds.getEnabled());
        if (sounds.getEnabled()) {
            this.buttonSoundOff.node.active = false;
            this.buttonSoundOn.node.active = true;
        } else {
            this.buttonSoundOff.node.active = true;
            this.buttonSoundOn.node.active = false;
        }
    }

    public setBalance(value: number, animate?: boolean): void {
        this._user.balance = value;
        this.labelBalance.string = currencyFormat(value);
        if (animate) {
            this.spineMoneySwap.node.active = true;
            this.spineMoneySwap.setAnimation(0, "money_swap", false);
        }
    }

    public setWin(value: number): void {
        this.labelWin.string = currencyFormat(value);
    }

    private setBet(value: number): void {
        this.labelBet.string = currencyFormat(value);
    }

    private onEndSpinTimeout(): void {
        clearTimeout(this._endSpinTimeout);
        this._endSpinTimeout = null;

        if (this._response)
            this.drumSet();
    }

    private onResponse(res: IResponse): void {
        this._response = res;
        if (!this._endSpinTimeout)
            this.drumSet();
    }

    private spinStart(): void {
        this.buttonPlay.interactable = false;
        if (this._response)
            this.setBalance(this._response.balance);

        this._response = null;

        this.setBalance(this._user.balance-this._user.bet);
        this.setWin(0);

        this._presentation.stop();
        this.drum.startSpin();

        this._endSpinTimeout = setTimeout(() => this.onEndSpinTimeout(), slotConfig.spinningTime);

        //Fake response from server imitation
        setTimeout(() => this.onResponse(getFakeResponse(this._user)), 800);
    }

    private drumSet(): void {
        this.drum.setSymbols(this._response.drum);
    }

    private onDrumFinish(): void {
        this.buttonPlay.interactable = true;

        if (this._response.wins) {
            this._presentation.start(this._response);
        }
    }

}
