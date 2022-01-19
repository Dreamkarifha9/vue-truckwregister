module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
  "plugin:vue/recommended",
  "eslint:recommended",
  "prettier",
  "prettier/vue"],
  parserOptions: {
    parser: "babel-eslint"
  },
  
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-use-v-if-with-v-for": "off",
    "no-unused-vars": 0,
    "no-unused-vars": "off",
  },
};