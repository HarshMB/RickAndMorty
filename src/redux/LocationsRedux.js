import HTTPService from '../services/HTTPService'
const types = {
    LOCATIONS_GET: 'LOCATIONS_GET',
}

export const actions = {
    getLocations: async (dispatch, locations) => {
        let data = await HTTPService.getData('location', locations)
        if (data) {
            dispatch({
                type: types.LOCATIONS_GET,
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
        case types.LOCATIONS_GET:
            return {
                ...state,
                list: payload
            }
        default:
            return state
    }
}
