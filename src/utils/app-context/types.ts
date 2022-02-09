type ApiConfig = {
  disneyBaseUrl: string;
};

export type AppConfigEnv = "dev" | "qa" | "integ" | "prod";

export type AppConfig = {
  env: AppConfigEnv;
  api: ApiConfig;
};
