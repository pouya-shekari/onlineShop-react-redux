const initialState = {
    articles: [
        {id: 1, title: 'new Article'}
    ],
    selectedArticle: null
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ARTICLE_SET_SELECTED_ARTICLE':
            return {...state, selectedArticle: action.payload};
        default:
            return state;
    }
};

export {ProductReducer};


