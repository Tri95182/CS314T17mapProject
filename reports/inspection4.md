# Inspection - Team *T17* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Trip.js* |
| Meeting | *11/02/20 3pm* |
| Checklist | *[Link to checklist](reports/checklist.md)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Collin Wernsman | 30 min |
| Tri Nguyen | 40 min |
| Jack Melvin |  |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Trip.js:215 | Control Fault: invert condition to do lines below it instead of returning | low | cwernsma | #298 |
| Trip.js:205,232,257 | Data Fault: change variable to const | low | cwernsma | #299 |
| Trip:233 | If the places were closer together, like less than 1 unit apart, we would not calculate trip | low | Tri |  |
| Trip | We have 26 functions in this, file we should at this point break it up | med | Tri | --- |
| Trip:64 | Render Menu be hella Compicated spliting it down to other functions might help readablity | low | Tri |  |
