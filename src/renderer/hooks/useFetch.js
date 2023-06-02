const prodBase = 'https://password-manager-project.herokuapp.com';
const devBase = 'http://127.0.0.1:3000';

const useFetch = async (url, method, params) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Accept': '*',
      'Access-Control-Allow-Origin': 'localhost:1212',
      'Access-Control-Allow-Credentials': true,
    },
    credentials: 'include',
    method,
  };

  const response = await fetch(`${prodBase}${url}?${params}`, options)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });

  return response;
};

export default useFetch;
