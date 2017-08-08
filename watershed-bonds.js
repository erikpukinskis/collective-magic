var library = require("module-library")(require)



// bond.doIn("May 2017", [
//   "ezjs.js/house-panel-bond shows this code",
//   "click Buy Bond",
//   "bobby gets work notification",
// ])
//
// Bobby texts "sure I will be on the 9:15 train"
// AI asks "Does this mean yes, or no?


// ask: what do we all need more of? write down answers. ask: how do we measure how much we have? ask: where does it come from? ask: what are hypotheses about what leads to more of that?


// how to fit in to the ecological niche at your wavelength


library.define(
  "dimension-text",
  function() {

    function dimensionText(number, options) {
      var integer = Math.floor(number)
      var remainder = number - integer
      var sixteenths = Math.round(remainder*16)

      if (sixteenths == 16) {
        integer++
      } else if (sixteenths == 0) {
        // nothing
      } else if (sixteenths == 8) {
        var fraction = "1/2"
      } else if (sixteenths % 4 == 0) {
        var fraction = (sixteenths/4)+"/4"
      } else if (sixteenths % 2 == 0) {
        var fraction = (sixteenths/2)+"/8"
      } else {
        var fraction = sixteenths+"/16"
      }

      if (fraction) {
        fraction += "&Prime;"
      }

      if (integer == 0 && sixteenths != 0) {
        var string = fraction
      } else {
        var string = integer.toString()+"&prime;"
        if (fraction) {
          string += "&nbsp;"+fraction
        }
      }

      return string
    }


    return dimensionText
  }
)


library.define(
  "to-dollar-string",
  function() {
    return function toDollarString(cents) {

      if (!cents) {
        throw new Error(cents+" is not pennies")
      }

      if (cents < 0) {
        var negative = true
        cents = Math.abs(cents)
      }

      cents = Math.ceil(cents)

      var dollars = Math.floor(cents / 100)
      var remainder = cents - dollars*100
      if (remainder < 10) {
        remainder = "0"+remainder
      }

      var string = "$"+dollars+"."+remainder

      if (negative) {
        string = "-"+string
      }

      return string
    }
  }
)
module.exports = library.export(
  "watershed-bonds",
  ["issue-bond", "dimension-text", "to-dollar-string", "sell-bond"],
  function(issueBond, inches, toDollarString, sellBond) {

    issueBond("workshop", "Workshop", "Erik Pukinskis")

    issueBond.tasks("workshop", [
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
      "Screw 8 ft 2x4s into "])

    issueBond.expenses("workshop", [
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

    issueBond("a-panel", "Wall panel A", "Erik Pukinskis")

    // let's assume for now that the tools and materials are already there. I *think* that is going to need to be handled separately. Like bond.tools(["workshop", "skil saw", "etc"]) and the acquisition of materials is implicit in bond.expenses. There is an implicit process which is paying the expenses and bringing the materials to the fulfillment site.

    // Basic materials
    var studWidth = 1.25
    var studDepth = 2.5

    // House parameters
    var sheathingOverlap = 1/2*studWidth
    var blockWidth = 1/2*studDepth
    var wallHeight = 88

    // A panel parameters
    var trackLength = 48 - studWidth - sheathingOverlap - blockWidth
    var insideSheathingWidth = 48 - studDepth - sheathingOverlap*3 - blockWidth 

    issueBond.tasks("a-panel", [
      "reserve a truck",
      "buy materials",
      "cut 4 steel studs to "+inches(wallHeight),
      "cut 2 steel tracks to "+inches(trackLength),
      "plane an "+inches(wallHeight)+" inch 2x6 to 1 1/4 inch thick, and cut three 1 1/14 inch slices out of it",
      "cut finish plywood to "+inches(wallHeight)+" by "+inches(insideSheathingWidth),
      "cut rough plywood to "+inches(wallHeight)+" by "+inches(insideSheathingWidth),
      "crimp steel framing together",
      "square and screw down finish plywood",
      "flip, insulate, and screw down rough plywood, with a 3 inch gap below, and a "+inches(studDepth)+" gap to the left",
    ])

    var PRICE_FACTOR = 1.2 // tax and price fluctuation
    var HOURLY_RATE = 1500
    var WAGE_FACTOR = 1.5 // payroll tax, etc

    function purchase(amt) {
      return toDollarString(amt*PRICE_FACTOR)
    }

    function labor(hours) {
      return toDollarString(hours*HOURLY_RATE*WAGE_FACTOR)
    }

    issueBond.expenses("a-panel", {
      "Truck rental": purchase(40),
      "8 foot steel studs, 4x": purchase(357*4),
      "10 foot steel track, 1x": purchase(433),
      "3/8 inch rouch plywood, 1x": purchase(1795),
      "3/8 inch finish plywood, 1x": purchase(1533),
      "16 inch insulation, 22 feet": purchase(47*22),
      "screws, 60x": purchase(300),
      "labor, 4 hours": labor(4)
    })


    issueBond("z-panel", "Wall panel Z", "Erik Pukinskis")

    issueBond("floor-panel", "Floor panel", "Erik Pukinskis")

    issueBond("jamb-panel", "Door jamb panel", "Erik Pukinskis")

    issueBond("tiny-house-3", "Tiny House 3", "Erik Pukinskis")

    issueBond("pergola", "Pergola for mobile kitchen", "Erik Pukinskis")

    issueBond.tasks("pergola", [
      "mark 12 inches from the end of each"])

    // Your kitchen is your mobile marketing heart

    issueBond("kitchen", "Falafel Kitchen", "Erik Pukinskis")

    issueBond.tasks("kitchen", [
      "Make poulish",
      "Make dough",
      "Make falafel sandwich"])

    issueBond.expenses("kitchen", [
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

    issueBond("pond", "Pond", "Erik Pukinskis")

    issueBond.tasks("pond", [
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

    issueBond("chicken-coop", "Chicken coop", "Erik Pukinskis")

    issueBond.tasks("chicken-coop", [
      "bolt corrugated roofing",
      "cut mortisse and tenon two sets of four 2x2s, four 2x2 rafters, and however many floor boards",
      "built chicken coop",
      "netting with stakes 8x8"])


    var bonds = [
      "a-panel",
      "z-panel",
      "floor-panel",
      "jamb-panel",
      "workshop",
      "tiny-house-3",
      "kitchen",
      "chicken-coop",
      "pond",
      "pergola",
    ]

    return bonds
  }
)
