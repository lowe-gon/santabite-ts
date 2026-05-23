const Configuration = {
  /*
   * Standard conventional config ruleset
   */
  extends: ["@commitlint/config-conventional"],

  /*
   * Remove the atom parser preset to allow standard type: subject parsing
   */
  formatter: "@commitlint/format",

  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "chore",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "revert",
      ],
    ],
    // Changed from 2 (error) to 0 (disabled) so scopes are optional
    // and won't throw false positives on complex strings.
    "scope-empty": [0, "always"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
  },

  ignores: [(commit) => commit === ""],
  defaultIgnores: true,
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
  prompt: {
    messages: {},
    questions: {
      type: {
        description: "please input type:",
      },
    },
  },
};

export default Configuration;
