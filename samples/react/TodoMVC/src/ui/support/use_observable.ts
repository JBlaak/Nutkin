import {useEffect, useState} from 'react';
import {Observable} from 'rxjs';

export function useObservable<T>(observable: Observable<T>): T | null;

export function useObservable<T>(observable: Observable<T>, initialValue: T): T;

export function useObservable<T>(observable: Observable<T>, initialValue?: T): T | null {
    const [value, setValue] = useState(typeof initialValue !== 'undefined' ? initialValue : null);

    useEffect(
        () => {
            const subscription = observable.subscribe(value => {
                setValue(value);
            });

            return () => {
                subscription.unsubscribe();
            };
        },
        [observable],
    );

    return value;
}
