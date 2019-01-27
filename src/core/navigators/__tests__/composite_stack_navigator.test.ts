import {TestNavigationEventsListener} from '../../__support__/test_navigation_events_listener';
import {TestCompositeStackNavigator} from '../../__support__/test_composite_stack_navigator';
import {navigatorStatesAreEqual, TestSingleSceneNavigator} from '../../__support__/test_single_scene_navigator';
import {scenesAreEqual, TestScene} from '../../__support__/test_scene';
import {TestStackNavigator} from '../../__support__/test_stack_navigator';
import {NavigatorState} from '../../__support__/navigator_state';

describe('Composite stack navigator', () => {
    let navigator1Scene1 = new TestScene();
    let navigator2Scene1 = new TestScene();
    let navigator2Scene2 = new TestScene();
    let navigator3Scene1 = new TestScene();

    let navigator1 = new TestSingleSceneNavigator(navigator1Scene1);
    let navigator2 = new TestStackNavigator([navigator2Scene1]);
    let navigator3 = new TestStackNavigator([navigator3Scene1]);

    let navigator = new TestCompositeStackNavigator([navigator1]);
    let listener = new TestNavigationEventsListener();

    beforeEach(() => {
        navigator1Scene1 = new TestScene();
        navigator2Scene1 = new TestScene();
        navigator2Scene2 = new TestScene();
        navigator3Scene1 = new TestScene();

        navigator1 = new TestSingleSceneNavigator(navigator1Scene1);
        navigator2 = new TestStackNavigator([navigator2Scene1]);
        navigator3 = new TestStackNavigator([navigator3Scene1]);

        navigator = new TestCompositeStackNavigator([navigator1]);
        listener = new TestNavigationEventsListener();
    });

    describe('NavigatorStates', () => {
        describe('InactiveNavigator', () => {
            it('navigator is not finished', () => {
                /* When */
                navigator.addNavigatorEventsListener(listener);

                /* Then */
                expect(listener.isFinished).toBe(false);
            });

            it('navigator is not destroyed', () => {
                /* Then */
                expect(navigator.isDestroyed()).toBe(false);
            });

            it('added listener does not get notified of scene', () => {
                /* When */
                navigator.addNavigatorEventsListener(listener);

                /* Then */
                expect(listener.scenes.length).toBe(0);
            });

            it('pushing a navigator does not notify listeners of scene', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);

                /* When */
                navigator.push(navigator2);

                /* Then */
                expect(listener.scenes.length).toBe(0);
            });

            it('popping the last scene and navigator from the stack notifies listeners of finished', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);

                /* When */
                navigator.pop();

                /* Then */
                expect(listener.isFinished).toBe(true);
            });

            it('popping the second to last navigator from the stack does not notify listeners of finished', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.push(navigator2);

                /* When */
                navigator.pop();

                /* Then */
                expect(listener.isFinished).toBe(false);
            });

            it('popping the second to last navigator from the navigator does not notify listeners of scenes', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.push(navigator2);

                /* When */
                navigator.pop();

                /* Then */
                expect(listener.scenes.length).toBe(0);
            });

            it('finish notifies listeners of finished', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);

                /* When */
                navigator.finish();

                /* Then */
                expect(listener.isFinished).toBe(true);
            });

            it('finish after navigator is destroyed does not notify listeners', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.onStart();
                navigator.onDestroy();

                /* When */
                navigator.finish();

                /* Then */
                expect(listener.isFinished).toBe(false);
            });
        });
        describe('ActiveNavigator', () => {
            it('navigator is not finished', () => {
                /* Given */
                navigator.onStart();

                /* When */
                navigator.addNavigatorEventsListener(listener);

                /* Then */
                expect(listener.isFinished).toBe(false);
            });

            it('navigator is not destroyed', () => {
                /* Given */
                navigator.onStart();

                /* Then */
                expect(navigator.isDestroyed()).toBe(false);
            });

            it('added listener gets notified of scene', () => {
                /* Given */
                navigator.onStart();

                /* When */
                navigator.addNavigatorEventsListener(listener);

                /* Then */
                expect(scenesAreEqual(listener.scenes, [navigator1Scene1])).toBe(true);
            });

            it('removed listener does not get notified of scene', () => {
                /* Given */
                const disposable = navigator.addNavigatorEventsListener(listener);
                disposable();

                /* When */
                navigator.onStart();

                /* Then */
                expect(listener.scenes.length).toBe(0);
            });

            it('starting navigator notifies listeners of scene', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);

                /* When */
                navigator.onStart();

                /* Then */
                expect(scenesAreEqual(listener.scenes, [navigator1Scene1])).toBe(true);
            });

            it('starting navigator multiple times notifies listeners of scene only once', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);

                /* When */
                navigator.onStart();
                navigator.onStart();

                /* Then */
                expect(listener.scenes.length).toBe(1);
            });

            it('starting navigator does not finish', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);

                /* When */
                navigator.onStart();

                /* Then */
                expect(listener.isFinished).toBe(false);
            });

            it('pushing a navigator notifies listeners of scene', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.onStart();

                /* When */
                navigator.push(navigator2);

                /* Then */
                expect(listener.scenes[listener.scenes.length - 1]).toBe(navigator2Scene1);
            });

            it('replacing a navigator notifies listeners of scene', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.onStart();

                /* When */
                navigator.replace(navigator2);

                /* Then */
                expect(listener.scenes[listener.scenes.length - 1]).toBe(navigator2Scene1);
            });

            it('start navigator after navigator push notifies pushed scene', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.push(navigator2);

                /* When */
                navigator.onStart();

                /* Then */
                expect(listener.scenes[listener.scenes.length - 1]).toBe(navigator2Scene1);
            });

            it('popping the last scene and navigator from the navigator notifies listeners of finished', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.onStart();

                /* When */
                navigator.pop();

                /* Then */
                expect(listener.isFinished).toBe(true);
            });

            it('popping the second to last navigator from the stack does not notify listeners of finished', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.onStart();
                navigator.push(navigator2);

                /* When */
                navigator.pop();

                /* Then */
                expect(listener.isFinished).toBe(false);
            });

            it('popping the second to last navigator from the stack notifies listeners of proper scenes', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.onStart();
                navigator.push(navigator2);

                /* When */
                navigator.pop();

                /* Then */
                expect(scenesAreEqual(listener.scenes, [navigator1Scene1, navigator2Scene1, navigator1Scene1]));
            });
        });
        describe('StoppedNavigator', () => {
            it(`stopping navigator does not finish`, () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);

                /* When */
                navigator.onStop();

                /* Then */
                expect(listener.isFinished).toBe(false);
            });

            it(`stopped navigator is not destroyed`, () => {
                /* When */
                navigator.onStop();

                /* Then */
                expect(navigator.isDestroyed()).toBe(false);
            });
        });
        describe('DestroyedNavigator', () => {
            it('destroying navigator does not finish', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);

                /* When */
                navigator.onDestroy();

                /* Then */
                expect(listener.isFinished).toBe(false);
            });

            it('isDestroyed returns true', () => {
                /* When */
                navigator.onDestroy();

                /* Then */
                expect(navigator.isDestroyed()).toBe(true);
            });

            it('pushing a scene for destroyed navigator does not notify listeners', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.onDestroy();

                /* When */
                navigator.push(navigator2);

                /* Then */
                expect(listener.scenes.length).toBe(0);
            });

            it('popping from multi item stack for destroyed navigator does not notify scene', () => {
                /* Given */
                navigator.addNavigatorEventsListener(listener);
                navigator.onDestroy();
                navigator.push(navigator2);

                /* When */
                navigator.pop();

                /* Then */
                expect(listener.scenes.length).toBe(0);
            });
        });
    });

    describe('NavigatorInteractionForSingleChildNavigatorStack', () => {
        it('starting navigator starts child navigator', () => {
            /* When */
            navigator.onStart();

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Started]));
        });

        it('starting navigator multiple times starts child navigator only once', () => {
            /* When */
            navigator.onStart();
            navigator.onStart();

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Started]));
        });

        it('stopping an inactive navigator does not stop child navigator', () => {
            /* When */
            navigator.onStop();

            /* Then */
            expect(navigator1.states.length).toBe(0);
        });

        it('stopping an active navigator stops child navigator', () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.onStop();

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Started, NavigatorState.Stopped]));
        });

        it('destroy an inactive navigator does not stop child navigator', () => {
            /* When */
            navigator.onDestroy();

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Destroyed]));
        });

        it('destroy an inactive navigator does destroy child navigator', () => {
            /* When */
            navigator.onDestroy();

            /* Then */
            expect(navigator1.isDestroyed()).toBe(true);
        });

        it('destroy an active navigator stops and destroys child navigator', () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.onDestroy();

            /* Then */
            expect(
                navigatorStatesAreEqual(navigator1.states, [
                    NavigatorState.Started,
                    NavigatorState.Stopped,
                    NavigatorState.Destroyed,
                ]),
            );
        });

        it('starting a destroyed navigator does not start child navigator', () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onStart();

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Destroyed]));
        });

        it('stopping a destroyed navigator does not start child navigator', () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onStop();

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Destroyed]));
        });

        it('destroying a destroyed navigator only destroys child navigator once', () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onDestroy();

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Destroyed]));
        });
    });
    describe('NavigatorInteractionForMultiChildNavigatorStack', () => {
        let navigator = new TestCompositeStackNavigator([navigator1, navigator2]);

        beforeEach(() => {
            navigator = new TestCompositeStackNavigator([navigator1, navigator2]);
        });

        it('starting navigator starts top child navigator', () => {
            /* When */
            navigator.onStart();

            /* Then */
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Started])).toBe(true);
        });

        it('starting navigator does not start bottom child navigators', () => {
            /* When */
            navigator.onStart();

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [])).toBe(true);
        });

        it('starting navigator multiple times starts child navigator only once', () => {
            /* When */
            navigator.onStart();
            navigator.onStart();

            /* Then */
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Started])).toBe(true);
        });

        it('stopping an inactive navigator does not stop child navigator', () => {
            /* When */
            navigator.onStop();

            /* Then */
            expect(navigatorStatesAreEqual(navigator2.states, [])).toBe(true);
        });

        it('stopping an active navigator stops child navigator', () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.onStop();

            /* Then */
            console.log(navigator2.states);
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Started, NavigatorState.Stopped])).toBe(
                true,
            );
        });

        it('destroy an inactive navigator does not stop child navigators, but destroys them', () => {
            /* When */
            navigator.onDestroy();

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Destroyed])).toBe(true);
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Destroyed])).toBe(true);
        });

        it('destroy an active navigator stops top child navigator and destroys all child navigators', () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.onDestroy();

            /* Then */
            expect(
                navigatorStatesAreEqual(navigator2.states, [
                    NavigatorState.Started,
                    NavigatorState.Stopped,
                    NavigatorState.Destroyed,
                ]),
            ).toBe(true);
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Destroyed])).toBe(true);
        });

        it('starting a destroyed navigator does not start child navigator', () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onStart();

            /* Then */
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Destroyed])).toBe(true);
        });

        it('destroying a destroyed navigator only destroys child navigator once', () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onDestroy();

            /* Then */
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Destroyed])).toBe(true);
        });
    });
    describe('NavigatorInteractionWhenManipulatingStack', () => {
        it('popping from a single item stack for inactive navigator destroys child navigator', () => {
            /* When */
            navigator.pop();

            /* When */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Destroyed])).toBe(true);
        });

        it('popping from a single item stack for inactive navigator destroys parent navigator', () => {
            /* When */
            navigator.pop();

            /* When */
            expect(navigator.isDestroyed()).toBe(true);
        });

        it('popping from a multi item stack for inactive navigator destroys latest child navigator', () => {
            /* Given */
            const navigator = new TestCompositeStackNavigator([navigator1, navigator2]);

            /* When */
            navigator.pop();

            /* When */
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Destroyed])).toBe(true);
        });

        it('popping from a single item stack for active navigator stops and destroys child navigator', () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.pop();

            /* When */
            expect(
                navigatorStatesAreEqual(navigator1.states, [
                    NavigatorState.Started,
                    NavigatorState.Stopped,
                    NavigatorState.Destroyed,
                ]),
            ).toBe(true);
        });

        it('popping from a single item stack for active navigator destroys parent navigator', () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.pop();

            /* When */
            expect(navigator.isDestroyed()).toBe(true);
        });

        it('popping from a multi item stack for active navigator stops and destroys latest child navigator, and starts current child navigator', () => {
            /* Given */
            const navigator = new TestCompositeStackNavigator([navigator1, navigator2]);
            navigator.onStart();

            /* When */
            navigator.pop();

            /* When */
            expect(
                navigatorStatesAreEqual(navigator2.states, [
                    NavigatorState.Started,
                    NavigatorState.Stopped,
                    NavigatorState.Destroyed,
                ]),
            ).toBe(true);
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Started])).toBe(true);
        });

        it('replacing top item from a single item stack for inactive navigator destroys original navigator', () => {
            /* When */
            navigator.replace(navigator2);

            /* When */
            expect(navigator1.isDestroyed()).toBe(true);
        });

        it('replacing top item from a single item stack for inactive navigator does not stop original navigator', () => {
            /* When */
            navigator.replace(navigator2);

            /* When */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Destroyed])).toBe(true);
        });

        it('replacing top item from a multi item stack for inactive navigator destroys latest navigator', () => {
            /* Given */
            const navigator = new TestCompositeStackNavigator([navigator1, navigator2]);

            /* When */
            navigator.replace(navigator3);

            /* When */
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Destroyed])).toBe(true);
        });

        it('replacing top item from a multi item stack for inactive navigator does not start replacing navigator', () => {
            /* Given */
            const navigator = new TestCompositeStackNavigator([navigator1, navigator2]);

            /* When */
            navigator.replace(navigator3);

            /* When */
            expect(navigatorStatesAreEqual(navigator3.states, [])).toBe(true);
        });

        it('replacing top item from a single item stack for active navigator stops and destroys original navigator, and starts replacing navigator', () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.replace(navigator2);

            /* When */
            expect(
                navigatorStatesAreEqual(navigator1.states, [
                    NavigatorState.Started,
                    NavigatorState.Stopped,
                    NavigatorState.Destroyed,
                ]),
            ).toBe(true);
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Started])).toBe(true);
        });

        it('replacing top item from a multi item stack for active navigator stops and destroys latest navigator, and starts replacing navigator', () => {
            /* Given */
            const navigator = new TestCompositeStackNavigator([navigator1, navigator2]);
            navigator.onStart();

            /* When */
            navigator.replace(navigator3);

            /* When */
            expect(navigatorStatesAreEqual(navigator1.states, [])).toBe(true);
            expect(
                navigatorStatesAreEqual(navigator2.states, [
                    NavigatorState.Started,
                    NavigatorState.Stopped,
                    NavigatorState.Destroyed,
                ]),
            ).toBe(true);
            expect(navigatorStatesAreEqual(navigator3.states, [NavigatorState.Started])).toBe(true);
        });

        it('pushing for inactive navigator does not stop previous child navigator', () => {
            /* When */
            navigator.push(navigator2);

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [])).toBe(true);
        });

        it('pushing for inactive navigator does not start pushed navigator', () => {
            /* When */
            navigator.push(navigator2);

            /* Then */
            expect(navigatorStatesAreEqual(navigator2.states, [])).toBe(true);
        });

        it('pushing for destroyed navigator does not start pushed navigator', () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.push(navigator2);

            /* Then */
            expect(navigatorStatesAreEqual(navigator2.states, [])).toBe(true);
        });

        it('pushing for started navigator stops previous child navigator and starts pushed child navigator', () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.push(navigator2);

            /* Then */
            expect(navigatorStatesAreEqual(navigator1.states, [NavigatorState.Started, NavigatorState.Stopped])).toBe(
                true,
            );
            expect(navigatorStatesAreEqual(navigator2.states, [NavigatorState.Started])).toBe(true);
        });
    });
});
