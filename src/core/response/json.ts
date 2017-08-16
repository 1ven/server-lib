export default (data: any): string => {
  if (!isJson(data)) {
    throw new Error("Data is not JSON");
  }
  return JSON.stringify(data);
};

function isJson(arg) {
  // TODO: Implement check
  return true;
}
