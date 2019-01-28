import * as React from 'react';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import {Squirrel} from '../../../../../src/react/squirrel';
import {MyNavigator} from '../navigator';
import {render, fireEvent} from 'react-testing-library';
import {MyContainer, MyScene} from '../scene';

describe('Samples - react - 1. Basic', () => {
    /* Just the scene itself, no React specific stuff here  */
    describe('Business', () => {
        describe('MyScene', () => {
            let container: MyContainer;

            beforeEach(() => {
                container = {
                    count: 0,
                    onClick: () => {
                        /* Placeholder */
                    },
                };
            });

            it('should set the initial state on the container', () => {
                /* Given */
                const myScene = new MyScene();

                /* When */
                myScene.attach(container);

                /* Then */
                expect(container.count).toBe(3);
            });

            it('should increment counter on click', () => {
                /* Given */
                const myScene = new MyScene();

                /* When */
                myScene.attach(container);
                container.onClick();

                /* Then */
                expect(container.count).toBe(4);
            });
        });
    });

    /* Full integration of rendered component with navigators etc. */
    describe('Integration', () => {
        it('should render initial state', () => {
            /* When */
            const result = render(<Squirrel navigator={new MyNavigator()} />);

            /* Then */
            expect(result.getByText('3')).toBeInTheDocument();
        });

        it('should increment counter on click', () => {
            /* Given */
            const result = render(<Squirrel navigator={new MyNavigator()} />);

            /* When */
            const button = result.getByText('Click me');
            fireEvent.click(button);

            /* Then */
            expect(result.getByText('4')).toBeInTheDocument();
        });
    });
});
