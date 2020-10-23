# Sprint # - *3* - *Team Bloo*

## Goal
### Build a trip!

## Sprint Leader: 
### *Jack Melvin*


## Definition of Done

* The version in `server/pom.xml` is `<version>3.0</version>`.
* The Product Increment release for `v3.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and restrospective are captured below.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 50%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
In this sprint we have 5 epics layed out for us to accomplish.
* V3 Protocol - In this epic we have put the cleanup and testing of our previous code as a few tasks and we have the update config schema.
* Build a trip - This epics works on building a trip for the user. The user is going to be able to add a multitude of types of locations. Another feature will be the abilitiy to write a small description about the loction on the client side and save it to that location. Finally the user will be able to save their trip and reload it later
* Find places - We believe we have this one done but we will be testing to makesure. With this epic, we can search their current location, a named airport, or municapality.
* Modify a trip - In this epic, we plan on giving the user the ability to edit their trip as they see fit. They can add new locations at the end of a trip. They can drag and rearrange their locations specified, changing the order of the trip possibly the distance. They can delete a specific location or all the locations on their trip.
* Filter trip - This small epic incorporates a smaller search bar for searching specific locations in a planned trip.

## Metrics
We believe that we can accomplish all the epics this sprint. It seems we have finaly started to find a groove in our group work. both the V3 Protocol and Filter trip, don't seem to complex and we believe we have find place already implemented so all we need to do is test. Build a trip and modify a trip will be a bit more challenging but given 2+ weeks, we think it is a manageable task. 

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *2* |
| Tasks |  *25*   | *37* | 
| Story Points |  *43*  | *51* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/3* | ** | *#86, #87, #143, #83, #144* | Not knowing V3 Protcol  | 
| *10/5* | ** | *#87, #143, #144, #170* |  | 
| *10/7* | *#87, #143* | *#144, #153, #154, #170* |  | 
| *10/9* | ** | *#144, #153, #154, #170* | All occupied by other things last few days | 
| *10/13* | *#144, #151, #153, #154* | *#145, #166, #170, #176* | | 
| *10/14* | ** | *#145, #166, #170, #176* | We've all had midterms and projects this week |
| *10/16* | *#145 #184* | *#144 #166 #70 #176* | scrumed after inspection |
| *10/19* | *#144, #206, #208, #194, #195, #196, #216, #218, #176, #171, #157, #212* | *#148, #163, #170, #221* | Lacking effort from a team mate |
| *10/21* | *#147, #148, #152, #163, #168, #169, #198, #226* | *#160, #162, #165, #170* | since Austin hasn't done anything, we will not be able to complete everything |
| *10/22* | *#160, #161, #162,#165, #240* | ** | |

## Review
  As sprint3 comes to a close, the whole team(that still participate) has gotten into a good grove of working together, asking questions and collaberating. The utter lack of work from austin has hindered our ability to develop as fast, along with this midterms taking place at the same time as this sprint. We did get a good amount done but we could have had all the tasks completed if we had our forth member.
### Epics done  
  we finished find places right away because we already had that done from the last sprint. We were very close to finishing build Trip and modify trip. Only missing a few parts from each.
### Epics not done 
  build, modify and filter trip were all not done this sprint. We have not touched filter trip and we are very close for build and modify trip. for build trip epic we just need to establish a you are here heading to here portion, the "leg" of the itinerary and we need to still do importing a json to the site. for modify trip, we need to add the notes/edit function (Austins task for the whole sprint) reverse from starting location and set a new starting point. both tied in to actually having a leg for the trip.
### What went well
  Collin, Tri and I have gotten into the swing of things, hopping on every other night for a while, talking about what we're doing both with the program and in life. When we are all not to busy with midterms, we really cruise along with development. If we didn't have so much other stuff going on in other classes, I' sure the three of us could have nailed all the epics.
### Problems encountered and resolutions
  The two main problems we had were busy schedules with midterms and all, and lack of effort from a teammate. midterms have come and gone mostly and so the lack of time from all of us has been resolved. We have been able to put a lot more time in, in the last 1/3 ofthe sprint. Austin was apart of most meeting till this last week in which he went MIA. He kept saying that he was gonna get something done and we wanted to give him the benifit of the doubt but eventually he just dissapeared and has said nothing. We assume he dropped the course for this last week when he went MIA.

### Retrospective
  We ended up not completing most epics. We divided our focus onto numerous epics and weren't able to complete either. 
### What we changed this sprint
  something that went well was our ability to split things up further. We did split our tasks up better into more zenhub tasks and were able to make smaller incremetal changess to the program.
### What went well
  The active team has been really preforming well together and the team dynamic has been great. We plan on doing a CTF this weekend as a fun online group activity. We also are able to all get on call at the same time. This has helped the team grow closer and has kept everyone in the loop as to whos doing what and whats being worked on.
### Potential improvements
  With this next sprint, if we get any new memebers or it becomes a trio we will try and make sure everyone is actually working and getting tasks done. If austin is still apart of our team, we will talk to dave and get things figured out.
### What we will change next time
  We plan to not take on to many epics and start small. We will finish our previous epics first and depending on how big the next epics are, only take 1 or so. This will help in getting all our tasks done and then working on extra things after that.
