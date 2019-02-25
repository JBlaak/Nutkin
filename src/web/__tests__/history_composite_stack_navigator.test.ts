import {createMemoryHistory, Location, LocationState} from 'history';
import {TestHistoryCompositeStackNavigator} from '../__support__/test_history_composite_stack_navigator';
import {TestNavigationEventsListener} from '../../core/__support__/test_navigation_events_listener';
import {TestSingleSceneNavigator} from '../../core/__support__/test_single_scene_navigator';
import {TestScene} from '../../core/__support__/test_scene';
import {Navigator} from '../../core/navigator';
import {TestStackNavigator} from '../../core/__support__/test_stack_navigator';

describe('HistoryCompositeStackNavigator', () => {
    let history = createMemoryHistory();

    let navigator = new TestHistoryCompositeStackNavigator(history, router);

    let navigator1Scene1 = new TestScene();
    let navigator2Scene1 = new TestScene();
    let navigator2Scene2 = new TestScene();
    let navigator3Scene1 = new TestScene();

    let navigator1 = new TestSingleSceneNavigator(navigator1Scene1);
    let navigator2 = new TestStackNavigator([navigator2Scene1]);
    let navigator3 = new TestStackNavigator([navigator3Scene1]);

    let listener = new TestNavigationEventsListener();

    beforeEach(() => {
        navigator1Scene1 = new TestScene();
        navigator2Scene1 = new TestScene();
        navigator2Scene2 = new TestScene();
        navigator3Scene1 = new TestScene();

        navigator1 = new TestSingleSceneNavigator(navigator1Scene1);
        navigator2 = new TestStackNavigator([navigator2Scene1]);
        navigator3 = new TestStackNavigator([navigator3Scene1]);

        listener = new TestNavigationEventsListener();

        history = createMemoryHistory();
        navigator = new TestHistoryCompositeStackNavigator(history, router);
    });

    function router(location: Location<LocationState>): Navigator {
        switch (location.pathname) {
            case '/first':
                return navigator1;
            case '/second':
                return navigator2;
            case '/third':
                return navigator3;
            default:
                return navigator1;
        }
    }

    describe('Navigating on history', () => {
        it('should initialize using the current location', () => {
            /* Given */
            history.push('/first');

            /* When */
            navigator.onStart();

            /* Then */
            expect(navigator.locations.length).toBe(1);
            expect(navigator.locations[0]!.pathname).toBe('/first');
        });

        it('should broadcast scene from first navigator when directly visiting /first', () => {
            /* Given */
            history.push('/first');
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.onStart();

            /* Then */
            expect(listener.scenes.length).toBe(1);
            expect(listener.lastScene).toBe(navigator1Scene1);
        });

        it('should broadcast scene from second navigator when directly visiting /second', () => {
            /* Given */
            history.push('/second');
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.onStart();

            /* Then */
            expect(listener.scenes.length).toBe(1);
            expect(listener.lastScene).toBe(navigator2Scene1);
        });

        it('should navigate from first to second when pushed to history', () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            history.push('/first');

            /* When */
            navigator.onStart();
            history.push('/second');

            /* Then */
            expect(navigator.locations.length).toBe(2);
            expect(listener.lastScene).toBe(navigator2Scene1);
        });

        it('should navigate from first to second to third when pushed to history', () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            history.push('/first');

            /* When */
            navigator.onStart();
            history.push('/second');
            history.push('/third');

            /* Then */
            expect(navigator.locations.length).toBe(3);
            expect(listener.lastScene).toBe(navigator3Scene1);
        });

        it('should not initialize new navigator when navigating back from third to second ', () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            history.push('/first');

            /* When */
            navigator.onStart();
            history.push('/second');
            history.push('/third');
            history.goBack();

            /* Then */
            expect(navigator.locations.length).toBe(3);
            expect(listener.lastScene).toBe(navigator2Scene1);
        });

        it('should not initialize new navigator when navigating back from third to second to first', () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            history.push('/first');

            /* When */
            navigator.onStart();
            history.push('/second');
            history.push('/third');
            history.goBack();
            history.goBack();

            /* Then */
            expect(navigator.locations.length).toBe(3);
            expect(listener.lastScene).toBe(navigator1Scene1);
        });

        it('when navigating to path after starting navigator they should be created on navigating', () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            history.push('/first');

            /* When */
            navigator.onStart();
            history.push('/second');
            history.push('/third');

            /* Then */
            expect(navigator.locations.length).toBe(3);
            expect(navigator.locations.map(l => l.pathname)).toEqual(['/first', '/second', '/third']);
            expect(listener.lastScene).toBe(navigator3Scene1);
        });

        it('when navigating back to path known before starting navigator, should be initialized on the fly', () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            history.push('/first');
            history.push('/second');
            history.push('/third');

            /* When */
            navigator.onStart();
            history.goBack();
            history.goBack();

            /* Then */
            expect(navigator.locations.length).toBe(3);
            expect(navigator.locations.map(l => l.pathname)).toEqual(['/third', '/second', '/first']);
            expect(listener.lastScene).toBe(navigator1Scene1);
        });
    });
});
