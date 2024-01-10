import PresentationComponentBase from "./PresentationComponentBase";
import * as sounds from "../helpers/soundsHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinMessages extends PresentationComponentBase {

    @property(sp.Skeleton) spineWins: sp.Skeleton = null;

    show(id: string): void {
        this.node.active = true;
        this.spineWins.node.active = true;
        this.spineWins.setAnimation(0, id, false);
        sounds.play("bigwin");
    }
}