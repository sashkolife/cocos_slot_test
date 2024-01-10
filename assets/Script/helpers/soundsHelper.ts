const PREFIX: string = "sounds/";

let isEnabled: boolean = true;

export const getEnabled = () => {
    return isEnabled;
}

export const setEnabled = (value: boolean) => {
    isEnabled = value;
}

export const play = (name: string, loop?: boolean) => {
    if (isEnabled)
        cc.audioEngine.play(cc.resources.get(PREFIX+name, cc.AudioClip), loop, 1);
}