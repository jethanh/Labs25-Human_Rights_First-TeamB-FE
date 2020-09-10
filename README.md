# Human Rights First - Incidents of Excessive Use of Force by Police

In this project we are tasked with mapping out incidents of police brutality/excessive use of force. Using React.js, Google Maps API, and other technologies, we are building a single page application that allows users to easily access information by panning over a map, using search features, adjusting a timeline, or viewing data plotted to charts.

A GIF displaying basic functionality can be found here: https://gyazo.com/76e9d7a0a8c091d0bbfb777ba8dfab0e (todo: embed this in readme).

## Google Maps API

After testing out a few different maps APIs, including MapBox, we found that the Google Maps API would be the most suitable for this project. It allows us to render upwards of 1000 different markers, cluster them, and maintain interactability with each of the markers. It may be worth exploring heatmaps going forward in this project.

One problem with the MapBox API was that it was extremely laggy with the amount of markers we are required to render to the map.
