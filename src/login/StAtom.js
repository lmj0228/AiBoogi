import { atom } from "recoil";

export const IsLogin = atom({
  key: 'IsLogin',
  default: localStorage.getItem('isLoginCheck') === 'true',
});

export const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.getItem('user')) || null,
});

export const likedCardsState = atom({
  key: 'likedCardsState',
  default: [],
});

export const searchQueryState = atom({
  key: 'searchQueryState', 
  default: '',
});

export const heartsState = atom({
  key: 'heartsState',
  default: JSON.parse(localStorage.getItem('likedHearts')) || [],
});
