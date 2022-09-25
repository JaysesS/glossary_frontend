import { AuthAPIInstance } from "@/api";

export const AuthAPI = {
  /**
   *
   * @param {string} login
   * @param {string} password
   */
  login(login, password) {
    const url = "user/login";
    const data = { login, password };
    return AuthAPIInstance.post(url, data);
  },
  register(login, password) {
    const url = "user/register";
    const data = { login, password };
    return AuthAPIInstance.post(url, data);
  },
  me() {
    const url = "user/me";
    return AuthAPIInstance.get(url);
  },
  getWordList(offset, limit) {
    const url = "word/list";
    const data = { offset, limit };
    return AuthAPIInstance.get(url, { params: data });
  },
  getTagList(offset, limit) {
    const url = "tag/list";
    const data = { offset, limit };
    return AuthAPIInstance.get(url, { params: data });
  },
  getLinkList(offset, limit) {
    const url = "link/list";
    const data = { offset, limit };
    return AuthAPIInstance.get(url, { params: data });
  },
  getPriorityList(offset, limit) {
    const url = "priority/list";
    const data = { offset, limit };
    return AuthAPIInstance.get(url, { params: data });
  },
};