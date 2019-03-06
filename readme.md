# Nutkin

[![CircleCI](https://circleci.com/gh/JBlaak/Nutkin/tree/master.svg?style=svg)](https://circleci.com/gh/JBlaak/Nutkin/tree/master)
[![npm version](https://badge.fury.io/js/nutkin.svg)](https://badge.fury.io/js/nutkin)

Get a grip on navigation state.

Intertwining navigation and business logic with your UI layer
causes unclear responsibilities as well as hard to test states. Nutkin
separates the two by introducing composable modular navigation to which
the view layer can subscribe and react.

**Nutkin's API's haven't stabilized yet and may break until 1.0**

## Credits & reference material

Nutkin is based on the brilliant concepts posed by [nhaarman](https://github.com/nhaarman) in
his carefully designed library [Acorn](https://github.com/nhaarman/Acorn) and is in no
way original work. However Nutkin targets to provide a set of implementations
to work on the web.

To learn about the underlying concepts behind Nutkin please visit the [wiki of Acorn](https://nhaarman.github.io/Acorn/).

## Usage

The best starting point is to take a look at the different sample projects in the `/samples` directory.
This showcases different React implementations as well as a vanilla web UI layer (which you can always
interchange with your own implementation).

### Basic setup

There are two main ingredients to any Nutkin setup, a `Navigator` and a `Scene`. The Scene represents a
screen in an application and can be regarded as a basic building block for the application flow. The
Navigator controls the application flow and determines which screen is presented to the user.

```typescript
import {Scene} from 'nutkin';

class MyScene implements Scene {
    public onStart(): void {
        //When scene is activated it is started
    }

    public onStop(): void {
        //When scene becomes dormant (e.g. user navigates away)
        //the scene is stopped
    }

    public onDestroy(): void {
        //When application is done with the scene it is destroyed
        //the scene will not be started after being destroyed
    }
}
```

Navigation between scenes can now be controlled using a Navigator, in the example
below you can see the most basic of navigators; i.e. the `SingleSceneNavigator`.
However some batteries are included such as a `StackNavigator` and `CompositeStackNavigator`.

```typescript
import {Scene, SingleSceneNavigator} from 'nutkin';

export class MyNavigator extends SingleSceneNavigator {
    public createScene(): Scene {
        return new MyScene();
    }
}
```

To render this to your UI you can now subscribe to the scene changes coming
from the navigator. However you probably want to use one of the included drivers.

```typescript
const navigator = new MyNavigator();
const listener = new MyUIListener();

navigator.addNavigatorEventsListener(listener);
```

### Web

Nutkin is not a new routing solution, however reacting to a user requesting a new url
is part of navigation on the web. This can be done using the [History](https://developer.mozilla.org/en-US/docs/Web/API/History)
api or the excellent wrapper from [ReactTraining](https://github.com/ReactTraining/history).

Since this is an essential part of PWAs and the web Nutkin provides an implementation for the
`CompositeStackNavigator` called the `HistoryCompositeStackNavigator` which allows
for switching between navigators using the Url. For a working example see `5. Routing` wich utilizes
the framework agnostic routing solution [Universal router](https://github.com/kriasoft/universal-router).

```typescript
import {Location} from 'history';
import UniversalRouter from 'universal-router/sync';
//... and some more imports

export class AppNavigator extends HistoryCompositeStackNavigator implements HomeEvents, ViewUserEvents, ContactEvents {
    private routes = [
        {
            path: '/home',
            action: () => new HomeNavigator(this),
        },
        {
            path: '/contact',
            action: () => new ContactNavigator(this),
        },
    ];

    private router = new UniversalRouter<Context, Navigator>(this.routes);

    public navigatorForLocation(location: Location): Navigator {
        return this.router.resolve(location.pathname);
    }

    public back(): void {
        this.history.goBack();
    }

    public onContactRequested(): void {
        this.history.push('/contact');
    }
}
```

### React

Nutkin is ideal for use with React, the `Navigator` allows for registering
a listener which receives a stream of scenes which should be rendered.

The scene will provide its corresponding component to our Nutkin React implementation as follows:

```typescript
import {Scene, ViewProvidingScene} from 'nutkin';

class MyScene implements Scene, ViewProvidingScene<MyScene> {
    ...
    public getView(): ComponentType<{scene: MyScene}> {
        return MyComponent;
    }
    ...
}
```

Inside of the component we will have access to this scene so it can react to
changes within the scene; for reference on how to hook up Mobx, RxJS or vanilla see example `4. Multi scene`:

```typescript jsx
interface OwnProps {
    scene: MyScene
}

const MyComponent = ({scene}: OwnProps) => {
    return <div>Hi Nutkin!</a>
}
```

Last of all we need to hook up everything as follows:

```typescript jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Nutkin} from 'nutkin';

ReactDOM.render(<Nutkin navigator={new MyNavigator()} />, document.getElementById('app'));
```
