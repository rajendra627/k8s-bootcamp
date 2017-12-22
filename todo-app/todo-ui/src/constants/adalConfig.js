const adalConfig = {
  popUp: false,
  tenant: 'architech.ca',
  clientId: process.env.REACT_APP_CLIENT_ID || 'aa271f78-210a-46f2-a92d-ea0f5664aa39',
  extraQueryParameter: 'nux=1'
};

export default adalConfig;