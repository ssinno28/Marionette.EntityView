# Marionette.EntityView

Marionette.EntityView is a framework built to support building dashboards using Bootstrap, Backbone and Marionette. It is an opinionated framework meant to ease the pain of listing entities, managing entity relationships and performing CRUD transactions.

Lets get started...

The backbone (no pun intended) of the framework is the base class definition EntityService. This is a Marionette Object that makes use of the Backbone.Radio event handling to both respond to controller routes as well as to make the methods available outside of routing actions.

There are a list of options that can be passed into the EntityService that allow for customizations with the service:



