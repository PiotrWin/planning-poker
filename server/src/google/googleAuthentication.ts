import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import * as fetch from 'isomorphic-fetch'
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey';

interface User {
  id: string
}

interface GoogleUser {
  id: string
  email: string | null
}

interface EventData {
  googleToken: string
  displayName: string
}

(async () => {
    await admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://planning-poker-1d012.firebaseio.com',
  })
})();

export default async (event: FunctionEvent<EventData>) => {
  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { googleToken, displayName } = event.data

    // call google API to obtain user data
    const googleUserId = await getGoogleUser(googleToken)
    
    // get graphcool user by google id
    const user: User = await getGraphcoolUser(api, googleUserId)
      .then(r => r.User)

    // check if graphcool user exists, and create new one if not
    let userId: string | null = null

    if (!user) {
      userId = await createGraphcoolUser(api, googleUserId, displayName)
    } else {
      userId = user.id
    }

    // generate node token for User node
    const token = await graphcool.generateAuthToken(userId!, 'User')

    return { data: { id: userId, token, displayName } }
  } catch (e) {
    console.log(e)
    return { error: e.toString() }
  }
}

async function getGoogleUser(googleToken: string): Promise<GoogleUser> {
  try {
    const resp = await admin.auth().verifyIdToken(googleToken);
    return resp.uid;
  } catch(e) {
    throw new Error(e);
  }
}

async function getGraphcoolUser(api: GraphQLClient, googleUserId: string): Promise<{ User }> {
  const query = `
    query getUser($googleUserId: String!) {
      User(googleUserId: $googleUserId) {
        id
      }
    }
  `

  const variables = {
    googleUserId,
  }

  return api.request<{ User }>(query, variables)
}

async function createGraphcoolUser(
  api: GraphQLClient,
  googleUserId: string,
  displayName: string,
): Promise<string> {
  const mutation = `
    mutation createUser($googleUserId: String!, $displayName: String!) {
      createUser(
        googleUserId: $googleUserId,
        displayName: $displayName
      ) {
        id
        displayName
      }
    }
  `

  const variables = {
    googleUserId,
    displayName,
  }

  return api.request<{ createUser: User }>(mutation, variables)
    .then(r => r.createUser.id)
}
