import { atom } from "recoil"

export const IsLogin = atom({
  key : "IsLogin",
  default : false
});

export const likedCardsState = atom({
  key: 'likedCardsState',
  default: [],
});

export const searchQueryState = atom({
  key: 'searchQueryState', // 추가된 부분
  default: '',
})