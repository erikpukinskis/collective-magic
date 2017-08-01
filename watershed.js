var library = require("module-library")(require)



// bond.doIn("May 2017", [
//   "ezjs.js/house-panel-bond shows this code",
//   "click Buy Bond",
//   "bobby gets work notification",
// ])
//
// Bobby texts "sure I will be on the 9:15 train"
// AI asks "Does this mean yes, or no?


library.using(
  ["issue-bond", "sell-bond", "web-host", "basic-styles", "fs", "web-element"],
  function(issueBond, sellBond, host, basicStyles, fs, element) {

    var workshop = issueBond("workshop", [
      "Mark 12 inches from the end of each of the 12 foot 2x6s",
      "Mark 3 1/2 inches from the top of each of the 8 foot 4x4s",
      "Lay down two 4x4s, with a 2x6 across it, leaving the 3 1/2 inches free at the top, square and tack in place",
      "Drill 2 bolt holes on the diagonal through each intersection",
      "Mark 12 inches from the end of two 10 foot 2x4s",
      "Repeat the bolt hole drilling with the 2x4s and each 4x4, being careful about which side of the 4x4 you drill into",
      "Leave the last 4x4/2x4 assembly assembled, and bolt it",
      "Bolt the other 4x4s into the other 2x4",
      "Prop up the two assemblies and bolt on the 2x6s",
      "Add brackets to the 2x6s at 3 foot 4 inches from each 2x4",
      "Screw 10 foot 2x4s into each bracket",
      "Screw down roofing into 2x4s with gasketed screws",
      "Screw 8 ft 2x4s into ",])

    workshop.addExpense([
      ["Get drill bit for 4x4 bolts",  1, "$5.00"],
      ["Get drill", 1, "$100.00"],
      ["Get extension cord", 1, "$13.00"],
      ["Get ratchet", 1, "$20.00"],
      ["Get wrench", 1, "$10.00"],
      ["Get gasketed screws", 1, "$5.00"],
      ["Get bolts", 8, "$10.00"],
      ["H1 Hurricane clips", 4, "$2.40"],
      ["Get workshop 10' 2x4s", 4, "$60.00"],
      ["Get workshop 12' 2x6s", 2, "$24.00"],
      ["Get workshop 4x4s", 4, "$72.00"],
      ["Get workshop 12ft corrugated", 5, "$140.00"],
      ["Get workshop 8' 2x4s", 7, "$56.00"],])

    var tinyHouse3 = issueBond("Tiny House 3", [
      "lay down steel"])

    var pergola = issueBond("Pergola for mobile kitchen", [
      "mark 12 inches from the end of each"])

    // Your kitchen is your mobile marketing heart

    var kitchen = issueBond("Falafel Kitchen", [
      "Make poulish",
      "Make dough",
      "Make falafel sandwich"])

    kitchen.addExpense([
      ["Flat top griddle station", 1, "$263.20"],
      "50 lb bag of flour",
      "Toaster oven",
      "Card table",
      "2 chairs",
      "Extension cord",
      "2 fermentation tubs",
      "Sourdough starter",
      "Salt",
      "Wooden box",
      "2 gallons water",
      "Can of chickpeas",
      "Parsley",
      "Garlic",
      "Tahini",
      "Onion",
      "Olive oil",
      "Cornmeal",
      "Electric burner",
      "Pot",
      "Power strip",
      "Tongs, bowl, silicone spatula",
      "Hand washing station"])

    var watershed = issueBond("watershed", [
      chickenCoop,
      pond,
      pergola,
      kitchen,
      tinyHouse3])

    var pond = issueBond("pond", [
      "roll two 2x4s into 8x16 tarp ", 
      "dig pond, build watershed, lay tarp", 
      "pavers and mortar, build compost basin", 
      "pond pours off into compost pile, which drains into irrigation pit", 
      "bucket for bringing water up to irrigation ditch",
      "18 inch wide 18 inch deep ledge around pond",
      "// natural liner require 2:1 slope... 2ft depth = 6 ft width, requires moderate level of clay",
      "// plastic liner lets you have vertical sides",
      "2 ft depth = minimum for fish",
      "4 ft tall, 8ft long staple",
      "shade fabric, rings",
      "fill pond",
      "plant lilies https://www.youtube.com/watch?v=mHpayuscOtM"])

    var chickenCoop = issueBond("chicken coop", [
      "bolt corrugated roofing",
      "cut mortisse and tenon two sets of four 2x2s, four 2x2 rafters, and however many floor boards",
      "built chicken coop",
      "netting with stakes 8x8"])

    var line = element.style(".statements div", {
      "margin-bottom": "10px",
      "min-height": "1em"})


    var catalog = element(".bonds")

    var page = element(
      ".lil-page",
      element("h1", "Bond Catalog"),
      catalog,

    var bonds = [
      workshop,
      tinyHouse3,
      kitchen,
      watershed,
    ]

    bonds.forEach(function(bond) {
      catalog.addChild(sellBond(bond))
    }

    for (var name in bonds) {
      var price = bonds[name]
      var button = element(".button", "Buy "+name+" bond - "+price)
      page.addChildren(element("p", button, " "))}

    host.onRequest(function(getBridge) {
      var bridge = getBridge()
      basicStyles.addTo(bridge)
      bridge.send(page)})

    return {}})
