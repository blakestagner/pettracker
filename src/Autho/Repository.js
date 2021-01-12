import axios from 'axios';
const BASE_URL = 'https://pet-api.blakestagner.com';
//const BASE_URL = 'http://localhost:3330';


export function login (data) {
    return axios.post(`${BASE_URL}/api/login`, { 
        email: data.email, 
        password: data.password 
    })
    .then(response => {
        localStorage.setItem('x-access-token', response.data.token);
        localStorage.setItem('x-access-token-expiration', Date.now() + 1000 * 60 * 60 * 24 * 30 );
        return response.data
    })
    .catch((err) => Promise.reject(err.response.data));
}

export function register (data) {
    return axios.post(`${BASE_URL}/api/register`, {
        fname: data.fname, 
        lname: data.lname, 
        email: data.email, 
        password: data.password_reg,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


export function isAuthenticated() {
    return localStorage.getItem('x-access-token') 
    && localStorage.getItem('x-access-token-expiration') > Date.now();
}

export function getUserInfo() {
    return axios.get(`${BASE_URL}/user/data`, { 
        params: { 'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
    }

export function updateUser () {
    return axios.get(`${BASE_URL}/user/updated-data`, { 
        params: { 'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(response => {
        localStorage.setItem('x-access-token', response.data.token);
        localStorage.setItem('x-access-token-expiration', Date.now() + 1000 * 60 * 60 * 24 * 30 );
        return response.data
    })
    .catch((err) => Promise.reject(err.response.data));
}

export function registerPet(data) {
    return axios.post(`${BASE_URL}/api/register-pet`, {
        name: data.name,
        type: data.type,
        birthday: data.birthday,
        feed_perday: data.feed_perday,
        feed_amount: `${data.feed_amount} ${data.feed_unit}`,
        'x-access-token': localStorage.getItem('x-access-token')
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err.response.data
    })
}

export function getPetListInfo(data) {
    return axios.get(`${BASE_URL}/api/pet-list-data`, { 
        params: { 'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}

export function getPetInfo(data) {
    return axios.get(`${BASE_URL}/api/pet-data`, { 
        params: { 
            pet_id: data,
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
export function getAllPetInfo(data) {
    return axios.get(`${BASE_URL}/api/pet-all-data`, { 
        params: { 
            pet_id: data,
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
/*log food info*/
export function logFoodActivity(data) {
    return axios.post(`${BASE_URL}/api/log-food-activity`, {
        id: data.id,
        amount_ate: data.amount_ate,
        feed_amount: data.feed_amount,
        feed_time: data.feed_time,
        'x-access-token': localStorage.getItem('x-access-token')
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err.response.data
    })
}
/*log pee info*/
export function logPeeActivity(data) {
    return axios.post(`${BASE_URL}/api/log-pee-activity`, {
        id: data.id,
        pee_time: data.pee_time,
        missed: data.missed,
        'x-access-token': localStorage.getItem('x-access-token')
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err.response.data
    })
}
/*log poo info*/
export function logPooActivity(data) {
    return axios.post(`${BASE_URL}/api/log-poo-activity`, {
        id: data.id,
        poo_time: data.poo_time,
        missed: data.missed,
        consistency: data.consistency,
        'x-access-token': localStorage.getItem('x-access-token')
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err.response.data
    })
}
//Pet eat
export function getPetEatInfo(data) {
    return axios.get(`${BASE_URL}/api/pet-eat-data`, { 
        params: { 'pet_id': data, 'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
    }
//Pet pee
export function getPetPeeInfo(data) {
    return axios.get(`${BASE_URL}/api/pet-pee-data`, { 
        params: { 'pet_id': data, 'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
    }

/*pet poo*/
export function getPetPooInfo(data) {
    return axios.get(`${BASE_URL}/api/pet-poo-data`, { 
        params: { 'pet_id': data, 'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
    }

/*img uplaod*/
export function uploadUserImage(data) {
    return axios.post(`${BASE_URL}/api/upload-user-img`, data, {
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')
            
        } 
    })
    .then(res => res)
    .catch(err => err.data)
}
export function uploadPetImage(data) {
    return axios.post(`${BASE_URL}/api/upload-pet-img`, data, {
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')
        } 
    })
    .then(res => res)
    .catch(err => err.data)
}


//friends
export function getFriends() {
    return axios.get(`${BASE_URL}/api/get-friends`, { 
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}

//search    
export function searchUsers(data) {
    return axios.get(`${BASE_URL}/api/search-users`, {
        params: {
            search_query: data,
            'x-access-token': localStorage.getItem('x-access-token')
        }
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err.response.data
    })
}
/*send friend request*/
export function sendFriendReuest(data) {
    return axios.post(`${BASE_URL}/api/send-friend-request`, data, {
        params: { 
            id: data,
            'x-access-token': localStorage.getItem('x-access-token')
            
        } 
    })
    .then(res => res)
    .catch(err => err.data)
}