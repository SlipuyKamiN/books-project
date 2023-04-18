import { initializeApp } from 'firebase/app'; // for initial
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'; //access to databes from app
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
  onAuthStateChanged(auth, user => {
    if (user) {
      userBtn.querySelector('span').nextSibling.textContent = user.displayName;
      signUpBtn.classList.add('is-hidden');
      userBtn.classList.remove('is-hidden');
      authUserMenu.classList.remove('is-hidden');
      logOutBtn.classList.add('is-hidden');

      dropUserBtn.querySelector('span').nextSibling.textContent = user.displayName;
      dropSignUpBtn.classList.add('is-hidden');
      dropUserBtn.classList.remove('is-hidden');
      dropAuthUserMenu.classList.remove('is-hidden');
      dropLogOutBtn.classList.remove('is-hidden');
      localStorage.setItem('user-data', JSON.stringify({
        id: user.uid,
        name: user.displayName,
        mail: user.email}));  
    } else {
      authUserMenu.classList.add('is-hidden');
      userBtn.classList.add('is-hidden');
      signUpBtn.classList.remove('is-hidden');

      dropSignUpBtn.classList.remove('is-hidden');
      dropAuthUserMenu.classList.add('is-hidden');
      dropUserBtn.classList.add('is-hidden');
      localStorage.removeItem('user-data');    
    }
  });
};

monitorAuthState();

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
    console.log(userCredential);
    userBtn.querySelector('span').nextSibling.textContent = user.displayName;
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
    const user = userCredential.user;
    console.log(user);
    modalWindow.classList.add('is-hidden');
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

//Error code transform to message

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
          return 'Your password must be at least 8 characters long'

    default:
      return `Error code: ${authCode}. Please check the data`;
  }
}
