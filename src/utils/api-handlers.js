import { SERVER_URL } from '../utils/constants';

async function loginApi({ email, password }) {
  console.log(`inside api call`);
  console.log(email, password);
  try {
    const response = await fetch(`${SERVER_URL}/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    throw Error(error);
  }
}

async function registerApi({ email, password }) {
  console.log(`inside api call`);
  console.log(email, password);
  try {
    const response = await fetch(`${SERVER_URL}/api/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    throw Error(error);
  }
}

async function getCustomers() {
  console.log(`inside getCustomers`);
  try {
    const response = await fetch(`${SERVER_URL}/api/users?page=1`);
    return await response.json();
  } catch (error) {
    throw Error(error);
  }
}

export { loginApi, registerApi, getCustomers };