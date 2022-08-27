import HTTPService from '../services/HTTPService'
const types = {
    CHARACTERS_GET: 'CHARACTERS_GET',
}

export const actions = {
    getCharacters: async (dispatch, page) => {
        let data = undefined
        if (page) {
            data = await HTTPService.getAllData('character', page)
        } else {
            data = await HTTPService.getData('character')
        }

        if (data) {
            dispatch({
                type: types.CHARACTERS_GET,
                payload: data.results
            })
        }
        return data
    }
}

const initialState = {
    list: []
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.CHARACTERS_GET:
            return {
                ...state,
                list: payload
            }
        default:
            return state
    }
}
