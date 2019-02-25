import {Subscription} from 'rxjs';

export interface TestObserver<T> {
    values: T[];
    lastErrror: any | null;
    isComplete: boolean;

    lastValue: T | undefined;
    done(): void;
}

export class DefaultTestObserver<T> implements TestObserver<T> {
    public values: T[] = [];
    public lastErrror: any | null = null;
    public isComplete: boolean = false;
    private subscription: Subscription | undefined;

    public get lastValue(): T | undefined {
        return this.values[this.values.length - 1];
    }

    public closed: boolean = false;

    public complete() {
        this.isComplete = true;
    }

    public error(err: any) {
        this.lastErrror = err;
    }

    public next(value: T) {
        this.values.push(value);
    }

    public setSubscription(subscription: Subscription) {
        this.subscription = subscription;
    }

    public done(): void {
        this.subscription!.unsubscribe();
    }
}
