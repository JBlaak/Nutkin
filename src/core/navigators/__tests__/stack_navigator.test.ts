import {scenesAreEqual, SceneState, statesAreEqual, TestScene} from '../../__support__/test_scene';
import {TestStackNavigator} from '../../__support__/test_stack_navigator';
import {TestNavigationEventsListener} from '../../__support__/test_navigation_events_listener';
import {Scene} from '../../scene';

type Callback = () => void;

describe('Stack navigator', () => {
    let scene1: TestScene;
    let scene2: TestScene;
    let scene3: TestScene;
    let navigator: TestStackNavigator;

    let listener = new TestNavigationEventsListener();

    beforeEach(() => {
        scene1 = new TestScene();
        scene2 = new TestScene();
        scene3 = new TestScene();
        navigator = new TestStackNavigator([scene1]);
        listener = new TestNavigationEventsListener();
    });

    describe('Navigator states', () => {
        it(`inactive navigator is not finished`, () => {
            /* When */
            navigator.addNavigatorEventsListener(listener);

            /* Then */
            expect(listener.isFinished).toBe(false);
        });

        it(`inactive navigator is not destroyed`, () => {
            /* Then */
            expect(navigator.isDestroyed()).toBe(false);
        });

        it(`active navigator is not destroyed`, () => {
            /* Given */
            navigator.onStart();

            /* Then */
            expect(navigator.isDestroyed()).toBe(false);
        });

        it(`stopped navigator is not destroyed`, () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.onStop();

            /* Then */
            expect(navigator.isDestroyed()).toBe(false);
        });

        it(`destroyed navigator is destroyed`, () => {
            /* When */
            navigator.onDestroy();

            /* Then */
            expect(navigator.isDestroyed()).toBe(true);
        });

        it(`inactive navigator does not notify newly added listener of scene`, () => {
            /* When */
            navigator.addNavigatorEventsListener(listener);

            /* Then */
            expect(listener.lastScene).toBeNull();
        });

        it(`active navigator does notify newly added listener of scene`, () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.addNavigatorEventsListener(listener);

            /* Then */
            expect(listener.lastScene).toBe(scene1);
        });

        it(`starting navigator notifies listeners of scene`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.onStart();

            /* Then */
            expect(listener.lastScene).toBe(scene1);
        });

        it(`starting navigator multiple times notifies listeners of scene only once`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.onStart();
            navigator.onStart();

            /* Then */
            expect(listener.scenes.length).toBe(1);
        });

        it(`starting navigator does not finish`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.onStart();

            /* Then */
            expect(listener.isFinished).toBe(false);
        });

        it(`stopping navigator does not finish`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.onStop();

            /* Then */
            expect(listener.isFinished).toBe(false);
        });

        it(`destroying navigator does not finish`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.onDestroy();

            /* Then */
            expect(listener.isFinished).toBe(false);
        });

        it(`pushing a scene for inactive navigator does not notify listeners`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.push(scene2);

            /* Then */
            expect(listener.lastScene).toBeNull();
        });

        it(`pushing a scene for destroyed navigator does not notify listeners`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            navigator.onDestroy();

            /* When */
            navigator.push(scene2);

            /* Then */
            expect(listener.lastScene).toBeNull();
        });

        it(`pushing a scene for active navigator does notify listeners`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            navigator.onStart();

            /* When */
            navigator.push(scene2);

            /* Then */
            expect(listener.lastScene).toBe(scene2);
        });

        it(`start navigator after scene push notifies pushed scene`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            navigator.push(scene2);

            /* When */
            navigator.onStart();

            /* Then */
            expect(listener.lastScene).toBe(scene2);
        });

        it(`popping from single item stack for inactive navigator notifies finished`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.pop();

            /* Then */
            expect(listener.isFinished).toBe(true);
        });

        it(`popping from multi item stack for inactive navigator does not notify finished`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            navigator.push(scene2);

            /* When */
            navigator.pop();

            /* Then */
            expect(listener.isFinished).toBe(false);
        });

        it(`popping from multi item stack for inactive navigator does not notify scene`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            navigator.push(scene2);

            /* When */
            navigator.pop();

            /* Then */
            expect(listener.lastScene).toBeNull();
        });

        it(`popping from single item stack for active navigator notifies finished`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            navigator.onStart();

            /* When */
            navigator.pop();

            /* Then */
            expect(listener.isFinished).toBe(true);
        });

        it(`popping from multi item stack for active navigator does not notify finished`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            navigator.onStart();
            navigator.push(scene2);

            /* When */
            navigator.pop();

            /* Then */
            expect(listener.isFinished).toBe(false);
        });

        it(`popping from multi item stack for active navigator notifies proper scene`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            navigator.onStart();
            navigator.push(scene2);

            /* When */
            navigator.pop();

            /* Then */
            expect(listener.lastScene).toBe(scene1);
        });

        it(`popping from multi item stack for destroyed navigator does not notify scene`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);
            navigator.onDestroy();
            navigator.push(scene2);

            /* When */
            navigator.pop();

            /* Then */
            expect(listener.lastScene).toBeNull();
        });

        it(`finish notifies listeners of finished`, () => {
            /* Given */
            navigator.addNavigatorEventsListener(listener);

            /* When */
            navigator.finish();

            /* Then */
            expect(listener.isFinished).toBe(true);
        });

        it(`finish after navigator is destroyed does not notify listeners`, () => {
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
    describe('Scene interaction for single scene stack', () => {
        it(`starting navigator starts Scene`, () => {
            /* When */
            navigator.onStart();

            /* Then */
            assertStates(scene1, [SceneState.Started]);
        });

        it(`starting navigator multiple times starts Scene only once`, () => {
            /* When */
            navigator.onStart();
            navigator.onStart();

            /* Then */
            assertStates(scene1, [SceneState.Started]);
        });

        it(`stopping an inactive navigator does not stop Scene`, () => {
            /* When */
            navigator.onStop();

            /* Then */
            assertStates(scene1, []);
        });

        it(`stopping an active navigator stops Scene`, () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.onStop();

            /* Then */
            assertStates(scene1, [SceneState.Started, SceneState.Stopped]);
        });

        it(`destroy an inactive navigator does not stop scene but will destroy Scene`, () => {
            /* When */
            navigator.onDestroy();

            /* Then */
            assertStates(scene1, [SceneState.Destroyed]);
        });

        it(`destroy an active navigator stops and destroys Scene`, () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.onDestroy();

            /* Then */
            assertStates(scene1, [SceneState.Started, SceneState.Stopped, SceneState.Destroyed]);
        });

        it(`starting a destroyed navigator does not start Scene`, () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onStart();

            /* Then */
            assertStates(scene1, [SceneState.Destroyed]);
        });

        it(`stopping a destroyed navigator does not start Scene`, () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onStop();

            /* Then */
            assertStates(scene1, [SceneState.Destroyed]);
        });

        it(`destroying a destroyed navigator only destroys Scene once`, () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onDestroy();

            /* Then */
            assertStates(scene1, [SceneState.Destroyed]);
        });
    });

    describe('Scene interactor for multiple scene stack', () => {
        beforeEach(() => {
            navigator = new TestStackNavigator([scene1, scene2]);
        });

        it(`starting starts top Scene`, () => {
            /* When */
            navigator.onStart();

            /* Then */
            assertStates(scene2, [SceneState.Started]);
        });

        it(`starting navigator does not start bottom scenes`, () => {
            /* When */
            navigator.onStart();

            /* Then */
            assertStates(scene1, []);
        });

        it(`starting navigator multiple times starts Scene only once`, () => {
            /* When */
            navigator.onStart();
            navigator.onStart();

            /* Then */
            assertStates(scene2, [SceneState.Started]);
        });

        it(`stopping an inactive navigator does not stop Scene`, () => {
            /* When */
            navigator.onStop();

            /* Then */
            assertStates(scene2, []);
        });

        it(`stopping an active navigator stops Scene`, () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.onStop();

            /* Then */
            assertStates(scene2, [SceneState.Started, SceneState.Stopped]);
        });

        it(`destroy an inactive navigator does not stop Scenes but destroys them`, () => {
            /* When */
            navigator.onDestroy();

            /* Then */
            assertStates(scene1, [SceneState.Destroyed]);
            assertStates(scene2, [SceneState.Destroyed]);
        });

        it(`destroy an active navigator stops top Scene and destroys all Scenes`, () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.onDestroy();

            /* Then */
            assertStates(scene1, [SceneState.Destroyed]);
            assertStates(scene2, [SceneState.Started, SceneState.Stopped, SceneState.Destroyed]);
        });

        it(`starting a destroyed navigator does not start Scene`, () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onStart();

            /* Then */
            assertStates(scene2, [SceneState.Destroyed]);
        });

        it(`stopping a destroyed navigator does not start Scene`, () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onStop();

            /* Then */
            assertStates(scene2, [SceneState.Destroyed]);
        });

        it(`destroying a destroyed navigator only destroys Scene once`, () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.onDestroy();

            /* Then */
            assertStates(scene2, [SceneState.Destroyed]);
        });
    });

    describe('Scene interaction when manipulating stack', () => {
        it(`popping from a single item stack for inactive navigator destroys scene but will not stop it`, () => {
            /* When */
            navigator.pop();

            /* When */
            assertStates(scene1, [SceneState.Destroyed]);
        });

        it(`popping from a multi item stack for inactive navigator destroys latest scene`, () => {
            /* Given */
            navigator = new TestStackNavigator([scene1, scene2]);

            /* When */
            navigator.pop();

            /* When */
            assertStates(scene2, [SceneState.Destroyed]);
        });

        it(`popping from a single item stack for active navigator stops and destroys scene`, () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.pop();

            /* When */
            assertStates(scene1, [SceneState.Started, SceneState.Stopped, SceneState.Destroyed]);
        });

        it(`popping from a multi item stack for active navigator stops and destroys latest scene, and starts current scene`, () => {
            /* Given */
            navigator = new TestStackNavigator([scene1, scene2]);
            navigator.onStart();

            /* When */
            navigator.pop();

            /* When */
            assertStates(scene1, [SceneState.Started]);
            assertStates(scene2, [SceneState.Started, SceneState.Stopped, SceneState.Destroyed]);
        });

        it(`replacing top item from a single item stack for inactive navigator destroys original scene but does not stop it`, () => {
            /* When */
            navigator.replace(scene2);

            /* When */
            assertStates(scene1, [SceneState.Destroyed]);
        });

        it(`replacing top item from a multi item stack for inactive navigator destroys latest scene`, () => {
            /* Given */
            navigator = new TestStackNavigator([scene1, scene2]);

            /* When */
            navigator.replace(scene3);

            /* When */
            assertStates(scene2, [SceneState.Destroyed]);
        });

        it(`replacing top item from a multi item stack for inactive navigator does not start replacing scene`, () => {
            /* Given */
            navigator = new TestStackNavigator([scene1, scene2]);

            /* When */
            navigator.replace(scene3);

            /* When */
            assertStates(scene3, []);
        });

        it(`replacing top item from a single item stack for active navigator stops and destroys original scene, and starts replacing scene`, () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.replace(scene2);

            /* When */
            assertStates(scene1, [SceneState.Started, SceneState.Stopped, SceneState.Destroyed]);
            assertStates(scene2, [SceneState.Started]);
        });

        it(`replacing top item from a multi item stack for active navigator stops and destroys latest scene, and starts replacing scene`, () => {
            /* Given */
            navigator = new TestStackNavigator([scene1, scene2]);
            navigator.onStart();

            /* When */
            navigator.replace(scene3);

            /* When */
            assertStates(scene2, [SceneState.Started, SceneState.Stopped, SceneState.Destroyed]);
            assertStates(scene3, [SceneState.Started]);
        });

        it(`pushing for inactive navigator does not stop previous`, () => {
            /* When */
            navigator.push(scene2);

            /* Then */
            assertStates(scene1, []);
        });

        it(`pushing for inactive navigator does not start scene`, () => {
            /* When */
            navigator.push(scene2);

            /* Then */
            assertStates(scene2, []);
        });

        it(`pushing for destroyed navigator does not start scene`, () => {
            /* Given */
            navigator.onDestroy();

            /* When */
            navigator.push(scene2);

            /* Then */
            assertStates(scene2, []);
        });

        it(`pushing for started navigator stops previous scene and starts pushed scene`, () => {
            /* Given */
            navigator.onStart();

            /* When */
            navigator.push(scene2);

            /* Then */
            assertStates(scene1, [SceneState.Started, SceneState.Stopped]);
            assertStates(scene2, [SceneState.Started]);
        });
    });

    function assertStates(scene: TestScene, states: SceneState[]) {
        expect(statesAreEqual(scene.states, states)).toBe(true);
    }

    function assertBroadcastedScenes(scenes: Scene[]) {
        expect(scenesAreEqual(listener!.scenes, scenes)).toBe(true);
    }
});
