/**
 * В саге-генераторе можно вызывать методы в явном виде, без использования эффектов.
 * Можно также комбинировать эффекты с явными операциями без эффектов.
 *
 * Однако использовать эффекты — предпочтительней.
 * Это улучшает тестируемость саги-генератора,
 * а также явность написанного кода.
 */

// Core
import { take, put } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../Api';

export function* runExample() {
    while (true) {
        const action = yield take(types.FETCH_PLANETS_ASYNC);

        const response = yield api.fetchPlanets(action.payload);
        const data = yield response.json();

        yield put(swapiActions.fillPlanets(data.results));
    }
}
