

// HERE YOU GO ERIK FUCKIN SQUEEZE THIS SHIT THROUGH A FUCKIN HOLE BITCH


var library = require("module-library")(require)


library.define(
  "collective-magic/launch-tasks", function() { return [
  "tap Give me work",
  "tap Choose a picture",
  "a picture appears",
  "paint some swatches",
  "type a name",
  "tap Issue card",
  "see avatar on id card",
  "see your avatar next to the It is done button",
  "see an assignment",
  "see an avatar when you start the server again",
  "see the name below the avatar",
  "tap Clock in and help",
  "see Erik is helping",
  "tap Clock out",
  "tap It's done",
  "tap somewhere and a creature moves",

  // -> U R HERE

  "tap House panel bond",
  "see Bond for sale: Issued by Erik",
  "see house panel build instructions",
  "see materials list",
  "see labor estimate",
  "see bond cost with tax",
  "see bond interest rate",
  "click Buy Bond - $100",
  "see You have purchased this bond!",
  "see \"Erik purchased this bond... payment pending\"",
  "enter a name and phone number and tap Continue",
  "(click Cancel purchase)",
  "can get a text: so-and-so bought a bond click to generate invoice",
  "as a bond seller, mark receipt paid",
  "clicks tick, they get the first task from the bond: \"Reserve a truck\" Are you ready to clock in?",
  "tap Clock in to rent the truck",
  "tap Clock out",
  "as a bondholder get notice of work",
  "as a worker tap \"Send Invoice\", Erik gets a text",
  "as a worker who received cash, tap Mark Invoice Paid",
  "as a bondholder get notice of balance change",
  "[more tasks done]",
  "tap Issue House Panel Deed",
  "tap Buy House Panel Deed",
  "get a text: so-and-so bought a house panel click to generate receipt",
  "mark deed receipt paid",
  "receive bond maturation notification",
  "tap cash out maturity",
  "get a text: so-and-so sold their shares tap to generate receipt",
  "bondholder marks receipt paid",
]})


