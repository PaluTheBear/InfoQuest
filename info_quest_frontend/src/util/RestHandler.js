import {questEndpoint, questsEndpoint, userInfoEndpoint} from "./constants";

const getQuestlines = async () => {
    return getMockQuestlines();
    const json = await fetch(questsEndpoint)
        .then(response => response.json())
        .catch(err => console.log(err));
    // return json
}

const getUserInfo = async () => {
    return getMockUserInfo();
    const json = await fetch(userInfoEndpoint)
        .then(response => response.json())
        .catch(err => console.log(err));
    // return json
}

const getQuest = async (id) => {
    return getMockQuest();
    const json = await fetch(`${questEndpoint}/${id}/`)
        .then(response => response.json())
        .catch(err => console.log(err));
    // return json
}

const getMockQuestlines = () => [
    {
        title: 'Welcome @ Uni',
        quests: [32, 159, 12, 323, 24, 1236, 734, 5464, 345, 253, 454]
    },
    {
        title: 'Java',
        quests: [32, 159, 12, 323]
    },
    {
        title: 'Theo',
        quests: [32, 159, 333, 12, 323]
    },
    {
        title: 'Campus',
        quests: [32, 123, 159, 12, 323]
    },
    {
        title: 'Saisonal',
        quests: [2, 3]
    }
];
const getMockUserInfo = () => [{id: 0, progress: 5}, {id: 2, progress: 2}];
const getMockQuest = () => (
    {
        id: Math.random(),
        title: "Questtitle",
        subtasks: [
            {
                title: "Das ist ein Subtasktitle",
                description: "Das ist eien tolle description. Hier steht gaaaanz viel Text...",
                validation: "checkmark"
            },
            {
                title: "Das ist ein weiterer Subtasktitle",
                description: "ALSKJDFSLDJFKASLKDFJASLDKFJASLDKFJASLDKFJASLKDFsadfasdfasdfasdfasdfasdf asdfasdfasdf sadfasdfklasdfjaskldfj",
                validation: "checkmark"
            }
        ]
    }
);

export {getUserInfo, getQuest, getQuestlines}