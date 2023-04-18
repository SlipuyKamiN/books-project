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

//Status check (user is signed in or not)

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      userBtn.querySelector('span').nextSibling.textContent = user.displayName;
      signUpBtn.classList.add('is-hidden');
      userBtn.classList.remove('is-hidden');
      authUserMenu.classList.remove('is-hidden');
      logOutBtn.classList.add('is-hidden');
      localStorage.setItem('user-data', JSON.stringify({
        id: user.uid,
        name: user.displayName,
        mail: user.email}));  
    } else {
      authUserMenu.classList.add('is-hidden');
      userBtn.classList.add('is-hidden');
      signUpBtn.classList.remove('is-hidden');
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

// Database cteation
import { getDatabase, ref, set, get, update, child } from 'firebase/database';

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const dbRef = ref(getDatabase());

function writeInitialUserData(userId, email) {
  set(ref(database, 'users/' + userId), {
    email: email,
    selectedMode: 'light',
    shoppingList: [1],
  });
}

// writeUserData({ selectedMode: 'pink' });

export async function writeUserData(updates) {
  try {
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

export async function getUserData() {
  onAuthStateChanged(auth, user => {
    if (user) {
      const userId = user.uid;
      // (async () => {
      //   try {
      //     const snapshot = await get(child(dbRef, `users/${userId}`));
      //     const value = await snapshot.val().selectedMode;
      //     console.log(value);
      //     // return value;
      //   } catch (error) {
      //     Notiflix.Notify.failure(`Error getting user data from DB: ${error}`);
      //   }
      // })();
      const value = getData(userId);
      console.log(value)
      return value;
    } else {
      return;
    }
  });
}

const data = await getUserData()

const getData = async (userId) => {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    const value = await snapshot.val().selectedMode;
    console.log(value);
    return value;
  } catch (error) {
    Notiflix.Notify.failure(`Error getting user data from DB: ${error}`);
  }
}

// console.log(getUserData())

// const colorValue =  getUserData()
// console.log("Во внешнем коде " + colorValue)


// function outerFunction() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const value = await getUserData();
//       console.log(value);
//       resolve(value);
//     } catch (error) {
//       console.error(error);
//       reject(error);
//     }
//   });
// }

// const vari = outerFunction();
// console.log(vari.then((value) => {return value}))



import { getAuth, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth(); // получаем экземпляр объекта аутентификации

// let activeUserId; // объявление переменной для хранения id активного пользователя

// (() => {onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // пользователь авторизован
//     activeUserId = user.uid; // записываем id в переменную
//     console.log("ID активного пользователя: " + activeUserId);
//   } else {
//     // пользователь не авторизован
//     activeUserId = null; // обнуляем id в переменной
//     console.log("Нет активного пользователя");
//   }
// });})()

// console.log(activeUserId)


let uid;
const user111 = auth.currentUser;
if (user111 !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user111.displayName;
  const email = user111.email;
  const photoURL = user111.photoURL;
  const emailVerified = user111.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  uid = user111.uid;
  console.log(uid)
}

console.log(uid)

const result = getData(auth.currentUser.uid).then(value => {return value});
console.log(result);