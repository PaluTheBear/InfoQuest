import {questEndpoint, questsEndpoint, userInfoEndpoint} from "./constants";

const getQuests = async () => {
    const response = await fetch(questsEndpoint)
    const json = response.json();
    return getMockQuests();
}

const getUserInfo = async () => {
    const response = await fetch(userInfoEndpoint)
    const json = response.json();
    return getMockUserInfo();
}

const getQuest = async (id) => {
    const response = await fetch(`${questEndpoint}/${id}/`)
    const json = response.json();
    return getMockQuest();
}

const getMockQuests = () => 0
const getMockUserInfo = () => 0
const getMockQuest = () => 0
