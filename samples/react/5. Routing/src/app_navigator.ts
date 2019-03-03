import {HomeEvents} from './scenes/home_scene';
import {ViewUserEvents} from './scenes/view_user_scene';
import {ContactEvents} from './scenes/contact_scene';
import {HistoryCompositeStackNavigator} from '../../../../src/web/history_composite_stack_navigator';
import {Navigator} from '../../../../src/nutkin';
import {Location} from 'history';
import {HomeNavigator} from './home_navigator';
import {ViewUserNavigator} from './view_user_navigator';
import {ContactNavigator} from './contact_navigator';
import {Context} from 'universal-router';
import UniversalRouter from 'universal-router/sync';

export class AppNavigator extends HistoryCompositeStackNavigator implements HomeEvents, ViewUserEvents, ContactEvents {
    private routes = [
        {
            path: '', // optional
            action: () => new HomeNavigator(this),
        },
        {
            path: '/home',
            action: () => new HomeNavigator(this),
        },
        {
            path: '/contact',
            action: () => new ContactNavigator(this),
        },
        {
            path: '/user/:id',
            action: (context: Context) => new ViewUserNavigator(parseInt(context.params.id, 10), this),
        },
    ];

    private router = new UniversalRouter<Context, Navigator>(this.routes);

    public navigatorForLocation(location: Location): Navigator {
        return this.router.resolve(location.pathname);
    }

    public back(): void {
        this.history.goBack();
    }

    public onContactClick(): void {
        this.history.push('/contact');
    }

    public onUserClick(userId: number): void {
        this.history.push('/user/' + userId);
    }
}
