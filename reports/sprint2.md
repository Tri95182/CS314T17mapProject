# Sprint 2 - T17 - Team Bloo

## Goal
### Show me the distance

## Sprint Leader: 
### Tri Nguyen

## Definition of Done

* The version in `server/pom.xml` is `<version>2.0</version>`.
* The Product Increment release for `v2.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write tests before code.
* Unit tests are fully automated.

### Processes
* Master is never broken. 
* All pull request builds and tests for Master are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
With this sprint we want to work on the map and how the users interract with it. 
-Our in first epic "v2 protocol" we set out to use a config object to see information about the server,
see the distance between a pair of geographic locations, have a list of possible destinations based on
some criteria and have the client detect the response and report errors to the user.

-In our "where am I?" epic we will allow the user to view their current location when the app starts or 
return to their current location after they have changed the map view. This will be a distinct marker 
for their current location to distinguish it from other locations would be useful.

-In our "Find Distance" epic we will add a way for the user to specify 2 locations and then find the 
distance between them. To make it look nice we will add some lines between the 2 markers. Also we will 
use the Vincenty method to compute the Great Circle Distance and give the user the ablity to show the 
distance in miles using an earth radius of 3959 miles.

-"Where is?" we plan to add the ability to see a location on the map using latitude and longitude.
Users would be able to type or paste a string containing latitude and longitude they obtained from 
another tool. We plan to have many formats employed for latitude and longitude so you need to 
validate and handle any conversions

-"Distance Units" epic, We plan to support units that our users would want or need, kilometers,
nautical miles, and even  user-defined units where they specify the unit name and earth radius
that are remembered across sessions. 

-Feeling Lucky epic, We plan to allowing the system to randomly suggest a place.
## Metrics

We believe that we have the ability to complete the planned epics. we say this based on the fact that we were able to complete all of our tasks last sprint. We will take a look at how far we are in a week and reaccess our ability to complete things and if need be move an epic, not required for this sprint, to the ice box.

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *6* | *3* |
| Tasks |  *18*   | *29* | 
| Story Points |  *18*  | *40* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 9/17 |  | #90 ,#35 | Were all new to back end server dev stuff so where all getting a feel for it more or less  | 
| 9/19 | #91 | #90 , #35 | Were having a hard time meeting very often |  
| 9/21 | #101 | #96 , #95 , #81 , #78 | We talk about a time to meet with dave, and we talk about what were doing next.| 
| 9/23 | #106, #107, #104, #103 | #88, #97, #96, #95, #81, #78  | We talk about our progression in sprint 1 and how we should split task more often.|
| 9/26 | #108, #96, #105, #81, #110, #109, #95, #112, #116, #113, #115, #111, #119, #118 | #88, #97, #90, #78 | Talk about how were doing on task, and talk about what were going to be doing over the weekend. We talked about how we should plan scrums with the idea
| 9/29 | #119, #120, #121, #88, #123, #125, #90 ,#129 ,| #97, #124, #93, #127 | We talked about how to test through postman and worked through fixing jack's issues with request distance.
| 10/1 | #127, #131, #122, #132, #128, #124, #97, #78, #92, #133, #134, #72 ,#34, #135, #136, #137 | | We finish up sprint 2

## Review
  Overall as a team, we learned a lot this sprint, after talking to you after sprint 1, we knew we needed to plan and work with zenhub more. I think we have gotten better at that this sprint. We in general don’t have strong knowledge of website development, so we were slowly trucking there. I like our progress and between the 3 of us, we can get help pretty easily. The only issue that still plagues our team is that we can't meet consistently. After the first half of sprint 2, we weren’t able to meet up with Austin. We're still trying to figure it out but the others are definitely coming together as a team.
### Epics done  
  We didn’t finish the “Where Am I” epic last sprint so we did that first. In that, we added our location marker to the map, and a button to return to your location on the map. After that we started working on sprint2 epics like “Where is” and “Find Distance”. 
In “Where Is” , our team worked on tasks like finding location based on information, like a name. As well as adding a UI search bar, to look for and add to locations. 
Our "Find Distance" task was our last task and probably where we worked the most. In this epic we had 4 main tasks, request distance from the server, use the use and check distance formula, Make the UI for choosing 2 different targets, and making the UI for showing Distance. It took our team a while to figure out UI, but we got it after a bit.
### Epics not done 
  We didn’t do “Feeling Lucky” ,“Distance Unit” and "V2 protocol" when we were planning we assumed that those would be pretty easy to add to go along with “where-is” and “Find Distance” especially because a lot of the work seemed to already be done if we finished finding distance and where is. I think if we had an extra 2 days, we probably could have done these epics, next time we will plan better.Also, All our epics are under "V2 Protocol" so unless we finshed everything we chouldn't say we finish "V2 Protocol".
### What went well
  We're getting better at splitting up our big task into smaller, more manageable tasks. As Well as making sure to put it in zenhub to make sure we're getting points for it. Also, Collin, Jack, and Me are getting much better and communicating if we're lost and trying to help each other out. We also know what Jack's work schedule is like, so now we know we can meet him usually around 5:15 pm after he finishes working. 
### Problems encountered and resolutions
  Jack and I don’t have much experience in javascript, so this sprint was a bit of a learning curve. But using the zybooks, piazza, and each other we are figuring it out. Collin is always willing to help and is way more familiar with Javascript than us. 
	Midway through sprint 2, we had trouble meeting up, with each other, after having a scrum, we realized that not everyone had checked the chat very often. So to ensure that everyone got the messages and that we scrumed after every class period, we gave each other our cellphones and made a cell group chat. At first, it seemed like it would work because everyone was replying quickly to it, but for some reason, we still couldn’t meet on agreed upon time. 
## Retrospective
  In retrospect Collin and I probably should have split up atlas.js , as the file is now huge, being several hundred lines. That will be something we try to focus on early on the next sprint 3 because if it gets any bigger it might get too hard to separate. 
### What we changed this sprint
  We tried to make sure to use zenhub and to make sure that if we have a task that we feel is to big that we break it up. Also, more often than not, other than Austin, everyone met every day, slowly we figured out what we were doing, what place our team was in. That allowed us to know who needed help, and help them. 
### What went well
  I think Jack, Collin, and me(Tri), got closer as a team because we depended on each other for help often in this sprint. We asked each other if they needed help, and tried to make sure someone was doing something every scrum. Also, any problems that we had in the group we tried to have out in the open to solve. For example, I would often try to have scrums directly after class, so I could catch everyone, but Jack told me that he had work after class and that when we scrumed without him he would miss important info that he needed to be apart of the team. So we now only meet when we agree we can. Although this rule has kinda been broken with Austin. 
### Potential improvement
  I know you told us to talk to you if we had any problems within the class or even our team. But we had a problem with meeting that,we thought we could fix ourselves, but it seems we can't so next sprint we plan on talking to dave more about our team dynamics. 
### What we will change next time
  You talked to us after we planned sprint 2, so this sprint, we plan to make sure we have more tasks and our work is more spit into even tasks.  We understood that our planning was lacking and needed more tasks. In sprint 3 we hope to change that by planning a lot of it earlier, that way our plan better reflects what sprint3 will look like. We will try to fix problems within a week, and if we notice it is not working we should talk to dave. 
