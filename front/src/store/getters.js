const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  role: state => state.user.role,
  id: state => state.user.id
};
export default getters;
