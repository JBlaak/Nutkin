import {Scene} from '../../../../../src/core/scene';
import {ViewProvidingScene} from '../../../../../src/react/default/view_providing_scene';
import {ContactComponent} from '../ui/contact';
import {ComponentType} from 'react';

export class ContactScene implements Scene, ViewProvidingScene<ContactScene> {
    constructor(private listener: ContactEvents) {}

    public getView(): ComponentType<{scene: ContactScene}> {
        return ContactComponent;
    }

    public onStart(): void {
        /* Noop */
    }

    public onStop(): void {
        /* Noop */
    }

    public onDestroy(): void {
        /* Noop */
    }

    public onClick() {
        this.listener.back();
    }
}

export interface ContactEvents {
    back(): void;
}
