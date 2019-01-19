import {Scene} from '../scene';
import {Maybe} from 'tsmonad';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {CompositeSubscription} from '../../support/composite_subscription';
import {switchMap} from 'rxjs/operators';

export class RxScene<C> implements Scene<C> {
    protected views = new BehaviorSubject<Maybe<C>>(Maybe.nothing());
    protected subscriptions = new CompositeSubscription();

    public attach(v: C): void {
        this.views.next(Maybe.just(v));
    }

    public detach(v: C): void {
        this.views.next(Maybe.nothing());
    }

    public onStart(): void {
        /* Noop */
    }

    public onStop(): void {
        this.subscriptions.clear();
    }

    public onDestroy(): void {
        /* Noop */
    }

    public whenViewAvailable<O>(callback: (container: C) => Observable<O>): Observable<O> {
        return this.views.pipe(
            switchMap(viewMaybe =>
                viewMaybe.caseOf({
                    just: callback,
                    nothing: () => EMPTY,
                }),
            ),
        );
    }
}
