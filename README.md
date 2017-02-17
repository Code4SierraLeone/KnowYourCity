## KnowYourCity Campaign [Code4SierraLeone]
=============================================


**This branch mainly contains the main logic of the app that handles the Administrative Management part and can be used to both map the data as well manipulate and manage the data.**

Know Your City Campaign aims at mapping all the amenities within Informal Settlement areas in Freetown, Sierra Leone, so as to help the occupants get help in the case of a disaster in the regions. The mapping will give details in terms of directions and distance from their current locations as well as the services offered in those areas.


For the User Interface Design and Logic Implementation, I have used the following resources(please refer to the documentation(`to come`) for further details on each)
* `jQuery`
* `HTML` & `LessCSS`
* `Google Maps Javascript API v3`
* `JavaScript`
* `Golang` (Local server taste runs
* `Firebase`(Authentication and Realtime Database)

## Main Features
* Allow users to find mapped resource centers in the Informal Settlement Areas
* Allow users to have access to contacts to the mapped resource centers
* Allow users to  Identify their current location on the map, thus be able to trace the mapped locations

## Check it out at a glance

#### Home Page

![alt tag](https://raw.githubusercontent.com/Code4SierraLeone/KnowYourCity/base/assets/img/photos/13.png)

#### Web-app Page

![alt tag](https://raw.githubusercontent.com/Code4SierraLeone/KnowYourCity/base/assets/img/photos/12.png)

## Getting your own instance of Know Your City Campaign app

1. Clone this repository

   `$ https://github.com/Code4SierraLeone/KnowYourCity.git`

2. Install project dependencies via `go get`.

    `$ go get`

3. Run a development server from the root folder.

    `$ go run app/serve.go ` (This is for current tests)
    `$ go run app/main.go ` (This is for production stage)

## Current
* Collection and Implementation of data mapping.

## Issues
* Broken side-menu on the web-app page. Working to fix this ASAP

## Milestone/Backlog
* Fully integrate the SMS feature into the app to allow for quick notifications


* To view the current user interface designs just run the files on the `templates directory` on your local server. You can as well set up the `$GOPATH` and run the `main.go` server found here[This is under construction and will be documented by next week].
* The data being rendered on the User interface at the moment are dummy data, and not real especially on the Map.
