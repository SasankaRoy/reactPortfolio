import { atom } from "recoil";

const modelState = atom({
  key: "model",
  default: false,
});

export const signInState = atom({
  key: "signIn",
  default: false,
});

export const HeroState = atom({
  key: "heroState",
  default: false,
});

export const AboutState = atom({
  key: "aboutState",
  default: false,
});

export const ProjectState = atom({
  key: "projectState",
  default: false,
});

export const SkillState = atom({
  key: "skillState",
  default: false,
});

export const ContactState = atom({
  key: "userState",
  default: false,
});
export default modelState;
