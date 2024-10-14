interface Profile {
  id: number;
  profileImage: File | null;
  name: string;
  isToggle: boolean;
}

interface Message {
  message: string;
  time: string;
}

interface UserForm {
  id: number;
  profile: Profile;
  message: Message;
}

import { create } from "zustand";

interface ChatState {
  userForms: UserForm[];
  profiles: Profile[];

  addUserForm: (userForm: UserForm) => void;
  addProfileOnly: (
    id: number,
    profileImage: File | null,
    name: string,
    isToggle: boolean
  ) => void;
  updateFormsProfile: (id: number, profile: Profile) => void;
  updateProfileOnly: (
    id: number,
    profileImage: File | null,
    name: string,
    isToggle: boolean
  ) => void;
  updateMessage: (id: number, message: Message) => void;
  removeUserForm: (id: number) => void;
  setIsToggle: (profileId: number, isToggle: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  userForms: [],
  profiles: [{ id: 0, profileImage: null, name: "철수", isToggle: false }],
  addUserForm: (userForm: UserForm) =>
    set((state) => ({
      userForms: [...state.userForms, userForm],
    })),

  addProfileOnly: (
    id: number,
    profileImage: File | null,
    name: string,
    isToggle: boolean
  ) =>
    set((state) => ({
      profiles: [...state.profiles, { id, profileImage, name, isToggle }],
    })),

  updateFormsProfile: (id: number, profile: Profile) =>
    set((state) => ({
      userForms: state.userForms.map((userform) =>
        userform.id === id ? { ...userform, profile } : userform
      ),
    })),

  updateProfileOnly: (
    profileId: number,
    profileImage: File | null,
    name: string,
    isToggle: boolean
  ) =>
    set((state) => ({
      profiles: state.profiles.map((profile) =>
        profile.id === profileId
          ? { ...profile, profileImage, name, isToggle }
          : profile
      ),
      userForms: state.userForms.map((userform) =>
        userform.profile.id === profileId
          ? {
              ...userform,
              profile: { id: profileId, profileImage, name, isToggle },
            }
          : userform
      ),
    })),

  updateMessage: (id: number, message: Message) =>
    set((state) => ({
      userForms: state.userForms.map((userform) =>
        userform.id === id ? { ...userform, message } : userform
      ),
    })),

  removeUserForm: (id: number) =>
    set((state) => ({
      userForms: state.userForms.filter((userform) => userform.id !== id),
    })),

  setIsToggle: (profileId: number, isToggle: boolean) =>
    set((state) => ({
      profiles: state.profiles.map((profile) =>
        profile.id === profileId ? { ...profile, isToggle } : profile
      ),
      userForms: state.userForms.map((userform) =>
        userform.profile.id === profileId
          ? { ...userform, profile: { ...userform.profile, isToggle } }
          : userform
      ),
    })),
}));
