import {TestMvvmScene} from '../__support__/test_mvvm_scene';
import {TestMvvmContainer} from '../__support__/test_mvvm_container';

describe('Mvvm Scene', () => {
    it('should attach the container to the scene on attach', () => {
        /* Given */
        const testMvvmScene = new TestMvvmScene();
        const testMvvmContainer = new TestMvvmContainer<TestMvvmScene>();

        /* When */
        testMvvmScene.attach(testMvvmContainer);

        /* Then */
        expect(testMvvmContainer.attachedTo).toBe(testMvvmScene);
    });

    it('should detach the container from the scene on detach', () => {
        /* Given */
        const testMvvmScene = new TestMvvmScene();
        const testMvvmContainer = new TestMvvmContainer<TestMvvmScene>();

        /* When */
        testMvvmScene.attach(testMvvmContainer);
        testMvvmScene.detach(testMvvmContainer);

        /* Then */
        expect(testMvvmContainer.attachedTo).toBeNull();
    });
});
