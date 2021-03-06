import axios from 'axios';
const BASE_URL = 'https://pet-api.blakestagner.com';
//const BASE_URL = 'http://localhost:3330';


export function login (data) {
    let x = new Date();
    let hoursDiff = x.getHours() - x.getTimezoneOffset() / 60;
    x.setHours(hoursDiff);
    return axios.post(`${BASE_URL}/api/login`, { 
        email: data.email, 
        password: data.password,
        login_time: x
    })
    .then(response => {
        localStorage.setItem('x-access-token', response.data.token);
        localStorage.setItem('x-access-token-expiration', Date.now() + 1000 * 60 * 60 * 24 * 30 );
        return response.data
    })
    .catch((err) => Promise.reject(err.response.data));
}

export function logOutTime () {
    let x = new Date();
    let hoursDiff = x.getHours() - x.getTimezoneOffset() / 60;
    x.setHours(hoursDiff);
    return axios.post(`${BASE_URL}/api/logOutTime`, { 
        'x-access-token': localStorage.getItem('x-access-token'), 
        logout_time:  x
    })
    .then(res => res.data)
    .catch(err => err);
}

export function register (data) {
    return axios.post(`${BASE_URL}/api/register`, {
        fname: data.fname, 
        lname: data.lname, 
        email: data.email, 
        password: data.password_reg,
    })
    .then(res => console.log(res))
    .catch(err => Promise.reject('Request Not Authenticated!'));
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
export function changeCurrentPet(data) {
    return axios.get(`${BASE_URL}/api/change-current-pet`, { 
        params: { 
            'id': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
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

export function uploadPetImage(data) {
    return axios.post(`${BASE_URL}/api/upload-pet-img`, data, {
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')
        } 
    })
    .then(res => res)
    .catch(err => err.data)
}


export function uploadUserImage(data) {
    return axios.post(`${BASE_URL}/api/upload-user-img`, data, {
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')
            
        } 
    })
    .then(res => res)
    .catch(err => err.data)
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
/*get friends list*/
export function getFriendsList() {
    return axios.get(`${BASE_URL}/api/get-friends-list`, { 
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}


//get users pending friend request
export function getUserPendingRequest() {
    return axios.get(`${BASE_URL}/api/get-user-pending-friend-request`, { 
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
//get user relationships with you
export function getAllFriends() {
    return axios.get(`${BASE_URL}/api/get-all-friends-list`, { 
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}

//get requetss sent to you
export function getFriendRequest() {
    return axios.get(`${BASE_URL}/api/get-friend-request`, { 
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
//all user requests
export function getUserRelationship() {
    return axios.get(`${BASE_URL}/api/get-all-user-request`, { 
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
//get users info after search for notification
export function getOtherUsers(data) {
    return axios.get(`${BASE_URL}/api/get-other-users`, { 
        params: { 
            'other_users': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
//accept friend request 
export function acceptFriendRequest(data) {
    return axios.post(`${BASE_URL}/api/accept-friend-request`, {
        id: data,
        'x-access-token': localStorage.getItem('x-access-token')
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err.response.data
    })
}
//deny request
export function denyFriendRequest(data) {
    return axios.delete(`${BASE_URL}/api/deny-friend-request`, {
        params: {
            'id': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
}
//cancel request
export function cancelFriendRequest(data) {
    return axios.delete(`${BASE_URL}/api/cancel-friend-request`, {
        params: {
            'other_user_id': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
}
//Remove friend
export function removeFriend(data) {
    return axios.delete(`${BASE_URL}/api/remove-friend`, {
        params: {
            'other_user_id': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
}

//delete posts
export function deleteFeedActivity(postId, petId) {
    return axios.delete(`${BASE_URL}/api/delete-feed-activity`, {
        params: {
            'post_id': postId,
            'pet_id': petId,
            'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
}

export function deletePeeActivity(postId, petId) {
    return axios.delete(`${BASE_URL}/api/delete-pee-activity`, {
        params: {
            'post_id': postId,
            'pet_id': petId,
            'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export function deletePooActivity(postId, petId) {
    return axios.delete(`${BASE_URL}/api/delete-poop-activity`, {
        params: {
            'post_id': postId,
            'pet_id': petId,
            'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
}
//get al user pets
export function getMyPetDetails(data) {
    return axios.get(`${BASE_URL}/api/get-my-pets`, { 
        params: { 
            'pets': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
//remove my pet
export function removePetOwner(pet_id, other_user_id) {
    return axios.delete(`${BASE_URL}/api/remove-pet-owner`, {
        params: {
            'pet_id': pet_id,
            'other_user_id': other_user_id, 
            'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
}
export function removeMyPet(data) {
    return axios.delete(`${BASE_URL}/api/remove-pet`, {
        params: {
            'pet_id': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
}
//get al user pets
export function getPetOwners(data) {
    return axios.get(`${BASE_URL}/api/get-pet-owners`, { 
        params: { 
            'pet_id': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
//get pet Requests
export function getPetRequests() {
    return axios.get(`${BASE_URL}/api/get-pet-requests`, { 
        params: { 
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
//accept pet request
export function acceptPetRequest(data) {
    console.log(data)
    return axios.get(`${BASE_URL}/api/accept-pet-request`, {
        params: { 
            'post_id': data,
            'x-access-token': localStorage.getItem('x-access-token')
        } 
    })
    .then(res => res)
    .catch(err => err.data)
}
export function denyPetRequest(data) {
    return axios.delete(`${BASE_URL}/api/deny-pet-request`, {
        params: {
            'post_id': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
}
export function sendPetRequest(friend_id, pet_id) {
    return axios.post(`${BASE_URL}/api/send-pet-request`, {
        friend_id: friend_id,
        pet_id: pet_id,
        'x-access-token': localStorage.getItem('x-access-token')
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err.response.data
    })
}
export function setFeedTime(pet_id, feed_time) {
    return axios.post(`${BASE_URL}/api/set-feed-time`, {
        pet_id: pet_id,
        feed_time: feed_time,
        'x-access-token': localStorage.getItem('x-access-token')
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err.response.data
    })
}
export function getFeedTime(data) {
    return axios.get(`${BASE_URL}/api/get-feed-time`, { 
        params: { 
            'pet_id': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
export function getSentPetRequests(data) {
    return axios.get(`${BASE_URL}/api/get-pet-request-sent`, { 
        params: { 
            'pet_id': data,
            'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
}
