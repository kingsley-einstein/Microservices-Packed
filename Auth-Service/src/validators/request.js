export default (request, keys) => keys.every((checkedKeys) => {
  return Object.keys(request.body).some((bodyKeys) => bodyKeys === checkedKeys);
});
