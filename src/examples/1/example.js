/**
 * Основная концепция инструкций в redux-saga — это эффекты.
 * Эффект — это JavaScript объект, описывающий инструкцию.
 * take, call, put, apply и др. — это фабрики, производящие эффекты для разных целей.
 *
 * Сага-генератор предает эффект (или результат выражения справа от yield) middleware-у,
 * который и выполняет основную логику, описанную эффектом (или выражением).
 * После выполнения операции middleware «пробрасывает» результат обратно внутрь генератора.
 */

// Core
import { take, call, apply, put } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../Api';

export function* runExample() { // ←
    let page = 1;

    while (true) {
        yield take(types.FETCH_VEHICLES_ASYNC);

        const response = yield call(api.fetchVehicles, [ page ]);
        const data = yield apply(response, response.json);

        yield put(swapiActions.fillVehicles(data.results));

        page === 4 ? page = 1 : page += 1;
    }
}

/// ....

// saga middleware ←
// 1. saga takes an action with a type FETCH_VEHICLES_ASYNC...
// 2. generator.next();
// 3. saga registers an api request
// 4. saga resolves request to api
// 5. generator.next(response)
