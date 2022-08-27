import HTTPService from '../services/HTTPService'
const types = {
    EPISODES_GET: 'EPISODES_GET',
}

export const actions = {
    getEpisodes: async (dispatch, episodes) => {
        let data = await HTTPService.getData('episode', episodes)
        if (data) {
            dispatch({
                type: types.EPISODES_GET,
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
        case types.EPISODES_GET:
            return {
                ...state,
                list: payload
            }
        default:
            return state
    }
}
