import {Scene} from '../scene';

export interface ProvidesIdentity extends Scene {
    identity: string;
}

export function willProvideIdentity(scene: Scene): scene is ProvidesIdentity {
    return 'identity' in scene;
}
