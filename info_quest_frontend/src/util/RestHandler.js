import {questEndpoint, questsEndpoint, userInfoEndpoint} from "./constants";

const getQuests = async () => {
    const json = await fetch(questsEndpoint)
        .then(response => response.json())
        .catch(err => console.log(err));
    // return json
    return getMockQuests();
}

const getUserInfo = async () => {
    const json = await fetch(userInfoEndpoint)
        .then(response => response.json())
        .catch(err => console.log(err));
    // return json
    return getMockUserInfo();
}

const getQuest = async (id) => {
    const json = await fetch(`${questEndpoint}/${id}/`)
        .then(response => response.json())
        .catch(err => console.log(err));
    // return json
    return getMockQuest();
}

const getMockQuests = () => [{title: "questLineTitle"}, {title: "questLineTitleTwo"}];
const getMockUserInfo = () => [{id: 0, progress: 5}, {id: 2, progress: 2}];
const getMockQuest = () => ({id: "id", title: "Questtitle", description: "Description stiudashakjsdaskjd"});

export {getUserInfo, getQuest, getQuests}