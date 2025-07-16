export default {
  name: "M1SSION EXPO",
  slug: "m1ssion-expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    bundleIdentifier: "com.wikus77.m1ssionexpo",
    supportsTablet: true,
    buildNumber: "1.0.0",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    }
  },
  android: {
    package: "com.wikus77.m1ssionexpo",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    edgeToEdgeEnabled: true
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "90d952be-5bd4-4b50-bfb6-45b9ad5694ce"
    }
  },
  owner: "wikus77",
  cli: {
    appVersionSource: "remote"
  },
  plugins: ["expo-font"],
  jsEngine: "jsc"
};
