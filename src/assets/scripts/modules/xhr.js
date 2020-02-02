// eslint-disable-next-line no-unused-vars
exports.getXhrData = (url) => new Promise((resolve, _reject) => {
  let data;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log(xhr.status);
      } else {
        data = JSON.parse(xhr.response);
        resolve(data);
      }
    }
  };
  xhr.send();
});
