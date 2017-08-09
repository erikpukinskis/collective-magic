

// HERE YOU GO ERIK FUCKIN SQUEEZE THIS SHIT THROUGH A FUCKIN HOLE BITCH


var library = require("module-library")(require)




library.using(
  [library.ref(), "./watershed-bonds", "sell-bond", "web-host", "browser-bridge", "web-element", "./launch-bond", "basic-styles", "tell-the-universe", "someone-is-a-person", "character", "punch-clock", "post-button", "issue-bond"],
  function(lib, watershedBonds, sellBond, host, BrowserBridge, element, launchBond, basicStyles, aWildUniverseAppeared, someoneIsAPerson, character, punchClock, postButton, issueBond) {

    // TESTING

    character("5n53", "light")
    character.see("5n53", "investorId", "9a7c")
    issueBond.registerInvestor("9a7c", "Hamo", "111")
    issueBond.orderShare("ceng", "a-panel", "9a7c", 19000, 16875)
    issueBond.markPaid("ceng", {"characterId":"5n53","textSignature":"Eriko"})

    issueBond.registerInvestor("ba9w", "Zamo", "122")
    issueBond.orderShare("9ovi", "collective-magic-launch", "ba9w", 111000, 100000)
    issueBond.markPaid("9ovi", {"characterId":"5n53","textSignature":"Ham"})


    // COLLECTIVE MAGIC

    sellBond.header([
      element("h1", "Collective Magic Bond Co"),
      element("p", "est 2017"),
    ])

    watershedBonds.forEach(sellBond)

    var baseBridge = new BrowserBridge()
    basicStyles.addTo(baseBridge)

    // var finishedTasks = []
    // var finishedCount = 0
    // var nextTaskCounter = 0
    // var nextTaskId = "0"

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


    function giveAssignment(request, response) {

      var bridge = baseBridge.forResponse(response)
      var meId = someoneIsAPerson.getIdFrom(request)
      var bondId = request.params.bondId

      if (meId) {
        var avatar = someoneIsAPerson(bridge, meId)
        bridge.addToBody(avatar)
      } else {
        someoneIsAPerson.getIdentityFrom(response, "/assignment")
        return
      }

      var taskId = issueBond.nextTaskId(bondId)
      var taskText = issueBond.getTaskText(taskId)

      renderAssignment(
        bridge,
        meId,
        taskId,
        taskText,
        issueBond.getCompletedCount(bondId),
        issueBond.getTaskCount(bondId),
        issueBond.getOutcome(bondId)
      )
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

      var percent = Math.round(finishedCount/totalCount*100)+"%"

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

      site.addRoute("get", "/tasks/:taskId", function(request, response) {
        var bondId = issueBond.bondForTask(request.params.taskId)
        response.redirect("/assignment/"+bondId)
      })

      site.addRoute("get", "/assignment/:bondId", giveAssignment)

      function clockOut(meId, taskId) {
        var name = character.getName(meId)
        var when = new Date().toString()
        punchClock.stop(name, meId, taskId, when)

        workLog.do("punchClock.stop", name, meId, taskId, when)
      }

      site.addRoute("post", "/finish", function(request, response) {
        var taskId = request.body.taskId

        issueBond.markFinished(taskId)        
        var meId = request.cookies.characterId
        var isClockedIn = punchClock.getCurrentAssignmentId(meId) == taskId

        if (isClockedIn) {
          clockOut(meId, taskId)
        }

        var bondId = issueBond.bondForTask(taskId)

        response.redirect("/assignment/"+bondId)
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

        response.redirect("/tasks/"+taskId)
      })

      site.addRoute("post", "/work-sessions/stop", function(request, response) {
        var taskId = request.body.taskId
        var meId = request.cookies.characterId

        if (punchClock.getCurrentAssignmentId(meId) == taskId) {
          clockOut(meId, taskId)
        }

        response.redirect("/tasks/"+taskId)
      })

      site.addRoute("get", "/construction", getBondedTask)

      someoneIsAPerson.prepareSite(site)
    })

    host.onRequest(function(getBridge) {
      var bridge = getBridge()
      basicStyles.addTo(bridge)

      var assignments = []

      issueBond.eachActiveBond(function(bondId) {
        var button = element("a.button", {href: "/assignment/"+bondId}, issueBond.getOutcome(bondId))
        var p = element("p", button)
        assignments.push(p)
      })

      bridge.send([
        element("h1", "Collective Magic"),
        element("p", "An agent for everyone"),
        element("p", element("a.button", "Buy bonds", {href: "/bond-catalog"})),
        element("h1", "Help with projects"),
        assignments
      ])
    })

    // peace
  }
)


