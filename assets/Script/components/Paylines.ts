import PresentationComponentBase from "./PresentationComponentBase";
import {IPresentationPaylines} from "../constants/interfaces";
import * as sounds from "../helpers/soundsHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Paylines extends PresentationComponentBase {

    @property(sp.Skeleton) spinePayline1: sp.Skeleton = null;
    @property(sp.Skeleton) spinePayline2: sp.Skeleton = null;
    @property(sp.Skeleton) spinePayline3: sp.Skeleton = null;

    show(params: IPresentationPaylines): void {
        if (!params.all)
            this.hide();

        this.node.active = true;
        this["spinePayline"+params.id].node.active = true;
        this["spinePayline"+params.id].setAnimation(0, params.animate ? params.id.toString() : params.id+"static", false);

        if (params.animate)
            sounds.play("payline");
    }
}