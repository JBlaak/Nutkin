import {Observable} from 'rxjs';
import {DefaultTestObserver, TestObserver} from './test_observer';

export function testObservable<T>(observable: Observable<T>): TestObserver<T> {
    const testObserver = new DefaultTestObserver<T>();

    const subscription = observable.subscribe(testObserver);
    testObserver.setSubscription(subscription);

    return testObserver;
}
