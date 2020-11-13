# Sprint 4 - T17 - Team Bloo

## Goal
### Shorter Trips!
## Sprint Leader
### Collin Wernsman


## Definition of Done

* The version in `server/pom.xml` is `<version>4.0</version>`.
* The Product Increment release for `v4.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style=, etc.).

### Clean Code
* Technical Debt Ratio less than 5% (A).
* Minimize code smells and duplication.

### Test Driven Development
* Write tests before code.
* Unit tests are fully automated.
* Code coverage greater than 70%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
* v4 protocol - Add optional coordinates element to places in trip request. Also, add filters element to the config response and add narrow element to find request. 
* Shorter - Have a method to optimize the trip such that the order of it's destinations gives the lowest round trip distance. This must be done in under a second.
* Filter Search - Be able to reduce the amount of output when searching by filtering it. Also, include additional information about the places that are searched such as region and country.
* User Experience - Get user feedback from outside sources and address potential improvements that can be made to the user interface.
* Place Details - Display additional information about places in the trip itinerary as well as on map markers. Also, use reverse geocoding to get additional information from latitude and longitude.
* File Formats - Support several different file formats to save a trip to in order to be used with other tools. These formats include CSV, KML, and SVG.
* Build Trip - Be able to load trip files into the itinerary.
* Modify Trip - Adding notes to trip destinations, reversing the order of trip destinations, and selecting a new starting location for the trip.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *8* | *7* |
| Tasks | *18* | *28* | 
| Story Points |  *30*  | *42* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/27/20* |  |  | Discussing what tasks to do for this sprint | 
| *10/29/20* | *#267* | *#167, #170, #271* |  | 
| *11/02/20* | *#283* | *#167, #170, #271* | Everyone has been busy with other class projects | 
| *11/04/20* | *#170, #270* | *#167, #269, #271* |  | 
| *11/06/20* | *#262, #260, #261, #269, #268, #292* | *#167, #286, #271* | Tasks should have been split up more | 
| *11/09/20* | *#286* | *#167, #271, #263, #166* |  | 
| *11/10/20* | *#304, #167, #305, #271, #309, #166* | *#263, #287, #164, #272* |  | 
| *11/11/20* | *#282, #164, #272, #263, #242* |  |  | 
| *11/12/20* | *#205, #201, #299, #298, #89, #83* |  |  | 


## Review
Finishing up sprint4, our team was able to get quite a lot done considering we only have three people. We're all still confused about where our fourth team member, Austin, has been and we're assuming he has dropped the class. Our planning for this sprint turned out to be pretty accurate where we were able to complete almost all of the original tasks we had by the end of the sprint. We were all able to meet up regularly and have meaningful discussions about any questions we had any how to resolve them. For the first half of the sprint, we didn't complete as many tasks as we might have liked to because we were all busy with other school projects, but for the second half we picked up the slack and started doing more.

### Epics done  
We completed the "Filter Search" epic first and them moved on to complete the "User Experience" epic where we all separately got user feedback on out site. Then, we were able to complete the "v4 Protocol" and "Place Details" epics. From the previous sprint, we still had a few tasks for the "Build A Trip" and "Modify Trip" epics that we were able to finish as well. As a last minute realization, we decided to also finish the "Feeling Lucky" epic as we realized that we already had the methods to do it which made it quite easy.

### Epics not done 
We weren't able to start the "Shorter" and "File Formats" epics that we had planned. Nearing the end of the sprint, we decided to focus on the epics that were already in progress to get them completed instead of starting a new one and end up with two half completed epics. We may have been a little more ambitious with our planning as well because we're still not used to spreading the work load accross only three team members.

### What went well
Jack, Tri, and I were all able to meet up almost every other day to talk about development as well as have just normal conversations. This allowed us to get closer and work better with eachother. We were able to get solutions to our problems faster if we were stuck by sharing our screens so that we could see exactly what was going on.

### Problems encountered and resolutions
We're still having problems regarding Austin's absence. This can be seen in our planning where we weren't able to complete everything we wanted to. Also, for the first half of the sprint, we were all pretty busy with projects from other classes. We resolved this by picking up more tasks for the second half of the sprint when we had more time.


## Retrospective
Looking back, we did a good job of splitting our client files into separate logical components. However, our Atlas and Trip files are still quite large because we added several new methods to each. 

### What we changed this sprint
The tasks for our epics were split up better than previous sprints. This meant there wasn't an overwhelming amount of work to do for each task. We also shifted our focus to epics that we were already working on instead of starting new ones. We tried to keep our eye on the info that code climate gave us to make sure that we were continuing to write clean code.

### What went well
We did a good job of working on tasks in the same epic so that we didn't end the sprint with any half completed epics. We all helped eachother with our tasks to get them done more efficiently. 

### Potential improvements
For next sprint, if we see that files are getting too big, we might want to split them up into multiple files even if there's no logical place to split in the code. We also might want to aggregate some of our state variables in Atlas because we have the same things in multiple locations which makes it slower and more difficult to update across everything.

### What we will change next time
Next time, we'll try to plan more accordingly for only having three team members. We'll also finish the two epics that we didn't get to this time. During development, we will try to use existing variables instead of making new ones if they have the same information to cut down on duplication.
