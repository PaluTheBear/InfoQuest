import {questEndpoint, questsEndpoint, userInfoEndpoint} from "./constants";

const getQuestlines = async () => {
    const json = await fetch(questsEndpoint)
        .then(response => response.json())
        .catch(err => console.log(err));
    // return json
    return getMockQuestlines();
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

const getMockQuestlines = () => [
    {
        title: 'Mock questline',
        quests: [32, 159, 12, 323, 24, 1236, 734, 5464, 345, 253, 454]
    },
    {
        title: 'Mock questline 2',
        quests: [32, 159, 12, 323]
    }
];
const getMockUserInfo = () => [{id: 0, progress: 5}, {id: 2, progress: 2}];
const getMockQuest = () => ({id: "id", title: "Questtitle", description: "Description stiudashakjsdaskjd"});

export {getUserInfo, getQuest, getQuestlines}