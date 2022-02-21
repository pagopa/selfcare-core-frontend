const IS_DEVELOP = process.env.NODE_ENV === 'development';

export const MOCK_USER = IS_DEVELOP;
export const LOG_REDUX_ACTIONS = IS_DEVELOP;

export const STORAGE_KEY_TOKEN = 'token';

export const LOADING_TASK_SEARCH_PARTIES = 'SEARCH_PARTIES';
export const LOADING_TASK_SEARCH_PARTY = 'SEARCH_PARTY';
export const LOADING_TASK_SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const LOADING_TASK_TOKEN_EXCHANGE = 'TOKEN_EXCHANGE';
export const LOADING_TASK_PARTY_USERS = 'PARTY_USERS';
export const LOADING_TASK_SAVE_PARTY_USER = 'SAVE_PARTY_USER';
export const LOADING_TASK_FETCH_PRODUCT_ROLES = 'FETCH_PRODUCT_ROLES';
export const LOADING_TASK_FETCH_TAX_CODE = 'FETCH_TAX_CODE';
export const LOADING_TASK_ACTION_ON_PARTY_USER = 'ACTION_ON_PARTY_USER';
export const LOADING_TASK_UPDATE_PARTY_USER_STATUS = 'UPDATE_PARTY_USER_STATUS';
export const LOADING_TASK_DELETE_PARTY_USER = 'DELETE_PARTY_USER';
export const LOADING_TASK_FETCH_PARTY_USER = 'FETCH_PARTY_USER';