library.using(
  [library.ref(), "./watershed-bonds", "sell-bond", "web-host", "browser-bridge", "web-element", "collective-magic/launch-tasks", "basic-styles", "tell-the-universe", "someone-is-a-person", "character", "punch-clock", "post-button", "issue-bond"],
  function(lib, watershedBonds, sellBond, host, BrowserBridge, element, tasks, basicStyles, aWildUniverseAppeared, someoneIsAPerson, character, punchClock, postButton, issueBond) {

    sellBond.header([
      element("h1", "Collective Magic Bond Co"),
      element("p", "est 2017"),
    ])

    watershedBonds.forEach(sellBond)

  character("5n53", "light")
  character.see("5n53", "investorId", "9a7c")
  issueBond.registerInvestor("9a7c", "Hamo", "111")
  issueBond.orderShare("ceng", "a-panel", "9a7c", 19000, 16875)
  issueBond.markPaid("ceng", {"characterId":"5n53","textSignature":"Eriko"})

    var line = element.style(".statements div", {
      "margin-bottom": "10px",
      "min-height": "1em"})

    var finishedTasks = []
    var finishedCount = 0

    var baseBridge = new BrowserBridge()
    basicStyles.addTo(baseBridge)

    var nextTaskCounter = 0
    var nextTaskId = "0"

    var characters = aWildUniverseAppeared("characters", {
      character: "./character"
    })

    var s3Options = {
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.S3_BUCKET_NAME,
    }
    // characters.persistToS3(s3Options)
    // characters.load()
    character("7n0l", "brite")

    function computerAssignment(request, response) {

      var bridge = baseBridge.forResponse(response)

      var meId = someoneIsAPerson.getIdFrom(request)

      if (meId) {
        var avatar = someoneIsAPerson(bridge, meId)
        bridge.addToBody(avatar)
      } else {
        someoneIsAPerson.getIdentityFrom(response, "/assignment")
        return
      }

      renderAssignment(bridge, meId, nextTaskId, "Make it so you can "+tasks[nextTaskId]+".", finishedCount, tasks.length, "Collective Magic")
    }


    function renderSession(session) {
      var transit = session.stopTime ? " helped" : " has been helping"

      var description = session.name+transit+" for "+timeOf(session)
      return element("li", description)
    }

    function timeOf(session) {
      var start = new Date(session.startTime)
      if (session.stopTime) {
        var end = new Date(session.stopTime)
      } else {
        var end = new Date()
      }

      var seconds = (end - start)/1000 + 20
      var minutes = Math.round(seconds/60)
      return minutes+" minutes"
    }


    function renderAssignment(bridge, meId, nextTaskId, nextTaskText, finishedCount, totalCount, outcome) {

      var currentAssignmentId = punchClock.getCurrentAssignmentId(meId)

      var workSessions = element(
        "ul",
        punchClock.sessionsForTask(nextTaskId).map(renderSession)
      )

      var percent = Math.round(finishedCount/tasks.length*100)+"%"

      var iAmOnThis = currentAssignmentId == nextTaskId

      if (iAmOnThis) {
        var clockButton = postButton("Clock out", "/work-sessions/stop", {taskId: nextTaskId})

      } else {
        var clockButton = postButton("Clock in and help", "/work-sessions", {taskId: nextTaskId})
      }

      var ulStyle = element.style("ul", {
        "padding-left": "1.3em",
        "list-style-type": "cambodian",
      })

      var page = element(".lil-page", [
        element("p", finishedCount+"/"+totalCount+" til "+outcome+" ("+percent+")"),
        element("h1", "Here's a goal."),
        element("p", element.style({"min-height": "4em"}), nextTaskText),
        postButton("It is done.", "/finish", {taskId: nextTaskId}),
        " ",
        clockButton,
        workSessions,
        element.stylesheet(ulStyle),
      ])  

      bridge.send(page.html())
    }


    function getBondedTask(request, response) {

      var page = element(".lil-page", [

      ])

      baseBridge.forResponse(response).send(page)
    }


    
    host.onSite(function(site) {
      site.addRoute("get", "/assignment", computerAssignment)

      function clockOut(meId, taskId) {
        var name = character.getName(meId)
        var when = new Date().toString()
        punchClock.stop(name, meId, taskId, when)

        workLog.do("punchClock.stop", name, meId, taskId, when)
      }

      site.addRoute("post", "/finish", function(request, response) {
        var taskId = request.body.taskId
        if (!taskId) {
          throw new Error("wtf")
        }
        finishedTasks[taskId] = true
        var meId = request.cookies.characterId
        var isClockedIn = punchClock.getCurrentAssignmentId(meId) == taskId

        if (isClockedIn) {
          clockOut(meId, taskId)
        }
        finishedCount++
        nextTaskCounter++
        nextTaskId = nextTaskCounter.toString()
        response.redirect("/assignment")
      })

      var workLog = aWildUniverseAppeared("work", {
          work: "work"})

      site.addRoute("post", "/work-sessions", function(request, response) {
        var taskId = request.body.taskId
        var meId = request.cookies.characterId
        var name = character.getName(meId)
        var when = new Date().toString()

        punchClock.start(name, meId, taskId, when)
        workLog.do("punchClock.start", name, meId, taskId, when)

        response.redirect("/assignment")
      })

      site.addRoute("post", "/work-sessions/stop", function(request, response) {
        var taskId = request.body.taskId
        var meId = request.cookies.characterId

        if (punchClock.getCurrentAssignmentId(meId) == taskId) {
          clockOut(meId, taskId)
        }

        response.redirect("/assignment")
      })

      site.addRoute("get", "/construction", getBondedTask)

      someoneIsAPerson.prepareSite(site)
    })

    host.onRequest(function(getBridge) {
      var bridge = getBridge()
      basicStyles.addTo(bridge)
      bridge.send([
        element("h1", "Collective Magic"),
        element("p", "An agent for everyone"),
        element("p", element("a.button", "Give me construction work", {href: "/construction"})),
        element("p", element("a.button", "Give me coding work", {href: "/assignment"})),
        element("p", element("a.button", "Buy bonds", {href: "/bond-catalog"})),
      ])
    })

    // peace
  }
)


