# Sprint 5 - t17 - Team Bloo

## Goal
### User Experience

## Sprint Leader
### Tri Nguyen


## Definition of Done

* The version in `server/pom.xml` is `<version>5.0</version>`.
* The Product Increment release for `v5.0` created on GitHub.
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
Clean Up, Distance Unit and Shorter

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 3 | 2 | 
| Tasks | 12 | 24 | 
| Story Points |  15 | 31| 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 11/16 |  | #326, #331, #149 | We Plan out sprint5 | 
| 11/18 | #343, #342, #331 | #326, #86, #149 | We finshed a couple tasks and we added a couple more tasks also talked aobut inspect5 and what file were going to talk aobut | 
| 11/20 |  |  #326, #86, #149 | We work on an inspect, We didn't finish many task but were busy with other classes | 
| 12/1  | #326, #351, #150, #352, #149, #354, #86, #265, #354|  #327, #357, #266 | We got back from break, and we're talking about UI we added and New UI we want to add |
| 12/4  | #361, #358, #366, #367, #369, #368, #370 | #340, #357, #327, #362, #363, #266 | Did a lot after break |
| 12/8  | #371, #327, #372, #353 | #340, #357, #344, #362, #363, #266| We're all really busy with dead week so we haven't done as much to the site |
| 12/9  | #373, #344, $374, #340, #357, #74, #379 | #360, #364 #362, #363, #266 | We're all really busy with dead week but were making sure to work on our site and put in last tasks |
| 12/10 | #360, #364 #362, #363, #365, #378, #337, #377 #74 #355 |  | Finals took a toll on us |

## Review

### Epics done 

We completed our "Clean up" epic which was to tidy the site and our code. We removed instances of our old teammate and fixed our design.md. We also fixed a hand full of errors and glitches we discovered. Our second Epic completed was the "Distance Units" epic. We finally added the ability to change the units to something else specified or use ypur own custom units.

### Epics not done 

The Epic we did not complete was "Shorter Distances". We got part of the way there but ran out of time at the end. We decided it was better to polish what content we have rather than try and implement something last minute.

### What went well

Jack, Tri, and I were all able to meet up almost every other day to talk about development as well as have just normal conversations. This allowed us to get closer and work better with eachother. We were able to get solutions to our problems faster if we were stuck by sharing our screens so that we could see exactly what was going on.

### Problems encountered and resolutions

One of the big problems this sprint was getting the distances to automatically update when you changed PlacesDistance variable outside of trip. We solved this by adding a function that checks to see if the displayed variable is equal to the actual variable. Another issue was finals and the amount of time we could spend on this class.

## Retrospective

### What we changed this sprint

We added more buttons to make a more interconnected UI to allow easier use and more intuitive setup. We also added a handful of other settings to give the user more control over what is displayed and how its displayed.

### What went well

The three of us really work well together and can put in the time to help each other out when we need it. We ended up with a pretty great site built soley by the three of us.

### Potential improvements

Some potential improvements for the team would be to not condense our work hours so much. We tend to get more tasks done near the end of the sprint. 

### What we will change next time

What we will change "next time" is implementing the final epics that are left. We will implement them in a timely manner and we will implement them flawlessly the first time.
