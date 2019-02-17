import {MyScene} from './scene';

export function renderer(scene: MyScene, root: HTMLElement) {
    const render = () => {
        root.innerText = scene.count.toString();

        const link = document.createElement('a');
        link.addEventListener('click', scene.onClick.bind(scene));
        link.innerText = 'Click me';

        root.append(link);
    };
    scene.onCountUpdates(() => {
        render();
    });
    render();
}
