import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import {Squirrel} from '../squirrel';
import {navigatorStatesAreEqual, TestSingleSceneNavigator} from '../../core/__support__/test_single_scene_navigator';
import {TestViewProvidingScene} from '../__support__/test_view_providing_scene';
import {SceneState, statesAreEqual} from '../../core/__support__/test_scene';
import {TestStackNavigator} from '../../core/__support__/test_stack_navigator';
import {OtherTestComponent} from '../__support__/other_test_component';
import {TestComponent} from '../__support__/test_component';
import {NavigatorState} from '../../core/__support__/navigator_state';

describe('React Squirrel', () => {
    describe('Single render lifecycle with view providing scenes', () => {
        it('should render component', () => {
            /* Given */
            const testScene = new TestViewProvidingScene();
            const testSingleSceneNavigator = new TestSingleSceneNavigator(testScene);

            /* When */
            const result = render(<Squirrel navigator={testSingleSceneNavigator} />);

            /* Then */
            expect(result.getByText('Hi')).toBeInTheDocument();
        });

        it('should have started the scene', () => {
            /* Given */
            const testScene = new TestViewProvidingScene();
            const testSingleSceneNavigator = new TestSingleSceneNavigator(testScene);

            /* When */
            render(<Squirrel navigator={testSingleSceneNavigator} />);

            /* Then */
            expect(statesAreEqual(testScene.states, [SceneState.Started])).toBe(true);
        });

        it('finishing of the navigator should trigger onFinish callback on Squirrel component', () => {
            /* Given */
            const testScene = new TestViewProvidingScene();
            const testSingleSceneNavigator = new TestSingleSceneNavigator(testScene);

            /* When */
            let finished = false;
            const onFinish = () => (finished = true);
            render(<Squirrel navigator={testSingleSceneNavigator} onFinish={onFinish} />);
            testSingleSceneNavigator.finish();

            /* Then */
            expect(finished).toBe(true);
        });
    });

    describe('Stack navigation with view providing scenes', () => {
        it('Should render the first scene', () => {
            /* Given */
            const testScene1 = new TestViewProvidingScene();
            const testStackNavigator = new TestStackNavigator([testScene1]);

            /* When */
            const result = render(<Squirrel navigator={testStackNavigator} />);

            /* Then */
            expect(result.getByText('Hi')).toBeInTheDocument();
        });

        it('Rendering only an initial screen should have only Started this scene', () => {
            /* Given */
            const testScene1 = new TestViewProvidingScene();
            const testStackNavigator = new TestStackNavigator([testScene1]);

            /* When */
            render(<Squirrel navigator={testStackNavigator} />);

            /* Then */
            expect(statesAreEqual(testScene1.states, [SceneState.Started])).toBe(true);
        });

        it('Should be able to change to a second scene', () => {
            /* Given */
            const testScene1 = new TestViewProvidingScene(TestComponent);
            const testScene2 = new TestViewProvidingScene(OtherTestComponent);
            const testStackNavigator = new TestStackNavigator([testScene1]);

            /* When */
            const result = render(<Squirrel navigator={testStackNavigator} />);
            testStackNavigator.push(testScene2);

            /* Then */
            expect(result.getByText('Ho')).toBeInTheDocument();
        });

        it('Should stop the first screen when changing to a second screen', () => {
            /* Given */
            const testScene1 = new TestViewProvidingScene(TestComponent);
            const testScene2 = new TestViewProvidingScene(OtherTestComponent);
            const testStackNavigator = new TestStackNavigator([testScene1]);

            /* When */
            render(<Squirrel navigator={testStackNavigator} />);
            testStackNavigator.push(testScene2);

            /* Then */
            expect(statesAreEqual(testScene1.states, [SceneState.Started, SceneState.Stopped])).toBe(true);
            expect(statesAreEqual(testScene2.states, [SceneState.Started])).toBe(true);
        });

        it('Should render to the second scene when navigation occurred before initial render', () => {
            /* Given */
            const testScene1 = new TestViewProvidingScene(TestComponent);
            const testScene2 = new TestViewProvidingScene(OtherTestComponent);
            const testStackNavigator = new TestStackNavigator([testScene1]);

            /* When */
            testStackNavigator.push(testScene2);
            const result = render(<Squirrel navigator={testStackNavigator} />);

            /* Then */
            expect(result.getByText('Ho')).toBeInTheDocument();
        });

        it('Should be able to change navigate back from a second scene', () => {
            /* Given */
            const testScene1 = new TestViewProvidingScene(TestComponent);
            const testScene2 = new TestViewProvidingScene(OtherTestComponent);
            const testStackNavigator = new TestStackNavigator([testScene1]);

            /* When */
            const result = render(<Squirrel navigator={testStackNavigator} />);
            testStackNavigator.push(testScene2);
            testStackNavigator.pop();

            /* Then */
            expect(result.getByText('Hi')).toBeInTheDocument();
        });

        it('Should be stop and destroy a second scene when navigating back from it', () => {
            /* Given */
            const testScene1 = new TestViewProvidingScene(TestComponent);
            const testScene2 = new TestViewProvidingScene(OtherTestComponent);
            const testStackNavigator = new TestStackNavigator([testScene1]);

            /* When */
            render(<Squirrel navigator={testStackNavigator} />);
            testStackNavigator.push(testScene2);
            testStackNavigator.pop();

            /* Then */
            expect(
                statesAreEqual(testScene1.states, [SceneState.Started, SceneState.Stopped, SceneState.Started]),
            ).toBe(true);
            expect(
                statesAreEqual(testScene2.states, [SceneState.Started, SceneState.Stopped, SceneState.Destroyed]),
            ).toBe(true);
        });
    });

    describe('<Squirrel/> lifecycle', () => {
        it('should not crash when removed from component tree', () => {
            /* Given */
            const testScene = new TestViewProvidingScene();
            const testSingleSceneNavigator = new TestSingleSceneNavigator(testScene);

            /* When */
            let setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
            const MyComponent = () => {
                const [isVisible, _setIsVisible]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(
                    true,
                );
                setIsVisible = _setIsVisible;

                return isVisible ? <Squirrel navigator={testSingleSceneNavigator} /> : <div>Nope</div>;
            };
            const result = render(<MyComponent />);
            setIsVisible!(false);

            /* Then */
            expect(result.getByText('Nope')).toBeInTheDocument();
        });
        it('should stop and destroy navigator when removed from component tree', () => {
            /* Given */
            const testScene = new TestViewProvidingScene();
            const testSingleSceneNavigator = new TestSingleSceneNavigator(testScene);

            /* When */
            let setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
            const MyComponent = () => {
                const [isVisible, _setIsVisible]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(
                    true,
                );
                setIsVisible = _setIsVisible;

                return isVisible ? <Squirrel navigator={testSingleSceneNavigator} /> : <div>Nope</div>;
            };
            const result = render(<MyComponent />);
            setIsVisible!(false);

            /* Then */
            expect(
                navigatorStatesAreEqual(testSingleSceneNavigator.states, [
                    NavigatorState.Started,
                    NavigatorState.Stopped,
                    NavigatorState.Destroyed,
                ]),
            ).toBe(true);
        });
    });
});
