import { fromEvent } from 'graphcool-lib';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey';

(async () => {
  await admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://planning-poker-1d012.firebaseio.com',
  });
})();

async function getGoogleUser(googleToken) {
  try {
    const resp = await admin.auth().verifyIdToken(googleToken);
    return resp.uid;
  } catch (e) {
    throw new Error(e);
  }
}

async function getGraphcoolUser(api, googleUserId) {
  const query = `
    query getUser($googleUserId: String!) {
      User(googleUserId: $googleUserId) {
        id
      }
    }
  `;

  const variables = {
    googleUserId,
  };

  return api.request(query, variables);
}

async function createGraphcoolUser(api, googleUserId, displayName, email) {
  const mutation = `
    mutation createUser($googleUserId: String!, $displayName: String!, $email: String!) {
      createUser(
        googleUserId: $googleUserId,
        displayName: $displayName,
        email: $email
      ) {
        id
        displayName
        email
      }
    }
  `;

  const variables = {
    googleUserId,
    displayName,
    email,
  };

  return api.request(mutation, variables)
    .then(r => r.createUser.id);
}


export default async (event) => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { googleToken, displayName, email } = event.data;

    // call google API to obtain user data
    const googleUserId = await getGoogleUser(googleToken);

    // get graphcool user by google id
    const user = await getGraphcoolUser(api, googleUserId)
      .then(r => r.User);

    // check if graphcool user exists, and create new one if not
    let userId = null;

    if (!user) {
      userId = await createGraphcoolUser(api, googleUserId, displayName, email);
    } else {
      userId = user.id;
    }

    // generate node token for User node
    const token = await graphcool.generateAuthToken(userId, 'User');

    return {
      data: {
        id: userId,
        token,
        displayName,
        email,
      },
    };
  } catch (e) {
    return { error: e.toString() };
  }
};
