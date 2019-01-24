import * as Rx from 'rxjs';

export class CompositeSubscription {
    private _list: Rx.Subscription[] = [];

    constructor(list: Rx.Subscription[] = []) {
        this._list = list;
    }

    public static from(subscriptions: Rx.Subscription[]): CompositeSubscription {
        return new CompositeSubscription(subscriptions);
    }

    public add(subscription: Rx.Subscription) {
        this._list.push(subscription);
    }

    public clear() {
        this._list.forEach(subscription => {
            subscription.unsubscribe();
        });

        this._list = [];
    }
}
