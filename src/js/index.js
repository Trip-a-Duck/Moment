import requests from './requests';

import '../scss/pages/_main.scss';

(async () => {
  try {
    const response = await requests.postToggleLikedButton(1);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
