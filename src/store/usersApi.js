import axios from "axios";
import { customAxios } from "../http/CustomAxios";

export const getUserById = async (users, id) => {
    // const findUserById = await users.find((user) => user.id === id);
    // const response = await axios({
    //     method: "get",
    //     url: `http://localhost:8000/user/${id}`,
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    // });
    console.log("user");
    return await customAxios(`/user/${id}`, "get");
};
export const loginCheckApi = async (users, id) => {
    // const findUserById = await users.find((user) => user.id === id);
    return await customAxios("/user/check", "get");
};
export const getUserByUserId = async (users, userId) => {
    const findUserByUserId = await users.find((user) => user.userId === userId);
    return findUserByUserId;
};
export const getUserByKey = async (users, key) => {
    const findUserByUserId = await users.find((user) => key.test(user.name));
    return findUserByUserId;
};

export const postUser = async (users, user) => {
    const newUser = { ...user, userId: user.id, id: users.length };
    const response = await axios({
        method: "post",
        data: newUser,
        url: "http://localhost:8000/user/",
    });
    console.log(response);
    return await customAxios("/user/", "post", [...users, newUser]);
};

export const loginApi = async (users, user) => {
    // const checkUser = await users.find((data) => data.userId === user.id && data.password === user.password);
    const newUser = { ...user, userId: user.id, id: null };
    const response = await customAxios("/user/login", "post", newUser);

    return { isLogin: response.token ? true : false, user: response };
};

export const checkId = async (users, userId) => {
    const isCheckId = (await users.find((user) => user.userId === userId)) ? true : false;

    return isCheckId;
};

export const logoutApi = async (userId) => {
    return true;
};
export const putUsers = async (users, user, id) => {
    const findUsersIndex = await users.findIndex((user) => user.id === id);
    const { name, img } = user;
    if (findUsersIndex === -1) {
        console.error("not found");
        return;
    }
    const newUsers = [...users];
    newUsers.splice(findUsersIndex, 1, { ...users[findUsersIndex], name, img });
    return newUsers;
};
