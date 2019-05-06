/**
 * Существуют блокирующие и неблокирующие эффекты.
 * Например, take — блокирующий эффект.
 * Достигнув эффекта take генератор заморозится до тех пор,
 * пока не произойдет dispatch экешна с ожидаемым паттерном.
 *
 * call тоже блокирует поток выполнения генератора в том случае, если ему
 * возвращается промис.
 */

// Core
import { take, put, call, apply } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../Api';

function* fetchVehicles(action) {
    const response = yield call(api.fetchVehicles, action.payload);
    const data = yield apply(response, response.json);

    return data;
}

export function* runExample() {
    while (true) {
        const action = yield take(types.FETCH_VEHICLES_ASYNC);

        const data = yield call(fetchVehicles, action);

        yield put(swapiActions.fillVehicles(data.results));
    }
}
