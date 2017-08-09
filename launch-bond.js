var library = require("module-library")(require)

module.exports = library.export(
  "launch-bond",
  ["issue-bond", "sell-bond"],
  function(issueBond, sellBond) {

    issueBond("collective-magic-launch", "Collective Magic", "Erik Pukinskis")

    issueBond.expenses("collective-magic-launch", {
      "labor": "$1000",
    })

    issueBond.tasks("collective-magic-launch", [
      "make it so you can tap Give me work",
      "make it so you can tap Choose a picture",
      "make it so you can a picture appears",
      "make it so you can paint some swatches",
      "make it so you can type a name",
      "make it so you can tap Issue card",
      "make it so you can see avatar on id card",
      "make it so you can see your avatar next to the It is done button",
      "make it so you can see an assignment",
      "make it so you can see an avatar when you start the server again",
      "make it so you can see the name below the avatar",
      "make it so you can tap Clock in and help",
      "make it so you can see Erik is helping",
      "make it so you can tap Clock out",
      "make it so you can tap It's done",
      "make it so you can tap somewhere and a creature moves",
      "make it so you can tap House panel bond",
      "make it so you can see Bond for sale: Issued by Erik",
      "make it so you can see house panel build instructions",
      "make it so you can see materials list",
      "make it so you can see labor estimate",
      "make it so you can see bond cost with tax",
      "make it so you can see bond interest rate",
      "make it so you can click Buy Bond - $100",
      "make it so you can see You have purchased this bond!",
      "make it so you can see \"Erik purchased this bond... payment pending\"",
      "make it so you can enter a name and phone number and tap Continue",
      "make it so you can (click Cancel purchase)",
      "make it so you can can get a text: so-and-so bought a bond click to generate invoice",
      "make it so you can as a bond seller, mark receipt paid",
      "make it so you can clicks tick, they get the first task from the bond: \"Reserve a truck\" Are you ready to clock in?",
      "make it so you can tap Clock in to rent the truck",
      "make it so you can tap Clock out",
      "make it so you can as a bondholder get notice of work",
      "make it so you can as a worker tap \"Send Invoice\", Erik gets a text",
      "make it so you can as a worker who received cash, tap Mark Invoice Paid",
      "make it so you can as a bondholder get notice of balance change",
      "make it so you can [more tasks done]",
      "make it so you can tap Issue House Panel Deed",
      "make it so you can tap Buy House Panel Deed",
      "make it so you can get a text: so-and-so bought a house panel click to generate receipt",
      "make it so you can mark deed receipt paid",
      "make it so you can receive bond maturation notification",
      "make it so you can tap cash out maturity",
      "make it so you can get a text: so-and-so sold their shares tap to generate receipt",
      "make it so you can bondholder marks receipt paid",
    ])

    sellBond("collective-magic-launch")

    return {}
  }
)
