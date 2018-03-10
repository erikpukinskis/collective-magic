

// HERE YOU GO ERIK FUCKIN SQUEEZE THIS SHIT THROUGH A FUCKIN HOLE BITCH


var library = require("module-library")(require)



library.define(
  "to-dollar-string",
  function() {
    return function toDollarString(cents) {
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




library.using(
  [library.ref(), "./watershed-bonds", "sell-bond", "web-host", "browser-bridge", "web-element", "./launch-bond", "basic-styles", "tell-the-universe", "someone-is-a-person", "character", "punch-clock", "post-button", "issue-bond", "to-dollar-string"],
  function(lib, watershedBonds, sellBond, host, BrowserBridge, element, launchBond, basicStyles, aWildUniverseAppeared, someoneIsAPerson, character, punchClock, postButton, issueBond, toDollarString) {

    var lineItem = sellBond.lineItem

    // TESTING

    character("rodr", "BERD")
    character.see("rodr", "investorId", "9a7c")
    issueBond.registerInvestor("9a7c", "Hamo", "111")
    issueBond.orderShare("ceng", "a-panel", "9a7c", 19000, 16875)
    issueBond.markPaid("ceng", {"characterId":"rodr","textSignature":"Eriko"})

    issueBond.registerInvestor("ba9w", "Zamo", "122")
    issueBond.orderShare("9ovi", "collective-magic-launch", "ba9w", 111000, 100000)
    issueBond.markPaid("9ovi", {"characterId":"rodr","textSignature":"Ham"})

    issueBond.invoice("smo6", "a-panel", "BERD (id rodr) worked for 1 minutes on reserve a truck", 33, "2017-08-23")
    issueBond.markFinished("a-panel_t0")
    issueBond.markFinished("a-panel_t1")

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

      var workSessions = element("ul")

      punchClock.eachSessionOnTask(nextTaskId, function(session) {
        workSessions.addChild(renderSession(session))
      })

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

    function renderBondActivity(bridge, bondId, day) {

      var summary = issueBond.dailySummary(bondId, day)
      var completed = summary.completedTasks
      var invoices = summary.invoices
      var outcome = issueBond.getOutcome(bondId)

      var page = element(".lil-page", [
        element("h1", "Activity towards "+outcome+" bond on "+day),
        element("h1", "Tasks completed:")
      ])

      if (completed.length > 0) {
        var list = element("ul")
        completed.forEach(function(task) {
          list.addChild(element("li", task))
        })
        page.addChild(list)
      } else {
        page.addChild("p", "No tasks completed")
      }

      page.addChild(element("h1", "Expenses:"))

      var total = 0
      if (invoices.length > 0) {
        var items = element()
        invoices.forEach(function(invoice) {
          debugger
          items.addChild(lineItem(invoice.description, invoice.amount))

          total += invoice.amount
        })
        items.addChild(element("p", "Total: "+toDollarString(total)))
        page.addChild(items)
      } else {
        page.addChild("p", "No expenses invoiced")
      }


      bridge.send(page)
    }

    var bondUniverse = aWildUniverseAppeared("bonds", {issueBond: "issue-bond"})
    
    host.onSite(function(site) {

      site.addRoute("get", "/tasks/:taskId", function(request, response) {
        var bondId = issueBond.bondForTask(request.params.taskId)
        response.redirect("/assignment/"+bondId)
      })

      site.addRoute("get", "/assignment/:bondId", giveAssignment)

      function clockOut(meId, taskId) {
        var name = character.getName(meId)
        var when = new Date().toString()
        var ticket = punchClock.stop(name, meId, taskId, when)

        workLog.do("punchClock.stop", name, meId, taskId, when)

        invoiceWork(taskId, ticket)
      }

      var HOURLY = 2000
      function invoiceWork(taskId, ticket) {
        var bondId = issueBond.bondForTask(taskId)
        var minutes = punchClock.minutes(ticket)
        var hours = minutes/60.0
        var cents = Math.ceil(HOURLY*hours)
        var task = issueBond.getTaskText(taskId)
        var description = punchClock.describe(ticket)+" on "+task

        var day = issueBond.date()

        var invoiceId = issueBond.invoice(null, bondId, description, cents, day)

        bondUniverse.do("issueBond.invoice", invoiceId, bondId, description, cents, day)
      }

      site.addRoute("post", "/finish", function(request, response) {
        var taskId = request.body.taskId

        issueBond.markFinished(taskId)

        bondUniverse.do("issueBond.markFinished", taskId)

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

      site.addRoute("get", "/daily-summary/:bondId/:day", function(request, response) {

        var bondId = request.params.bondId
        var day = request.params.day
        var bridge = baseBridge.forResponse(response)

        renderBondActivity(
          bridge,
          bondId,
          day)
      })

      // These activity summaries for bondholders were the next thing I was going to work on when I was working on launch.js. But I thought the first thing to get right is the relationship with the worker, so launch-2.js is a reflection of that.
      
      // site.addRoute("get", "/batch_messaging", baseBridge.requestHandler(postButton("Send daily activity summaries", "/send_activity_summaries")))

      // site.addRoute("post", "/send_activity_summaries", function(request, response) {
      //   response.send("sent!")
      // })

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


