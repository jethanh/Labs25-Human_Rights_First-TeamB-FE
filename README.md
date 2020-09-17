# Human Rights First - Incidents of Excessive Use of Force by Police

This is a single page application that takes data scraped from Twitter and Reddit and plots incidents of police brutality across the United States on an interactive map. A user is able to search through incidents and view them on a timeline visual.

 - [GIF of Usage](https://gyazo.com/76e9d7a0a8c091d0bbfb777ba8dfab0e)


## Front End
   - React
   - Google Maps API
   - Timeline & Collapisible Components
   - AntDesign
   - LESS

## Key Features
### Interactive Map - Google Maps API

The Google Maps API allows us to render upwards of 1000 different markers, cluster them, and maintain interactability with each of the markers. 

Could be improved:

-It may be worth exploring heatmaps or spidering markers going forward in this project if better coordinates data is not available.

### Search Functionality

The search functionality is built using collapsible components. It is synced up to the backend database and processes a GET request each time a user submits a search query.

### Timeline
The timeline is built using the ```vertical-timeline-component-for-react``` package. This package allows us to save the effort of designing our own timeline and display incidents in a visual manner seperate from the interactive map.

## Installation

- Navigate to the root directory with this README in it.
- ```npm install & npm start```
