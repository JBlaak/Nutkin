import {HistoryCompositeStackNavigator} from '../history_composite_stack_navigator';
import {History, Location, LocationState} from 'history';
import {Navigator} from '../../core/navigator';

export class TestHistoryCompositeStackNavigator extends HistoryCompositeStackNavigator {
    public locations: Array<Location<LocationState>> = [];

    constructor(
        public history: History<LocationState>,
        public router: (location: Location<LocationState>) => Navigator,
    ) {
        super(history);
    }

    public navigatorForLocation(location: Location<LocationState>): Navigator {
        this.locations.push(location);

        return this.router(location);
    }
}
