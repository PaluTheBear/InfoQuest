import {questEndpoint, questsEndpoint, userInfoEndpoint} from "./constants";

const getQuests = () => {
    const json = fetch(questsEndpoint).then((response) => {
        return response.json();
    })
    // return json
    return getMockQuests();
}

const getUserInfo = () => {
    const json = fetch(userInfoEndpoint).then((response) => {
        return response.json();
    });
    // return json
    return getMockUserInfo();
}

const getQuest = (id) => {
    const json = fetch(`${questEndpoint}/${id}/`).then((response) => {
        return response.json()
    })
    // return json
    return getMockQuest();
}

const getMockQuests = () => 0
const getMockUserInfo = () => 0
const getMockQuest = () => 0

export {getUserInfo, getQuest, getQuests}