import {
  AppUserData,
  AuthProviderQueryFn,
} from "@miguelludert/frontend-common";

const ipcRenderer = window.electron.ipcRenderer;

export const authQueryFn: AuthProviderQueryFn = {
  // AuthenticatorProps methods
  handleSignOut: async () => {
    return ipcRenderer.invoke("handleSignOut");
  },
  // AuthenticatorProps methods
  handleSignIn: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return ipcRenderer.invoke("handleSignIn", { email, password });
  },
  handleCreateAccount: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.info("handleCreateAccount");
    return ipcRenderer.invoke("handleCreateAccount", { email, password });
  },
  handleForgotPassword: async ({ email }: { email: string }) => {
    return ipcRenderer.invoke("handleForgotPassword", { email });
  },

  // AuthProviderQueryFn additional methods
  handleSaveUserDataMutationFn: async (data: AppUserData) => {
    return ipcRenderer.invoke("handleSaveUserDataMutationFn", data);
  },
  handleGetUserDataQueryFn: async () => {
    return ipcRenderer.invoke("handleGetUserDataQueryFn");
  },
  handleSaveEmailAndPasswordMutationFn: async (args: {
    oldPassword: string;
    email?: string;
    newPassword?: string;
  }) => {
    return ipcRenderer.invoke("handleSaveEmailAndPasswordMutationFn", args);
  },
  handleUploadAvatarMutationFn: async ({ file }: { file: File }) => {
    const args = {
      filePath: file.path,
      fileName: file.name,
      fileType: file.type,
    };
    return ipcRenderer.invoke("handleUploadAvatarMutationFn", args);
  },
  handleGetAvatarMutationFn: async () => {
    return ipcRenderer.invoke("handleGetAvatarMutationFn");
  },
} as AuthProviderQueryFn;
