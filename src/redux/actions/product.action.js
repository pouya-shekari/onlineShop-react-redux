import {getProducts} from 'api/products.api';

export const setSelectedArticle = (data) => {
    return {type: 'ARTICLE_SET_SELECTED_ARTICLE', payload: data};
};

export const fetchProducts = () => {
    return (dispatch, getState) => {
        return getProducts()
            .then(response => {
                return response;
            })
            .catch(error => {
                // throw new Error('error')
                return Promise.reject(error);
            });
    }
};