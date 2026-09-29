import * as SecureStore from "expo-secure-store";
import { TokenCache } from "@clerk/clerk-expo";
import { Platform } from "react-native";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
        try {
            const item = await SecureStore.getItemAsync(key);
            if (item) {
                console.log(`SecureStorage: getting token for ${key}`);
            } else {
                console.log(`SecureStorage: no token found for ${key}`);
            }
            return item;
        } catch (error) {
            console.log(error); 
            return undefined;
        }
    },
    saveToken: async (key: string, token: string) => {
        return SecureStore.setItemAsync(key, token);
    }
  };
};

export const tokenCache = Platform.OS !== "web" ? createTokenCache() : undefined;