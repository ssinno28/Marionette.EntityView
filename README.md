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
* 1.4.4
  * **DEPRECATION WARNING** removing entity router (based on AppRouter) in favor of more robust router cherrytree
* 1.3.31
  * passing in correct region for custom view field
  * making sure layout view gets destroyed if the form view is the same as the layout view
  * using math.floor to get number of pages
  * exposing fieldsets as a property on EntityFormView
* 1.3.27
  * adding disabled property to pass into singleLine editor for disabling field
* 1.3.26
  * repositioning modal title for new flex box layout
  * making sure pager behavior doesn't trigger on edit view
  * removing btn class form action fluent builder so you can specify if you want btn-sm, btn-xs ect...
  * requiring combobox in dist file
  * setting page size in page size dropdown on init
  * adding polyfill for missing getByCid method
  * updating FilterFormView template to empty div
  * updating form styles to be more consistent with newer version of bootstrap
  * fixing issue with nested routing when there are multiple nested services
  * allowing 0 as a value for dropdown view
* 1.3.13
  * style fixes for new bootstrap 
  * fixing issue with no available items showing for multi-select control
* 1.3.12
  * updating dist js file to be compatible with brunch.js
* 1.3.1
  * adding ability to override query ajax options and just use the front end caching (you can now setup getAjaxOptions method on your collection).
* 1.3.0
  * Upgrading all 3rd party dependencies to newest versions (except for lunr since that is not backwards compatible).
* 1.2.11
  * a few fixes to make sure it is compatible with module loaders
* 1.2.9
  * removing dependencies on external libraries to limit size of javascript if they are not in use
  * adding a captcha field 
  * adding ability to override the form header in the service
  * allowing overriding of default form messages
* 1.2.6
  * adding tags reusable type field based on the bootstrap tags input plugin
* 1.2.5
  * updating getters and setters for CheckBoxListView and RadioButtonListView
  * making it so you cannot pass in conditionals to FieldsMixin methods, instead will need to pass in filtered entities
  * adding tests for all ReusableTypeViews in entityFormTests to get and set values
* 1.2.4
  * adding getters and setters for remaining components
* 1.2.3
  * making sure all errors show inline for document fields
  * moving getters and setters for fields to individual component views
  * adding tests for document getData
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
