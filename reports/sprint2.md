# Sprint # - T17 - Team Bloo

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
| Epics | *6* | *count* |
| Tasks |  *18*   | *count* | 
| Story Points |  *18*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 9/17 |  | #90 ,#35 | Were all new to back end server dev stuff so where all getting a feel for it more or less  | 
| 9/19 | #91 | #90 , #35 | Were having a hard time meeting very often |  
| 9/21 | #101 | #96 , #95 , #81 , #78 | We talk about a time to meet with dave, and we talk about what were doing next.| 
| 9/23 | #106, #107, #104, #103 | #88, #97, #96, #95, #81, #78  | We talk about our progression in sprint 1 and how we should split task more often.|
## Review

### Epics done  
0
### Epics not done 

### What went well

### Problems encountered and resolutions


## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
