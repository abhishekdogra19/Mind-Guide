const production = {
  url: import.meta.env.VITE_HOST_URL,
};
const development = {
  url: "http://localhost:3001",
};
export const config =
  import.meta.env.VITE_NODE_ENV === "development" ? development : production;
