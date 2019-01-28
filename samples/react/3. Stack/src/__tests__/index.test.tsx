import * as React from 'react';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import {Squirrel} from '../../../../../src/react/squirrel';
import {MyNavigator} from '../navigator';
import {fireEvent, render} from 'react-testing-library';
import {FirstScene, FirstSceneEvents} from '../first_scene';
import {SecondScene, SecondSceneEvents} from '../second_scene';
import {TestNavigationEventsListener} from '../../../../../src/core/__support__/test_navigation_events_listener';

describe('Samples - react - 3. Stack', () => {
    /* Just the scene itself, no React specific stuff here  */
    describe('Business', () => {
        describe('FirstScene', () => {
            it('should request the second screen on click', () => {
                /* Given */
                let secondScreenRequested = false;
                const listener: FirstSceneEvents = {
                    requestSecondScreen: () => {
                        secondScreenRequested = true;
                    },
                };
                const firstScene = new FirstScene(listener);

                /* When */
                firstScene.onClick();

                /* Then */
                expect(secondScreenRequested).toBe(true);
            });
        });
        describe('SecondScene', () => {
            it('should request the second screen on click', () => {
                /* Given */
                let onFinishSecondSceneRequested = false;
                const listener: SecondSceneEvents = {
                    onFinishSecondScene: () => {
                        onFinishSecondSceneRequested = true;
                    },
                };
                const secondScene = new SecondScene(listener);

                /* When */
                secondScene.onClick();

                /* Then */
                expect(onFinishSecondSceneRequested).toBe(true);
            });
        });
        describe('MyNavigator', () => {
            it('should render first scene initially', () => {
                /* Given */
                const testNavigationEventsListener = new TestNavigationEventsListener();

                /* When */
                const myNavigator = new MyNavigator();
                myNavigator.addNavigatorEventsListener(testNavigationEventsListener);
                myNavigator.onStart();

                /* Then */
                expect(testNavigationEventsListener.scenes.length).toBe(1);
                expect(testNavigationEventsListener.scenes[0]).toBeInstanceOf(FirstScene);
            });
            it('should navigate to the second scene when requested', () => {
                /* Given */
                const testNavigationEventsListener = new TestNavigationEventsListener();
                const myNavigator = new MyNavigator();
                myNavigator.addNavigatorEventsListener(testNavigationEventsListener);
                myNavigator.onStart();

                /* When */
                myNavigator.requestSecondScreen();

                /* Then */
                expect(testNavigationEventsListener.scenes.length).toBe(2);
                expect(testNavigationEventsListener.scenes[1]).toBeInstanceOf(SecondScene);
            });
            it('should navigate render the first when navigating back', () => {
                /* Given */
                const testNavigationEventsListener = new TestNavigationEventsListener();
                const myNavigator = new MyNavigator();
                myNavigator.addNavigatorEventsListener(testNavigationEventsListener);
                myNavigator.onStart();

                /* When */
                myNavigator.requestSecondScreen();
                myNavigator.onFinishSecondScene();

                /* Then */
                expect(testNavigationEventsListener.scenes.length).toBe(3);
                expect(testNavigationEventsListener.scenes[2]).toBeInstanceOf(FirstScene);
            });
        });
    });

    /* Full integration of rendered component with navigators etc. */
    describe('Integration', () => {
        it('should render initial state', () => {
            /* When */
            const result = render(<Squirrel navigator={new MyNavigator()} />);

            /* Then */
            expect(result.getByText('First view!')).toBeInTheDocument();
        });

        it('should show second screen on click', () => {
            /* Given */
            const result = render(<Squirrel navigator={new MyNavigator()} />);

            /* When */
            const button = result.getByText('Click me');
            fireEvent.click(button);

            /* Then */
            expect(result.getByText('Second view!')).toBeInTheDocument();
        });

        it('should navigate back on click', () => {
            /* Given */
            const result = render(<Squirrel navigator={new MyNavigator()} />);

            /* When */
            const button = result.getByText('Click me');
            fireEvent.click(button);
            const backButton = result.getByText('Back');
            fireEvent.click(backButton);

            /* Then */
            expect(result.getByText('First view!')).toBeInTheDocument();
        });
    });
});
