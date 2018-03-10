var library = require("module-library")(require)

module.exports = library.export(
  "editor-dogfood",
  ["issue-bond", "sell-bond"],
  function(issueBond, sellBond) {

    issueBond("editor-dogfood", "Editor Dogfood", "Erik Pukinskis")

    issueBond.tasks("editor-dogfood", [
      "make it so when you type f you see a script with a string \"f\"",
    ])

    sellBond("editor-dogfood")

    return {}
  }
)
