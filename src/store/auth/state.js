export default {
  user: JSON.parse(localStorage.getItem('users') || null),
  permission: JSON.parse(localStorage.getItem("permission") || null)
};
