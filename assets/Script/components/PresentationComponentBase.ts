const {ccclass, property} = cc._decorator;

@ccclass
export default class PresentationComponentBase extends cc.Component {

    start () {
        // init logic
    }

    show(params: any): void {}

    hide(): void {
        this.node.children.forEach(node => node.active = false);
        this.node.active = false;
    }
}