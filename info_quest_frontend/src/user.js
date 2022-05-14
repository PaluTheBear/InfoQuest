import { createContext } from "react";

const CurrentUserContext = createContext({
    userId: 0,
    userProgress: []
});

export default CurrentUserContext;