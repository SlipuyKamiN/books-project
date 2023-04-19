import { initializeApp } from 'firebase/app'; // for initial
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, get, update, child } from 'firebase/database'; //access to databes from app
import Notiflix from 'notiflix';
Notiflix.Notify.init({ position: 'center-top' });

const firebaseConfig = {
  apiKey: 'AIzaSyCJZfRrsHQkGY832RTQdNJAXqiStLwTuCM',
  authDomain: 'powerhouse-book.firebaseapp.com',
  projectId: 'powerhouse-book',
  storageBucket: 'powerhouse-book.appspot.com',
  messagingSenderId: '973042323439',
  appId: '1:973042323439:web:80208c7a84163eaba8701a',
  databaseURL: 'https://powerhouse-book-default-rtdb.firebaseio.com',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const formEl = document.querySelector('.form');
const submitBtn = document.querySelector('.form__btn-submit');
const modalWindow = document.querySelector('div.auth__modal-js');
const authUserMenu = document.querySelector('.menu');
const signUpBtn = document.querySelector('.auth__modal-open-js');
const userBtn = document.querySelector('.authorised-btns__wrapper');
const logOutBtn = document.querySelector('.log-out-btn-js');
const dropAuthUserMenu = document.querySelector('.drop-menu');
const dropSignUpBtn = document.querySelector('.drop-auth__modal-open-js');
const dropUserBtn = document.querySelector('.drop-btn-user');
const dropLogOutBtn = document.querySelector('.drop-log-out-btn');

//Status check (user is signed in or not)

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async user => {
    if (user) {
      userBtn.querySelector('span').nextSibling.textContent = user.displayName;
      signUpBtn.classList.add('is-hidden');
      userBtn.classList.remove('is-hidden');
      authUserMenu.classList.remove('is-hidden');
      logOutBtn.classList.add('is-hidden');

      dropUserBtn.querySelector('span').nextSibling.textContent =
        user.displayName;
      dropSignUpBtn.classList.add('is-hidden');
      dropUserBtn.classList.remove('is-hidden');
      dropAuthUserMenu.classList.remove('is-hidden');
      dropLogOutBtn.classList.remove('is-hidden');
      localStorage.setItem(
        'user-data',
        JSON.stringify({
          id: user.uid,
          name: user.displayName,
          mail: user.email,
        })
      );
      const shoppingList = await getUserData();
      localStorage.setItem('books-data', JSON.stringify(shoppingList));
    } else {
      authUserMenu.classList.add('is-hidden');
      userBtn.classList.add('is-hidden');
      signUpBtn.classList.remove('is-hidden');

      dropSignUpBtn.classList.remove('is-hidden');
      dropAuthUserMenu.classList.add('is-hidden');
      dropUserBtn.classList.add('is-hidden');
    }
  });
};

monitorAuthState(); //Run status check

//Create user with name, email and password

const CreateUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    modalWindow.classList.add('is-hidden');

    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    userBtn.querySelector('span').nextSibling.textContent = user.displayName;
    writeInitialUserData(user.uid, user.email);
  } catch (error) {
    const errorCode = error.code;
    Notiflix.Notify.failure(
      mapAuthCodeToMessage(errorCode) || 'Something went wrong'
    );
  }
};

//Log in user with email and password

const LogInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    modalWindow.classList.add('is-hidden');
    document.body.classList.remove('modal-open');
  } catch (error) {
    const errorCode = error.code;
    Notiflix.Notify.failure(
      mapAuthCodeToMessage(errorCode) || 'Something went wrong'
    );
  }
};

//Sign out

const handleSignOut = async () => {
  try {
    await signOut(auth);
    document.location.href = './index.html';
    localStorage.removeItem('user-data');
    localStorage.removeItem('books-data');
  } catch (error) {
    const errorCode = error.code;
    Notiflix.Notify.failure(
      mapAuthCodeToMessage(errorCode) || 'Something went wrong'
    );
  }
};

logOutBtn.addEventListener('click', handleSignOut);
dropLogOutBtn.addEventListener('click', handleSignOut);

//On form submit

const handleFormSubmit = event => {
  event.preventDefault();
  const { mail, password } = event.currentTarget.elements;
  const userEmail = mail.value.trim();
  const userPassword = password.value.trim();

  if (submitBtn.textContent.toLowerCase() === 'sign up') {
    const { name } = event.currentTarget.elements;
    const userName = name.value.trim();
    CreateUser(userName, userEmail, userPassword);
  } else if (submitBtn.textContent.toLowerCase() === 'sign in') {
    LogInUser(userEmail, userPassword);
  } else {
    Notiflix.Notify.failure('Something went wrong');
  }
};

formEl.addEventListener('submit', handleFormSubmit);

//Error code transform to human friendly message

function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case 'auth/invalid-password':
      return 'Password provided is not corrected';

    case 'auth/invalid-email':
      return 'Email provided is invalid';

    case 'auth/wrong-password':
      return 'Wrong password. Please try again';

    case 'auth/user-not-found':
      return 'User not found. Please check the data';

    case 'auth/email-already-in-use':
      return 'The provided email is already in use.';

    case 'auth/weak-password':
      return 'Your password must be at least 8 characters long';

    default:
      return `Error code: ${authCode}. Please check the data`;
  }
}

// DATABASE FUNCTIONS

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const dbRef = ref(getDatabase());

//Write initial data for user then sign up

function writeInitialUserData(userId, email) {
  set(ref(database, 'users/' + userId), {
    email: email,
    selectedMode: 'light',
    shoppingList: [],
  });
}

//Write user data (shopping list) to DB

export async function writeUserData(newData) {
  try {
    // console.log('writeUserData');
    const updates = { shoppingList: newData };
    onAuthStateChanged(auth, user => {
      if (user) {
        const userId = user.uid;
        update(ref(database, `users/${userId}`), updates);
      } else {
        return;
      }
    });
  } catch (error) {
    const errorCode = error.code;
    Notiflix.Notify.failure(`Update failed! Error code: ${errorCode}`);
  }
}

//Get user shopping list from DB

export const getUserData = async () => {
  const user = JSON.parse(localStorage.getItem('user-data'));
  const userId = user.id;
  const userEmail = user.email;
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.val() !== null && snapshot.val().shoppingList) {
      const value = await snapshot.val().shoppingList;
      return value;
    } else {
      return [];
    }
  } catch (error) {
    Notiflix.Notify.failure(`Error getting user data from DB: ${error}`);
  }
};
