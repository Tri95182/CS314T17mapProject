# Inspection - Team *T17* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *LocationsList.js* |
| Meeting | *11/02/20 3pm* |
| Checklist | *[Link to checklist](reports/checklist.md)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Collin Wernsman | 1 hour |
| Tri Nguyen | 1 Hour |
| Jack Melvin | 45 Min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| LocationsList.js:19,111,138 | Data fault: could change variables to constants | low | cwernsma | #279 |
| Atlas | On the webpage the atlas will move from marker to marker | Med | Tri Nguyen | #282 |
| LocationList:125 | Maybe we can add a else, for locations, with length 0 | Low | Tri Nguyen | |
| LocationList:101 | seems like we dont need this else statement as the thing in the else statement always functions | Low | Tri Nguyen | 
| LocationList:89| Location keeps getting re-rendered instead of when you click the button. Need to change how the function gets called so it doesent rerender aproximatly every seconed. Goes deeper into all flyto calls in every file | med | Jack | #282 | 
