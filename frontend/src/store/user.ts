// Utilities
import {defineStore} from 'pinia'
import {deleteCookie, getCookie, setCookes} from "@/utils/cookies";
import router from "@/router";
import {post} from "@/utils/conexaoApi";
import {getApp} from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, User } from "firebase/auth";
import firebaseApp from '@/plugins/firebase';

// const app = getApp(import.meta.env.VITE_FIREBASE_PROJECT_ID);
const app = getApp();
const auth = getAuth(app);

const defaultState = {
  accessToken: '',
  refreshToken: '',
  name: '',
  email: '',
  photoUrl: '',
  expirationTime: null
}

export const useUserStore = defineStore('user', {
  state: () => ({...defaultState}),
  getters: {
    getUser: (state) => state,
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    setUser(user: { [key: string]: any }) {
      this.accessToken = user.accessToken
      this.refreshToken = user.refreshToken
      this.name = user.name
      this.email = user.email
      this.photoUrl = user.photoUrl
      this.expirationTime = user.expirationTime

      setCookes('accessToken', user.accessToken, 1);
      setCookes('refreshToken', user.refreshToken, 30);
      setCookes('name', user.name, 30);
      setCookes('email', user.email, 30);
      setCookes('photoUrl', user.photoUrl, 30);
    },
    fromCookies() {
      this.accessToken = getCookie('accessToken') || '';
      this.refreshToken = getCookie('refreshToken') || '';
      this.name = getCookie('name') || '';
      this.email = getCookie('email') || '';
      this.photoUrl = getCookie('photoUrl') || '';
    },
    loginWithEmail(email: string, password: string) {
      const data = {
        email: email,
        password: password,
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);

          post("auth/login", {}, data)
            .then((res) => {
              console.log(res);

              const user = {
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                name: userCredential.user.displayName,
                email: userCredential.user.email,
              }

              this.setUser(user);

              router.push('/home');
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          if(errorCode === 400){
            console.log(errorMessage)
          }
        });

    },
    async loginWithGoogle() {
      await signInWithPopup(auth, new GoogleAuthProvider())
        .then(async (result) => {
          const user = result.user as User;
          const tokenInfo = await user.getIdTokenResult();
          const data = {
            uid: user.uid,
            accessToken: tokenInfo.token,
            refreshToken: user.refreshToken,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            expirationTime: new Date(tokenInfo.expirationTime).getTime()
          }
          this.setUser(data);
          router.push('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateToken() {
      const user = await auth.currentUser as User;
      const tokenInfo = await user.getIdTokenResult(true);
      const data = {
        uid: user?.uid,
        accessToken: tokenInfo.token,
        refreshToken: user?.refreshToken,
        name: user?.displayName,
        email: user?.email,
        photoUrl: user?.photoURL,
        expirationTime: new Date(tokenInfo.expirationTime).getTime()
      }
      this.setUser(data);
    },
    logout() {
      this.accessToken = '';
      this.refreshToken = '';
      this.name = '';
      this.email = '';
      this.photoUrl = '';

      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      deleteCookie('name');
      deleteCookie('email');
      deleteCookie('photoUrl');

      router.push('/login');
    },
  },
})
