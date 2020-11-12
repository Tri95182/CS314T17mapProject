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
| Epics | *8* | *count* |
| Tasks | *18* | *count* | 
| Story Points |  *30*  | *sum* | 


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
| *11/11/20* | *#282, #164, #272, #263* |  |  | 


## Review

### Epics done  

### Epics not done 

### What went well

### Problems encountered and resolutions


## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
