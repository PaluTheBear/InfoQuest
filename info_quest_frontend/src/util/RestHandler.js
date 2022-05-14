import {questsEndpoint, questlinesEndpoint, userInfoEndpoint} from "./constants";

const getQuestlines = async () => {
    return getMockQuestlines();
    const json = await fetch(questlinesEndpoint)
        .then(response => response.json())
        .catch(err => console.log(err));
    // return json
}

const getQuestline = async (id) => {
    return getMockQuestlines()[id];
    const json = await fetch(`${questlinesEndpoint}/${id}`)
        .then(response => response.json())
        .catch(err => console.log(err));
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
    const json = await fetch(`${questsEndpoint}/${id}/`)
        .then(response => response.json())
        .catch(err => console.log(err));
    // return json
}

const updateProgress = async (questId, progress) => {
    return console.log('updated progress');
    const json = await fetch(`${userInfoEndpoint}/`)
        .then(response => response.json())
        .catch(err => console.log(err));
}

const getMockQuestlines = () => [
    {
        id: 0,
        title: 'Welcome @ Uni',
        quests: [32, 159, 12, 323, 24, 1236, 734, 5464, 345, 253, 454]
    },
    {
        id: 1,
        title: 'Java',
        quests: [32, 159, 12, 323]
    },
    {
        id: 2,
        title: 'Theo',
        quests: [32, 159, 333, 12, 323]
    },
    {
        id: 3,
        title: 'Campus',
        quests: [32, 123, 159, 12, 323]
    },
    {
        id: 4,
        title: 'Saisonal',
        quests: [2, 3]
    }
];
const getMockUserInfo = () => [{id: 32, progress: 1}, {id: 2, progress: 0}];
const getMockQuest = () => (
    {
        id: Math.random(),
        title: "Questtitle",
        subtasks: [
            {
                title: "Das ist ein Subtasktitle",
                description: "Das ist eien tolle description. Hier steht gaaaanz viel Text...",
                validation: {
                    type: 'checkmark'
                }
            },
            {
                title: "Das ist ein weiterer Subtasktitle",
                description: "ALSKJDFSLDJFKASLKDFJASLDKFJASLDKFJASLDKFJASLKDFsadfasdfasdfasdfasdfasdf asdfasdfasdf sadfasdfklasdfjaskldfj",
                validation: {
                    type: 'question',
                    answer: 'testanswer'
                }
            }
        ]
    }
);

export {getUserInfo, getQuest, getQuestlines, getQuestline, updateProgress}