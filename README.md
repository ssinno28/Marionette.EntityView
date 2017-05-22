# Marionette.EntityView

Marionette.EntityView is a framework built to support building dashboards using Bootstrap, Backbone and Marionette. It is an opinionated framework meant to ease the pain of listing entities, managing entity relationships, easily creating forms with validation and performing CRUD transactions.

Check out the [wiki](https://github.com/ssinno28/Marionette.EntityView/wiki) to get started

To install using npm:

```
npm install marionette-entityview
```

While these projects are not published to npm yet, you can take a look at them to give you an idea as how to get started:

* [Marionette.EntityView.Patternfly](https://github.com/ssinno28/Marionette.EntityView.Patternfly)
  * Take a look at the alterations file and you will see how changes were easily made to allow me to override the default templates along with some other functionality to integrate with the [PatternFly open interface project](https://www.patternfly.org/)
* [Marionette.EntityView.GeoManager](https://github.com/ssinno28/Marionette.EntityView.GeoManager)
  * While this project has other depedencies that are not listed, it would be good to take a look at to get an idea of how to get started.
* Aside from those there is also the [example folder](https://github.com/ssinno28/Marionette.EntityView/tree/master/example) in the root of the project.

## Release History
* 1.2.2
  * making it so you don't have to scaffold EntityListView and EntityListItemView
  * making sure document property errors are showing inline to property field
  * setting current page to 1 when the page size is set
* 1.2.1
  * hiding page size drop down if there is only one page
  * adding template for multi select entity views
  * removing margin for inline form-group filters
* 1.2.0
  * adding new FiltersFormView for decoupling filters from EntityLayoutView
  * adding SingleCheckBoxView for true/false checkbox
  * adding ability to pass placeholder text to SingleLineTextView
* 1.1.0 
  * adding actions feature  
* 1.0.4
  * adding correct combobox npm package
  * adding change event on dataField channel for DropDownListView
  * adding page size region and populating with default set of page sizes
  * making sure we don't use App.pageSize and instead reference the service for page sizes
