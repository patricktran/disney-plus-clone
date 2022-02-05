type ApiConfig = {
  disneyBaseUrl: string;
};

export type AppConfig = {
  env: "dev" | "qa" | "integ" | "prod";
  api: ApiConfig;
};
