import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');

export const post = (url, data, headers={}) => {
  const promise = fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'X-CSRFToken': csrfToken,
    },
    body: data
  });
  return promise;
};
