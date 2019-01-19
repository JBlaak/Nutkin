import {TestSingleSceneNavigator} from '../__support__/test_single_scene_navigator';
import {scenesAreEqual, SceneState, statesAreEqual, TestScene} from '../__support__/test_scene';
import {TestNavigationEventsListener} from '../__support__/test_navigation_events_listener';
import {Container} from '../../container';
import {Scene} from '../../scene';

type Callback = () => void;

describe('Single scene navigator', () => {
    let scene: TestScene;
    let navigator: TestSingleSceneNavigator;
    let listener: TestNavigationEventsListener | null = null;
    let unregister: null | Callback = null;

    function registerListener() {
        listener = new TestNavigationEventsListener();
        unregister = navigator.addNavigatorEventsListener(listener);
    }

    beforeEach(() => {
        scene = new TestScene();
        navigator = new TestSingleSceneNavigator(scene);
        listener = null;
    });

    describe('listeners', () => {
        it('should not have broadcasted anything when idle', () => {
            /* Given */
            registerListener();

            /* Then */
            assertBroadcastedScenes([]);
        });

        it('should broadcast on start', () => {
            /* Given */
            registerListener();

            /* When */
            navigator.onStart();

            /* Then */
            assertBroadcastedScenes([scene]);
        });

        it('should broadcast on stop', () => {
            /* Given */
            registerListener();

            /* When */
            navigator.onStart();
            navigator.onStop();

            /* Then */
            assertBroadcastedScenes([scene, scene]);
        });

        it('should broadcast on destroy', () => {
            /* Given */
            registerListener();

            /* When */
            navigator.onStart();
            navigator.onStop();
            navigator.onDestroy();

            /* Then */
            assertBroadcastedScenes([scene, scene]);
        });

        it('should not broadcast destroy when inactive', () => {
            /* Given */
            registerListener();

            /* When */
            navigator.onDestroy();

            /* Then */
            assertBroadcastedScenes([]);
        });

        it('should broadcast only once when destroyed without stop in between', () => {
            /* Given */
            registerListener();

            /* When */
            navigator.onStart();
            navigator.onDestroy();

            /* Then */
            assertBroadcastedScenes([scene, scene]);
        });

        it('should not received updates on unregister', () => {
            /* Given */
            registerListener();

            /* When */
            navigator.onStart();
            unregister!();
            navigator.onStop();

            /* Then */
            assertBroadcastedScenes([scene]);
        });

        it('should notify listeners on finish when inactive', () => {
            /* Given */
            registerListener();

            /* When */
            navigator.finish();

            /* Then */
            expect(listener!.isFinished).toBe(true);
        });

        it('should notify listeners on finish when active', () => {
            /* Given */
            registerListener();

            /* When */
            navigator.onStart();
            navigator.finish();

            /* Then */
            expect(listener!.isFinished).toBe(true);
        });
    });

    describe('lifecycle', () => {
        it('should leave scene alone on navigator creation', () => {
            /* Then */
            assertStates([]);
        });

        it('should start registered scene on start', () => {
            /* When */
            navigator.onStart();

            /* Then */
            assertStates([SceneState.Started]);
        });

        it('should ignore subsequent onStart', () => {
            /* When */
            navigator.onStart();
            navigator.onStart();

            /* Then */
            assertStates([SceneState.Started]);
        });

        it('should ignore subsequent onStart', () => {
            /* When */
            navigator.onStart();
            navigator.onStart();

            /* Then */
            assertStates([SceneState.Started]);
        });

        it('should stop scene when called onStop', () => {
            /* When */
            navigator.onStart();
            navigator.onStop();

            /* Then */
            assertStates([SceneState.Started, SceneState.Stopped]);
        });

        it('should ignore stop when scene is not started', () => {
            /* When */
            navigator.onStop();

            /* Then */
            assertStates([]);
        });

        it('should first stop scene before destroying when onStop is called', () => {
            /* When */
            navigator.onStart();
            navigator.onDestroy();

            /* Then */
            assertStates([SceneState.Started, SceneState.Stopped, SceneState.Destroyed]);
        });

        it("should destroy scene even though it isn't started on destroy", () => {
            /* When */
            navigator.onDestroy();

            /* Then */
            assertStates([SceneState.Destroyed]);
        });

        it('should ignore stop when scene is already destroyed', () => {
            /* When */
            navigator.onStart();
            navigator.onDestroy();
            navigator.onStop();

            /* Then */
            assertStates([SceneState.Started, SceneState.Stopped, SceneState.Destroyed]);
        });

        it('throw an error when trying to start after navigator was destroyed', () => {
            expect(() => {
                navigator.onStart();
                navigator.onDestroy();
                navigator.onStart();
            }).toThrow();
        });

        it('should destroy scene when finishing when active', () => {
            /* When */
            navigator.onStart();
            navigator.finish();

            /* Then */
            assertStates([SceneState.Started, SceneState.Stopped, SceneState.Destroyed]);
        });

        it('should destroy scene when finishing when inactive', () => {
            /* When */
            navigator.finish();

            /* Then */
            assertStates([SceneState.Destroyed]);
        });
    });

    function assertStates(states: SceneState[]) {
        expect(statesAreEqual(scene.states, states)).toBe(true);
    }

    function assertBroadcastedScenes(scenes: Array<Scene<Container>>) {
        expect(scenesAreEqual(listener!.scenes, scenes)).toBe(true);
    }
});
