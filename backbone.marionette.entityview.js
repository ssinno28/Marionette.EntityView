/*jshint sub:true*/

/* MIT License

Copyright (c) 2017 Sammi Maan Sinno

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone', 'marionette', 'jquery', 'underscore', 'app', 'moment'],
            function (Backbone, Marionette, $, _, App, moment) {
                return factory(Backbone, Marionette, $, _, App, moment);
            });
    } else {

        if (_.isUndefined(root.App)) {
            root.App = new Marionette.Application();
        }

        // Browser globals
        var exports = factory.call(root, root.Backbone, root.Marionette, root.jQuery, root._, root.App, root.moment);
        _.extend(root, exports);
    }
}(this, function (Backbone, Marionette, jQuery, _, App, moment) {

    /* jshint ignore:start */
    this["Templates"] = this["Templates"] || {};

this["Templates"]["entityFormLayoutTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(isNew) { ;
__p += '\r\n<h2>Create</h2>\r\n';
 } else { ;
__p += '\r\n<h2>Edit ' +
((__t = ( name )) == null ? '' : __t) +
'</h2>\r\n';
 } ;
__p += '\r\n\r\n<div class="entity-form-layout form form-horizontal">\r\n    <div class="entityFormRegion">\r\n\r\n    </div>\r\n    <div class="form-group">\r\n        <div class="messagesRegion col-sm-12">\r\n\r\n        </div>\r\n        <div class="col-sm-12 actions">\r\n            <input type="submit" value="Submit" name="submit" class="btn btn-primary ' +
((__t = ( btnClass )) == null ? '' : __t) +
'"/>\r\n            <button type="button" class="btn btn-default ' +
((__t = ( btnClass )) == null ? '' : __t) +
' reset">Reset</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class="modal fade warningModal" tabindex="-1" role="dialog" aria-labelledby="warningModal" aria-hidden="true">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n                    <span class="pficon pficon-close"></span>\r\n                </button>\r\n                <h4 class="modal-title">Warning!</h4>\r\n            </div>\r\n            <div class="modal-body message">\r\n\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" type="button" class="btn btn-primary yes">Yes</button>\r\n                <button type="button" type="button" class="btn btn-default no" data-dismiss="modal">No</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
};

this["Templates"]["entityLayoutTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="container-fluid">\r\n    <div class="entity-header row">\r\n    </div>\r\n    <div class="row toolbar-pf">\r\n        <div class="col-sm-12">\r\n            <div class="toolbar-pf-actions">\r\n                <div class="form-group toolbar-pf-filter">\r\n                    <label class="sr-only" for="filter">Name</label>\r\n\r\n                    <div class="input-group col-sm-12">\r\n                        <input type="text" class="form-control nameFilter" id="filter" placeholder="Filter By Name...">\r\n                    </div><!-- /input-group -->\r\n                </div>\r\n                <div class="form-group sub-nav">\r\n                    <button type="button" class="get-all btn btn-default">\r\n                        All\r\n                    </button>\r\n                    ';
 if(showCreate){ ;
__p += '\r\n                    <button type="button" class="create btn btn-primary">\r\n                        Create\r\n                    </button>\r\n                    ';
 } ;
__p += '\r\n                    ';
 if(allowDeleteAll || allowPublishAll || allowAddAll) { ;
__p += '\r\n                    ';
 if(allowDeleteAll){ ;
__p += '\r\n                    <button type="button" class="btn btn-danger multi-action-requests ' +
((__t = ( btnClass )) == null ? '' : __t) +
' delete-all">Delete All</button>\r\n                    ';
 } ;
__p += '\r\n\r\n                    ';
 if(allowPublishAll){ ;
__p += '\r\n                    <button type="button" class="btn btn-default multi-action-requests ' +
((__t = ( btnClass )) == null ? '' : __t) +
' publish-all">Publish All</button>\r\n                    ';
 } ;
__p += '\r\n\r\n                    ';
 if(allowAddAll){ ;
__p += '\r\n                    <button type="button" class="btn btn-default multi-action-requests ' +
((__t = ( btnClass )) == null ? '' : __t) +
' add-all">Add All</button>\r\n                    ';
 } ;
__p += '\r\n                    ';
 } ;
__p += '\r\n                </div>\r\n            </div>\r\n        </div><!-- /col -->\r\n    </div><!-- /row -->\r\n</div><!-- /container -->\r\n\r\n<div class="container-fluid">\r\n    <div class="list-group list-view-pf list-view-pf-view entityRegion">\r\n\r\n    </div>\r\n    <div class="filterEntities row">\r\n        <div class="pagerRegion col-sm-12"></div>\r\n    </div>\r\n</div>\r\n\r\n<div class="modal fade delete-all-modal" tabindex="-1" role="dialog" aria-labelledby="delete-all-modal"\r\n     aria-hidden="true">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n                    <span class="pficon pficon-close"></span>\r\n                </button>\r\n                <h4 class="modal-title">Delete All?</h4>\r\n            </div>\r\n            <div class="modal-body message">\r\n                Are you sure you want to delete these items?\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-primary yes">Yes</button>\r\n                <button type="button" class="btn btn-default no" data-dismiss="modal">No</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class="modal fade publish-all-modal" tabindex="-1" role="dialog" aria-labelledby="publish-all-modal"\r\n     aria-hidden="true">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n                    <span class="pficon pficon-close"></span>\r\n                </button>\r\n                <h4 class="modal-title">Publish All?</h4>\r\n            </div>\r\n            <div class="modal-body message">\r\n                Are you sure you want to publish these items?\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-primary yes">Yes</button>\r\n                <button type="button" class="btn btn-default no" data-dismiss="modal">No</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class="modal fade deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n                    <span class="pficon pficon-close"></span>\r\n                </button>\r\n                <h4 class="modal-title">Delete Item</h4>\r\n            </div>\r\n            <div class="modal-body message">\r\n                Are you sure you want to delete this item?\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-primary yes">Yes</button>\r\n                <button type="button" class="btn btn-default no" data-dismiss="modal">No</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
};

this["Templates"]["entityListItemTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\r\n<div class="list-group-item">\r\n    ';
 if(allowPublishAll || allowDeleteAll || allowAddAll){ ;
__p += '\r\n    <div class="list-view-pf-checkbox">\r\n        <input class="multi-action" data-id="' +
((__t = ( id )) == null ? '' : __t) +
'" id="' +
((__t = ( route )) == null ? '' : __t) +
'' +
((__t = (id)) == null ? '' : __t) +
'" type="checkbox">\r\n    </div>\r\n    ';
 } ;
__p += '\r\n\r\n    ';
 if(allowEdit || allowDelete){ ;
__p += '\r\n    <div class="list-view-pf-actions">\r\n        <div class="dropdown pull-right dropdown-kebab-pf">\r\n            <button class="btn btn-link dropdown-toggle" type="button" id="dropdown' +
((__t = ( route )) == null ? '' : __t) +
'' +
((__t = (id)) == null ? '' : __t) +
'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\r\n                <span class="fa fa-ellipsis-v"></span>\r\n            </button>\r\n            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown' +
((__t = ( route )) == null ? '' : __t) +
'' +
((__t = (id)) == null ? '' : __t) +
'">\r\n                ';
 if(allowEdit){ ;
__p += '\r\n                <li>\r\n                    <a class="edit" data-id="' +
((__t = ( id )) == null ? '' : __t) +
'" href="#">\r\n                        Edit\r\n                    </a>\r\n                </li>\r\n                ';
 } ;
__p += '\r\n\r\n                ';
 if(allowDelete){ ;
__p += '\r\n                <li>\r\n                    <a class="delete" href="#' +
((__t = ( route )) == null ? '' : __t) +
'/delete/' +
((__t = ( id )) == null ? '' : __t) +
'/">\r\n                        Delete\r\n                    </a>\r\n                </li>\r\n                ';
 } ;
__p += '\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    ';
 } ;
__p += '\r\n\r\n    <div class="list-view-pf-main-info">\r\n        <div class="list-view-pf-body">\r\n            <div class="list-view-pf-additional-info fieldsRegion">\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
};

this["Templates"]["headerTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <h1>' +
((__t = ( title )) == null ? '' : __t) +
'</h1>';

}
return __p
};

this["Templates"]["autoCompleteTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input class="valueText form-control" type="text"/>\r\n<input name="' +
((__t = ( dataField )) == null ? '' : __t) +
'" data-field="' +
((__t = ( dataField )) == null ? '' : __t) +
'" type="hidden" class="selectedId"/>\r\n<a style="width:0px; height:0px;" class="ddLink" href="#" data-dropdown="' +
((__t = ( dataField )) == null ? '' : __t) +
'"></a>\r\n\r\n<div class="dropDownRegion"></div>\r\n\r\n\r\n';

}
return __p
};

this["Templates"]["liAutoCompleteTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n    <a class="autocomplete-item" href="#" data-id="' +
((__t = ( id )) == null ? '' : __t) +
'">' +
((__t = ( name )) == null ? '' : __t) +
'</a>\r\n';

}
return __p
};

this["Templates"]["checkBoxTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <label for="' +
((__t = ( name )) == null ? '' : __t) +
'">\r\n        <input ' +
((__t = ( checked )) == null ? '' : __t) +
' type="checkbox" data-field="' +
((__t = ( dataField )) == null ? '' : __t) +
'" name="' +
((__t = ( name )) == null ? '' : __t) +
'" />\r\n        <span>' +
((__t = ( name )) == null ? '' : __t) +
'</span>\r\n    </label>';

}
return __p
};

this["Templates"]["datePickerTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="col-sm-6 date input-group">\r\n    <input type="text" class="form-control bootstrap-datepicker" data-field="' +
((__t = ( dataField )) == null ? '' : __t) +
'_date"\r\n           value="' +
((__t = ( date )) == null ? '' : __t) +
'"/>\r\n    <span class="input-group-addon">\r\n        <span class="fa fa-calendar"></span>\r\n    </span>\r\n</div>\r\n<div class="col-sm-6 time input-group time-picker-pf">\r\n    <input type="text" class="form-control" data-field="' +
((__t = ( dataField )) == null ? '' : __t) +
'_time" value="' +
((__t = ( time )) == null ? '' : __t) +
'"/>\r\n        <span class="input-group-addon btn btn-default">\r\n            <span class="fa fa-clock-o"></span>\r\n        </span>\r\n</div>';

}
return __p
};

this["Templates"]["dropDownButtonTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<button class="btn btn-default dropdown-toggle" type="button" id="linkDrop' +
((__t = (id)) == null ? '' : __t) +
'" data-toggle="dropdown">\r\n    Dropdown\r\n    <span class="caret"></span>\r\n</button>\r\n<ul class="dropdown-menu" role="menu" aria-labelledby="linkDrop' +
((__t = (id)) == null ? '' : __t) +
'">\r\n</ul>\r\n';

}
return __p
};

this["Templates"]["imageFieldTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <div class="col-sm-3">\r\n        <a style="display:none;" class="th radius" href="#">\r\n            <img id="uploadedImage' +
((__t = ( dataField )) == null ? '' : __t) +
'" class="uploadedImage"/>\r\n        </a>\r\n        <input name="' +
((__t = ( dataField )) == null ? '' : __t) +
'" data-field="' +
((__t = ( dataField )) == null ? '' : __t) +
'" type="hidden" value="' +
((__t = ( value )) == null ? '' : __t) +
'"/>\r\n    </div>\r\n    <div class="col-sm-9">\r\n        <button type="button" onclick="BrowseServer(\'' +
((__t = ( dataField )) == null ? '' : __t) +
'\');" class="pickImage">Pick Image</button>\r\n    </div>';

}
return __p
};

this["Templates"]["headerTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '   <div class="col-sm-12 nopadding">\r\n       <h5>' +
((__t = ( title )) == null ? '' : __t) +
'</h5>\r\n   </div>';

}
return __p
};

this["Templates"]["multiSelectLayoutTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span data-toggle="tooltip" data-placement="left" aria-haspopup="true" title="" class="has-tip zmshead">\r\n        Selected\r\n    </span>\r\n<div class="row optionsRegion">\r\n    <div class="col-sm-6">\r\n        <div class="col-sm-12 options"></div>\r\n        <div class="col-sm-12 text-center">\r\n            <button style="display:none;" class="btn btn-default add-items" href="#">Add</button>\r\n        </div>\r\n    </div>\r\n    <div class="col-sm-6">\r\n        <div class="col-sm-12 selectedOptions"></div>\r\n        <div class="col-sm-12 text-center">\r\n            <button style="display:none;" class="btn btn-default text-center remove-items">Remove</button>\r\n        </div>\r\n    </div>\r\n    <div class="clearfix"></div>\r\n</div>';

}
return __p
};

this["Templates"]["multiSelectLiTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a class="multi-select-option" data-id="' +
((__t = ( id )) == null ? '' : __t) +
'" href="#">\r\n    ' +
((__t = ( name )) == null ? '' : __t) +
'\r\n</a>\r\n';

}
return __p
};

this["Templates"]["pagerItemTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n    <a data-number="' +
((__t = ( number )) == null ? '' : __t) +
'" href="#' +
((__t = ( route )) == null ? '' : __t) +
'">' +
((__t = ( number )) == null ? '' : __t) +
'</a>\r\n';

}
return __p
};

this["Templates"]["radioButtonTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <label for="' +
((__t = ( name )) == null ? '' : __t) +
'">\r\n        <input ' +
((__t = ( checked )) == null ? '' : __t) +
' type="radio" data-field="' +
((__t = ( dataField )) == null ? '' : __t) +
'" name="' +
((__t = ( dataField )) == null ? '' : __t) +
'" value="' +
((__t = ( id )) == null ? '' : __t) +
'" id="' +
((__t = ( name )) == null ? '' : __t) +
'">\r\n        ' +
((__t = ( name )) == null ? '' : __t) +
'</label>';

}
return __p
};

this["Templates"]["singleLineTextTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input class="form-control" name="' +
((__t = ( dataField )) == null ? '' : __t) +
'" data-field="' +
((__t = ( dataField )) == null ? '' : __t) +
'" value="' +
((__t = ( value )) == null ? '' : __t) +
'" type="text"/>\r\n';

}
return __p
};

this["Templates"]["textAreaTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <textarea name="' +
((__t = ( dataField )) == null ? '' : __t) +
'" data-field="' +
((__t = ( dataField )) == null ? '' : __t) +
'" >\r\n        ' +
((__t = ( value )) == null ? '' : __t) +
'\r\n    </textarea>';

}
return __p
};

this["Templates"]["wyswigTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <textarea class="editor" id="' +
((__t = ( dataField )) == null ? '' : __t) +
'" data-field="' +
((__t = ( dataField )) == null ? '' : __t) +
'" name="' +
((__t = ( dataField )) == null ? '' : __t) +
'" rows="10" cols="80">\r\n' +
((__t = ( value )) == null ? '' : __t) +
'\r\n    </textarea>';

}
return __p
};

this["Templates"]["treeCompositeTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <div class="node">\r\n        <a data-id="' +
((__t = ( id )) == null ? '' : __t) +
'" class="nodeLink' +
((__t = ( id )) == null ? '' : __t) +
'" href="#">\r\n            ' +
((__t = ( name )) == null ? '' : __t) +
'\r\n        </a>\r\n\r\n        <a class="toggle' +
((__t = ( id )) == null ? '' : __t) +
' toggle">\r\n            <i class="fi-minus"></i>\r\n            <i class="fi-plus"></i>\r\n        </a>\r\n    </div>\r\n\r\n    <ul class="children"></ul>';

}
return __p
};

this["Templates"]["treeNodeTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a data-id="' +
((__t = ( id )) == null ? '' : __t) +
'" class="nodeLink" href="#"><span>' +
((__t = ( name )) == null ? '' : __t) +
'</span></a>\r\n';

}
return __p
};

this["Templates"]["messageTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    ' +
((__t = ( message )) == null ? '' : __t);

}
return __p
};

this["Templates"]["validationTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">\r\n    <span class="pficon pficon-close"></span>\r\n</button>\r\n<span class="pficon ' +
((__t = ( iconClass )) == null ? '' : __t) +
'"></span>\r\n<div class="validationMessages">\r\n\r\n</div>\r\n';

}
return __p
};
    /* jshint ignore:end */

    var FormValidator;
(function ($, _, Backbone, Marionette) {
    FormValidator = Marionette.Object.extend({
        regex: {
            //RFC 2822
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            alpha: /^[a-zA-Z]+$/,
            alphanum: /^[a-zA-Z0-9]+$/
        },

        validate: function (validator, val, options) {
            if (_.isFunction(FormValidator[validator].evaluate)) return _(FormValidator[validator].evaluate).bind(this)(val, options);
            throw new Error('Validator does not exist : ' + validator);
        },

        /*     matches: function (val, field) {
         *//*jshint eqeqeq:false*//*
         return val == this.inputVal(field);
         },*/

        min: {
            evaluate: function (val, options) {
                if (val.length < options[0]) return false;
                return true;
            }
        },


        max: {
            evaluate: function (val, options) {
                if (val.length > options[0]) return false;
                return true;
            }
        },

        numeric: {
            evaluate: function (val) {
                return !_.isNaN(val);
            }
        },

        alpha: {
            evaluate: function (val) {
                return FormValidator.regex.alpha.test(val);
            }
        },

        alphanum: {
            evaluate: function (val) {
                return FormValidator.regex.alphanum.test(val);
            }
        },

        email: {
            evaluate: function (val) {
                return val === '' || FormValidator.regex.email.test(val);
            }
        },

        required: {
            evaluate: function (val) {
                if (val === false || _.isNull(val) || _.isUndefined(val) || (_.isString(val) && val.length === 0)) return false;
                return true;
            }
        },

        boolean: {
            evaluate: function (val) {
                return _.isBoolean(val);
            }
        }
    });
})(jQuery, _, Backbone, Marionette);

var TimeoutUtil;
(function ($, _) {
    TimeoutUtil = (function () {

        var constructor = function () {
            var pendingOperation = false;
            //takes a variable set of arguments.. the first argument should be the delay
            this.suspendOperation = function () {
                var outerScope = this;

                //need to set the arguments in the outerscope
                this.arguments = arguments;

                //the first argument should always be the delay
                if (!parseInt(this.arguments[0])) {
                    console.log('the first argument should always be the number of miliseconds');
                    return;
                }

                var delay = this.arguments[0];

                //this will only be true if the operation is pending
                if (pendingOperation) {
                    pendingOperation = false;
                    clearTimeout(this.setDelay);
                }

                //queue up the operation
                pendingOperation = true;
                this.setDelay = setTimeout(
                    function () {
                        if (pendingOperation) {
                            for (var i = 1; i < outerScope.arguments.length; i++) {
                                outerScope.arguments[i]();
                            }
                            pendingOperation = false;
                        }
                    }, delay);
            };
        };

        return constructor;
    })();
})(jQuery, _);
var UriUtil;
(function ($, _, Backbone) {
    UriUtil = {
        getUriHash: function (object) {
            var str = decodeURIComponent($.param(object));
            return "q/" + str;
        },
        getUrlVars: function () {
            //set to a key value pair for each parameter
            var hash;
            var jsonObject = {};
            var hashes = location.hash.slice(location.hash.indexOf('q/') + 2).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                jsonObject[hash[0]] = hash[1];
            }
            return jsonObject;
        },
        getRoute: function () {
            return location.hash.slice(0, location.hash.indexOf('q/'));
        },
        getUrlFriendlyString: function (s) {
            return s.replace(/ /g, "-").toLowerCase();
        }
    };
})(jQuery, _, Backbone);
(function (App) {

    var $config = $('#config');
    if ($config.length > 0) {
        var config = JSON.parse(decodeURIComponent($config.val()));
        _.extend(App, config);
    }

    App.isMobile = function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    };

    App.keyStrokes = {
        backspace: 8,
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        insert: 45,
        del: 46
    };

    Backbone.Radio.DEBUG = App.DEBUG_MODE;

    //turn on/off logging based on environment
    if (!App.DEBUG_MODE) {
        console.log = function () {
        };
    }

    //set up simple caching
    var cache = {};
    App.getCache = function (key, store) {
        if (cache[key]) {
            return cache[key];
        }

        if (!store) {
            return undefined;
        }

        var result;
        if (typeof (store) === "function") {
            result = store();
        } else {
            result = store;
        }

        cache[key] = result;
        return result;
    };

    App.setCache = function (key, value) {
        if (_.isUndefined(cache[key]) || _.isNull(cache[key])) {
            cache[key] = value;
        }
    };

    if (_.isUndefined(App.pageSize)) {
        App.pageSize = 10;
    }

    $('#file-manager').on('click', function (e) {
        e.preventDefault();
        BrowseServer();
    });

})(App);
var EntityModel;
(function ($, _, Backbone) {
    EntityModel = Backbone.EntityModel = Backbone.Model.extend({
        setUrl: function (base) {
            this.url = base;
            /*this.url = base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;*/
        }
    });
})(jQuery, _, Backbone);

var EntityLayoutModel;
(function ($, _, Backbone, Marionette) {
    EntityLayoutModel = Backbone.Model.extend({
        defaults: {
            title: '',
            listView: new Backbone.Marionette.CollectionView(),
            route: '',
            additionalParams: ''
        }
    });
})(jQuery, _, Backbone, Marionette);
var MessageModel;
(function ($, _, Backbone, Marionette, App) {
    MessageModel = Backbone.Model.extend({
        defaults: {
            message: '',
            className: ''
        }
    });

})(jQuery, _, Backbone, Marionette, App);
var ValidationModel;
(function ($, _, Backbone, Marionette, App) {
    ValidationModel = Backbone.Model.extend({
        defaults: {
            messagesCollection: new Backbone.Collection()
        },
        setMessages: function (messages) {
            var messagesCollection = this.get('messagesCollection');
            messagesCollection.reset();
            _.each(messages, function (message) {
                var messageModel = new Backbone.Model({message: message});
                messagesCollection.add(messageModel);
            });
        }
    });

})(jQuery, _, Backbone, Marionette, App);
var EntityFilters;
(function (Backbone, Marionette) {
    EntityFilters = Marionette.EntityFilters = Marionette.Object.extend({
        like: function (model, condition) {
            return model.get(condition.field).toLowerCase().indexOf(condition.value.toLowerCase()) === 0;
        },

        equals: function (model, condition) {
            if (model.get(condition.field) instanceof Array) {
                return model.get(condition.field).indexOf(condition.value) > -1;
            } else {
                return model.get(condition.field) === condition.value;
            }
        },

        contains: function (model, condition) {
            return model.get(condition.field).indexOf(condition.value) > -1;
        },

        notEquals: function (model, condition) {
            if (model.get(condition.field) instanceof Array) {
                return model.get(condition.field).indexOf(condition.value) === -1;
            } else {
                return model.get(condition.field) !== condition.value;
            }
        },

        in: function (model, condition) {
            var values;
            if (condition.value instanceof Array) {
                values = condition.value;
            } else {
                values = condition.value.split(',');
            }

            var fieldValue = model.get(condition.field);
            for (var i = 0; i < values.length; i++) {
                if (fieldValue instanceof Array) {
                    if (fieldValue.indexOf(values[i]) > -1) {
                        return true;
                    }
                } else {
                    if (values[i] == fieldValue) {
                        return true;
                    }
                }
            }

            return false;
        },

        except: function (model, condition) {
            var values;
            if (condition.value instanceof Array) {
                values = condition.value;
            } else {
                values = condition.value.split(',');
            }

            for (var i = 0; i < values.length; i++) {
                if (values[i] == model.get(condition.field)) {
                    return false;
                }
            }

            return true;
        },

        textSearch: function (model, condition) {
            var searchResults = this.searchIndex.search(condition.value);
            var filteredResult =
                _.find(searchResults, function (searchResult) {
                    return searchResult.ref === model.get('id');
                });

            return !_.isUndefined(filteredResult);
        }
    });
})(Backbone, Marionette);
var EntityCollection;
(function (_, Backbone, $, App, lunr, Filters) {
    var addIndexFields = function (indexFields) {
        for (var j = 0; j < indexFields.length; j++) {
            var indexField = indexFields[j];
            this.field(indexField.name);
        }

        this.ref('id');
    };

    var getOrCondition = function (model, leftConditions, rightConditions) {
        var left = this._predicate(model, leftConditions);
        var right = this._predicate(model, rightConditions);

        return left || right;
    };

    var getAndCondition = function (model, leftConditions, rightConditions) {
        var left = this._predicate(model, leftConditions);
        var right = this._predicate(model, rightConditions);

        return left && right;
    };

    EntityCollection = Backbone.EntityCollection = Backbone.Collection.extend({
        defaults: {
            currentPage: 0
        },
        initialize: function () {
            this._filters = this.getFilters();
        },
        baseUrl: function () {
            return _.isUndefined(App.API_URL) ? '' : App.API_URL;
        },
        setAttributes: function (model, data) {

        },
        getHeaders: function () {
            return {};
        },
        getFilters: function () {
            return new Filters();
        },
        /**
         * Description
         * @method addModelsToCollection
         * @param {} models
         * @return
         */
        addRange: function (models, data) {

            if (_.isNull(models)) {
                return [];
            }

            var range = [],
                numOfResults = models.length;

            for (var i = numOfResults; i--;) {
                var currentModel = this.get(models[i].id);

                if (!_.isUndefined(currentModel)) {
                    range.push(currentModel);
                    continue;
                }

                var model = new this.model(models[i]);
                model.url = this.getUrl(data);

                this.setAttributes(model, data);

                this.add(model);
                range.push(model);

                if (!_.isUndefined(this.indexFields)) {
                    if (_.isUndefined(this.searchIndex)) {
                        this.searchIndex =
                            lunr(addIndexFields(this.indexFields));
                    }

                    var indexObject = {};
                    for (var j = 0; j < this.indexFields.length; j++) {
                        var indexField = this.indexFields[j];
                        indexObject[indexField.name] = model.get(indexField.name);
                        indexObject.id = model.get('id');
                    }

                    this.searchIndex.add(indexObject);
                }
            }

            return range;
        },
        _addModelIndexes: function (key, models, data, count) {
            var modelIds = _.pluck(models, 'id');

            if (_.isUndefined(App.indexes)) {
                App.indexes = {};
            }

            if (_.isUndefined(App.indexes[key]) && _.isNumber(count)) {
                console.log('setting index key ' + key);
                App.indexes[key] = count;
            }

            _.each(models, function (model) {
                if (_.isUndefined(model.indexes)) {
                    model.indexes = {};
                }

                var currentIndex = modelIds.indexOf(model.id);

                if ((!_.isUndefined(data.params) && data.params.page && data.params.pageSize) || (data.page && data.pageSize)) {
                    var page = null,
                        pageSize = null;

                    if (data.params) {
                        page = data.params.page;
                        pageSize = data.params.pageSize;
                    } else {
                        page = data.page;
                        pageSize = data.pageSize;
                    }

                    var startingIndex = (page - 1) * pageSize;
                    currentIndex = currentIndex + startingIndex;
                }

                model.indexes[key] = currentIndex;
            });
        },
        /**
         * Description
         * @method fetch
         * @return CallExpression
         */
        fetch: function (track, data) {
            if (_.isUndefined(data)) {
                data = {};
            }

            var self = this,
                params = data.params,
                url = this.getUrl(data, true);

            if (track) {
                var cachedDeferred = window.getCache(url);
                if (!_.isUndefined(cachedDeferred)) {
                    return cachedDeferred;
                }
            }

            /**
             * Description
             * @method getCollection
             * @return result
             */
            var getCollection =
                new $.Deferred(function (defer) {
                    var result = $.ajax({
                        type: 'GET',
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        headers: self.getHeaders(),
                        /**
                         * Description
                         * @method success
                         * @param {} response
                         * @return
                         */
                        success: function (response) {
                            var entities = [],
                                isArray = response instanceof Array;

                            if (!isArray) {
                                entities = response.entities;
                            } else {
                                entities = response;
                            }

                            var models = self.addRange(entities);
                            self._addModelIndexes(url, models, data, parseInt(response.count));

                            var result;
                            if (track) {
                                result = self._getSubCollection(data, url);

                                result.child.on('remove', function (removedModel) {
                                    self._alignIndexes(removedModel, url);
                                    App.indexes[url]--;
                                });

                                result.child.on('add', function () {
                                    App.indexes[url]++;
                                });

                                defer.resolve(result, url);
                            } else {
                                result = new Backbone.Collection(models);

                                result.on('remove', function (removedModel) {
                                    self._alignIndexes(removedModel, url);
                                    App.indexes[url]--;
                                });

                                result.on('add', function () {
                                    App.indexes[url]++;
                                });

                                defer.resolve(result, url);
                            }
                        },
                        /**
                         * Description
                         * @method error
                         * @param {} errorResponse
                         * @return
                         */
                        error: function (errorResponse) {
                            console.log("Inside Failure");
                            console.log(errorResponse.responseText);
                        }
                    });

                    return result;
                });

            if (track) {
                App.setCache(url, getCollection);
            }

            return getCollection;
        },
        _alignIndexes: function (removedModel, key) {
            var index = removedModel.indexes[key];

            if (_.isUndefined(index)) {
                return;
            }

            index++;
            var models =
                this.filter(function (entity) {
                    var entityIndex = entity.indexes[key];
                    return !_.isUndefined(entityIndex) && entityIndex >= index;
                });

            _.each(models, function (model) {
                model.indexes[key]--;
            });
        },
        _getKeyWithOutPage: function (data) {
            var dataCopy = _.extend({}, data);
            if ((!_.isUndefined(data.params) && data.params.page && data.params.pageSize) || (data.page && data.pageSize)) {
                if (data.params) {
                    delete dataCopy.params.page;
                    delete dataCopy.params.pageSize;
                } else {
                    delete dataCopy.page;
                    delete dataCopy.pageSize;
                }
            }

            return this._getQueryKey(dataCopy);
        },
        /**
         * Description
         * @method fetch
         * @return CallExpression
         */
        query: function (track, data, force) {
            if (_.isUndefined(data)) {
                data = {};
            }

            var self = this,
                url = this.getUrl(data, false) + '/query';

            var key = this._getQueryKey(data),
                pageKey = this._getKeyWithOutPage(data);

            if (_.isUndefined(force) || (!_.isUndefined(force) && !force)) {
                var cachedDeferred = App.getCache(key);
                if (!_.isUndefined(cachedDeferred)) {
                    return cachedDeferred;
                }
            }

            if (data && data.conditions) {
                //make sure we turn arrays into comma delimited string
                for (var i = data.conditions.length; i--;) {
                    if (data.conditions[i].value instanceof Array) {
                        data.conditions[i].value = data.conditions[i].value.toString();
                    }
                }
            }

            var queryData = JSON.parse(JSON.stringify(data)),
                indexes = [];

            _.each(queryData.conditions, function (condition) {
                if (condition.excludeFromQuery) {
                    var index = queryData.conditions.indexOf(condition);
                    indexes.push(index);
                }
            });

            queryData.conditions = _.filter(queryData.conditions, function (condition) {
                var index = queryData.conditions.indexOf(condition);
                return indexes.indexOf(index) === -1;
            });

            /**
             * Description
             * @method getCollection
             * @return result
             */
            var getCollection =
                new $.Deferred(function (defer) {
                    var result = $.ajax({
                        type: 'POST',
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(queryData),
                        headers: self.getHeaders(),
                        /**
                         * Description
                         * @method success
                         * @param {} response
                         * @return
                         */
                        success: function (response) {
                            var entities = [],
                                isArray = response instanceof Array;

                            if (!isArray) {
                                entities = response.entities;
                            } else {
                                entities = response;
                            }

                            var models = self.addRange(entities, data);
                            self._addModelIndexes(pageKey, models, data, parseInt(response.count));

                            var result;
                            if (track) {
                                result = self._getSubCollection(data, pageKey);

                                result.child.on('add', function () {
                                    App.indexes[pageKey]++;
                                });

                                result.child.on('remove', function (removedModel) {
                                    self._alignIndexes(removedModel, pageKey);
                                    App.indexes[pageKey]--;
                                });

                                defer.resolve(result, pageKey);
                            } else {
                                result = new Backbone.Collection(models);

                                result.on('add', function () {
                                    App.indexes[pageKey]++;
                                });

                                result.on('remove', function (removedModel) {
                                    self._alignIndexes(removedModel, pageKey);
                                    App.indexes[pageKey]--;
                                });

                                defer.resolve(result, pageKey);
                            }
                        },
                        /**
                         * Description
                         * @method error
                         * @param {} errorResponse
                         * @return
                         */
                        error: function (errorResponse) {
                            console.log("Inside Failure");
                            console.log(errorResponse.responseText);
                        }
                    });

                    return result;
                });


            if (_.isUndefined(force) || (!_.isUndefined(force) && !force)) {
                App.setCache(key, getCollection);
            }

            return getCollection;
        },
        /**
         * Description
         * @method getSubCollection
         * @param {} id
         * @param {} includeEntity
         * @return MemberExpression
         */
        _getSubCollection: function (data, key) {
            var self = this,
                conditionals = [];

            if (data.conditions) {
                //get the filter from the _filters object by name and set the criterion so
                //backbone.subcollection knows how to filter the collection.
                for (var i = 0; i < data.conditions.length; i++) {
                    var currentCondition = data.conditions[i];
                    currentCondition.criterion = this._filters[currentCondition.searchType];
                }

                if (_.isUndefined(data.groupJoins)) {
                    _.each(data.conditions, function (condition) {
                        conditionals.push(condition);
                    });
                } else {

                    var index = 0;
                    _.each(data.groupJoins, function (groupJoin) {
                        if (parseInt(groupJoin)) {
                            index++;
                            return;
                        }

                        var leftConditions =
                            _.pluck(_.filter(data.conditions, function (condition) {
                                return condition.group == data.groupJoins[index - 1];
                            }), 'criterion');

                        var rightConditions =
                            _.pluck(_.filter(data.conditions, function (condition) {
                                return condition.group == data.groupJoins[index + 1];
                            }), 'criterion');

                        if (groupJoin === 'or') {
                            conditionals.push(getOrCondition(model, leftConditions, rightConditions));
                        }

                        if (groupJoin === 'and') {
                            conditionals.push(getAndCondition(model, leftConditions, rightConditions));
                        }

                        index++;
                    });
                }
            }

            var collection = new Backbone.CollectionSubset({
                parent: self,
                /**
                 * Description
                 * @method filter
                 * @param {} model
                 * @return boolean
                 */
                filter: function (model) {
                    return self._predicate(model, conditionals);
                }
            });

            if (!_.isUndefined(data.params) && data.params.page && data.params.pageSize) {
                collection.child.currentPage = data.params.page;
            }

            if ((!_.isUndefined(data.params) && data.params.page && data.params.pageSize) || (data.page && data.pageSize)) {
                var page = null,
                    pageSize = null;

                if (data.params) {
                    page = data.params.page;
                    pageSize = data.params.pageSize;
                } else {
                    page = data.page;
                    pageSize = data.pageSize;
                }

                var pagingFilter =
                    function (model) {
                        var firstResult = (page - 1) * App.pageSize,
                            maxResults = firstResult + App.pageSize;

                        if (_.isUndefined(model.indexes)) {
                            model.indexes = {};
                        }

                        var index = model.indexes[key];

                        if (_.isUndefined(index)) {
                            index = collection.child.length - 1;
                            model.indexes[key] = index;
                        }

                        return index >= firstResult && index <= maxResults - 1;
                    };


                var pagedCollection = new Backbone.CollectionSubset({
                    parent: collection.child,
                    /**
                     * Description
                     * @method filter
                     * @param {} model
                     * @return boolean
                     */
                    filter: function (model) {
                        return pagingFilter(model);
                    }
                });

                return pagedCollection;
            }

            return collection;
        },
        _predicate: function (model, conditionals) {
            for (var i = 0; i < conditionals.length; i++) {
                var criterion = _.bind(conditionals[i].criterion, this);
                if ((_.isUndefined(criterion) && !conditionals[i](model)) || (!_.isUndefined(criterion) && !criterion(model, conditionals[i]))) {
                    return false;
                }
            }

            return true;
        },
        /**
         * The get url method is designed to create urls
         * with the variable name followed by its value separated by forward slashes (ex. /page/1/pageSize/10)
         *
         * @method getUrl
         * @return string
         */
        getUrl: function (data, appendPath) {
            var relativePath = '';

            if (data && appendPath) {
                for (var key in data) {
                    if (key === 'params' || key === 'conditions') {
                        continue;
                    }

                    var value = '';
                    if (data[key] instanceof Array) {
                        value = data[key].toString();
                    } else {
                        value = data[key];
                    }

                    relativePath = relativePath + '/' + key + '/' + value;
                }
            }

            return (!_.isUndefined(this.baseUrl) ? this.baseUrl() : "") +
                (_.isFunction(this.url) ? this.url(data) : this.url) +
                relativePath;
        },
        _getQueryKey: function (data) {
            var conditions = data.conditions,
                groupJoins = data.groupJoins;

            var key = this.getUrl(data) + '/query';
            if (data.page && data.pageSize) {
                key = key + '/page/' + data.page + '/pageSize/' + data.pageSize;
            }

            if (groupJoins) {
                key = key + '/groupJoins/' + groupJoins.toString();
            }

            _.each(conditions, function (condition) {
                key = key + '/searchType/' + condition.searchType;
                key = key + '/field/' + condition.field;
                key = key + '/value/' + condition.value;

                if (condition.junction) {
                    key = key + '/junction/' + condition.junction;
                }

                if (condition.group) {
                    key = key + '/group/' + condition.group;
                } else {
                    key = key + '/group/' + 0;
                }
            });

            return key;
        },
        /**
         * Description
         * @method deleteByIds
         * @param {} ids
         * @return CallExpression
         */
        deleteByIds: function (ids) {
            var url = this.getUrl({ids: ids}),
                self = this;

            /**
             * Description
             * @method deleteModels
             * @return result
             */
            var deleteModels = function () {
                var result = $.ajax({
                    type: 'DELETE',
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    headers: self.getHeaders(),
                    /**
                     * Description
                     * @method success
                     * @param {} response
                     * @return
                     */
                    success: function (response) {
                        if (response) {
                            _.each(ids, function (id) {
                                self.remove(id);
                            });
                        }
                    },
                    /**
                     * Description
                     * @method error
                     * @param {} errorResponse
                     * @return
                     */
                    error: function (errorResponse) {
                        console.log("Inside Failure");
                        console.log(errorResponse.responseText);
                    }
                });

                return result;
            };

            return deleteModels();
        },
        /**
         * Description
         * @method getById
         * @param {} id
         * @return CallExpression
         */
        getById: function (id, async) {
            var self = this;

            if (_.isUndefined(async)) {
                async = true;
            }

            var deferred =
                $.Deferred(function (defer) {
                    var entity = self.get(id);

                    if (_.isUndefined(entity)) {
                        entity = new self.model({id: id});
                        entity.setUrl(self.getUrl());

                        entity.fetch({
                                url: entity.url + '/' + id,
                                async: async,
                                headers: self.getHeaders()
                            })
                            .done(function () {
                                self.add(entity);
                                defer.resolve(entity);
                            });
                    } else {
                        defer.resolve(entity);
                    }
                });

            return deferred;
        }
    });
})(_, Backbone, jQuery, App, lunr, EntityFilters);

var HierarchicalEntityCollection;
(function (_, Backbone, $, App, UriUtil, EntityCollection) {
    /**
     * This collection is used for hierarchical entites
     *
     * @class HierarchicalEntityCollection
     * @type {Backbone.CollectionSubset.extend|*|dst|target|Object|a}
     */
    HierarchicalEntityCollection = Backbone.HierarchicalEntityCollection = EntityCollection.extend({
        /**
         * Description
         * @method getChildren
         * @param {} parentId
         * @param {} limit
         * @return CallExpression
         */
        getChildren: function (parentId, limit, includeEntity) {
            var outerScope = this,
                data = {parentId: parentId, limit: limit},
                url = this.getUrl(),
                key = url + UriUtil.getUriHash(data);

            var cachedDeferred = App.getCache(key);
            if (!_.isUndefined(cachedDeferred)) {
                return cachedDeferred;
            }

            /**
             * Description
             * @method getCollection
             * @return result
             */
            var getCollection = $.Deferred(function (defer) {
                var result = $.ajax({
                    type: 'GET',
                    url: url + '/GetChildren',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: data,
                    /**
                     * Description
                     * @method success
                     * @param {} response
                     * @return
                     */
                    success: function (response) {
                        outerScope.addRange(response);
                        defer.resolve(outerScope.getChildrenCollection(parentId, includeEntity));
                    },
                    /**
                     * Description
                     * @method error
                     * @param {} errorResponse
                     * @return
                     */
                    error: function (errorResponse) {
                        console.log("Inside Failure");
                        console.log(errorResponse.responseText);
                        defer.reject();
                    }
                });

                return result;
            });

            App.setCache(key, getCollection);
            return getCollection;
        },
        /**
         * Description
         * @method getParents
         * @param {} id
         * @param {} limit
         * @param {} includeEntity
         * @return CallExpression
         */
        getParents: function (id, limit, includeEntity) {
            var outerScope = this,
                url = this.getUrl() + '/GetParents',
                data = {id: id, limit: limit},
                key = url + UriUtil.getUriHash(data);

            var cachedDeferred = App.getCache(key);
            if (!_.isUndefined(cachedDeferred)) {
                return cachedDeferred;
            }

            var getCollection = $.Deferred(function (defer) {
                var result = $.ajax({
                    type: 'GET',
                    url: url,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    /**
                     * Description
                     * @method success
                     * @param {} response
                     * @return
                     */
                    success: function (response) {
                        outerScope.addRange(response);
                        defer.resolve(outerScope.getParentsCollection(id, includeEntity));
                    },
                    /**
                     * Description
                     * @method error
                     * @param {} errorResponse
                     * @return
                     */
                    error: function (errorResponse) {
                        console.log("Inside Failure");
                        console.log(errorResponse.responseText);
                        defer.reject();
                    }
                });

                return result;
            });

            App.setCache(key, getCollection);
            return getCollection;
        },
        /**
         * Description
         * @method getParentIds
         * @param {} entity
         * @return uniqueParentIds
         */
        getParentIds: function (entity) {
            var currentParentIds = entity.get('parentIds'),
                allParentIds = [],
                collectionContext = this;

            allParentIds = allParentIds.concat(currentParentIds);

            _.each(currentParentIds, function (parentId) {
                var parentEntity = collectionContext.get(parentId);

                if (parentEntity.get('parentIds').length > 0) {
                    allParentIds.concat(collectionContext.getParents(parentEntity));
                }
            });

            var uniqueParentIds = _.uniq(allParentIds, function (item, key, a) {
                return item;
            });

            return uniqueParentIds;
        },
        getChildrenIds: function (entity) {
            var children = this.filter(function (profile) {
                return profile.get('parentIds').indexOf(entity.get('id')) > -1;
            });

            return _.pluck(children, 'id');
        },
        /**
         * Description
         * @method getParentsCollection
         * @param {} id
         * @param {} includeEntity
         * @return MemberExpression
         */
        getParentsCollection: function (id, includeEntity) {
            var collectionContext = this,
                entity = this.get(id);

            var parentIds = this.getParentIds(entity);

            if (includeEntity) {
                parentIds.push(id);
            }

            var collection = new Backbone.CollectionSubset({
                parent: collectionContext,
                /**
                 * Description
                 * @method filter
                 * @param {} node
                 * @return BinaryExpression
                 */
                filter: function (node) {
                    var modelId = node.get('id');
                    return parentIds.indexOf(modelId) > -1;
                }
            });

            return collection.child;
        },
        /**
         * Description
         * @method getChildrenCollection
         * @param {} id
         * @param {} includeEntity
         * @return MemberExpression
         */
        getChildrenCollection: function (id, includeEntity) {
            var collectionContext = this,
                entity = this.get(id);

            var childrenIds = this.getChildrenIds(entity);

            if (includeEntity) {
                childrenIds.push(id);
            }

            var collection = new Backbone.CollectionSubset({
                parent: collectionContext,
                /**
                 * Description
                 * @method filter
                 * @param {} node
                 * @return BinaryExpression
                 */
                filter: function (node) {
                    var modelId = node.get('id');
                    return childrenIds.indexOf(modelId) > -1;
                }
            });

            return collection.child;
        },
        /**
         * Description
         * @method getTopLevel
         * @return CallExpression
         */
        getTopLevel: function (track) {
            var outerScope = this,
                url = this.getUrl() + '/GetTopLevel';

            /**
             * Description
             * @method getCollection
             * @return result
             */
            var getCollection = $.Deferred(function (defer) {
                var result = $.ajax({
                    type: 'GET',
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    /**
                     * Description
                     * @method success
                     * @param {} response
                     * @return
                     */
                    success: function (response) {
                        var models = outerScope.addRange(response);

                        if (track) {
                            defer.resolve(outerScope._getSubCollection(response));
                        } else {
                            defer.resolve(new Backbone.Collection(models));
                        }
                    },
                    /**
                     * Description
                     * @method error
                     * @param {} errorResponse
                     * @return
                     */
                    error: function (errorResponse) {
                        console.log("Inside Failure");
                        console.log(errorResponse.responseText);
                    }
                });

                return result;
            });

            return App.getCache(url, getCollection);
        }
    });
})(_, Backbone, jQuery, App, UriUtil, EntityCollection);

var MessagesCollection;
(function ($, _, Backbone, Marionette, App, MessageModel) {
    /**
     * @class MessagesCollection
     * @type {Backbone.CollectionSubset.extend|*|dst|target|Object|a}
     */
    MessagesCollection = Backbone.Collection.extend({
        defaults: {
            model: MessageModel
        },
        /**
         * Description
         * @method setMessages
         * @param {} messages
         * @return
         */
        setMessages: function (messages) {
            var outerScope = this;
            this.reset();
            _.each(messages, function (message) {
                var messageModel = new MessageModel({message: message});
                outerScope.add(messageModel);
            });
        }
    });
})(jQuery, _, Backbone, Marionette, App, MessageModel);
/**
 * Created by ssinno on 12/2/13.
 */

var EntityRouter;
(function ($, _, Backbone, Marionette) {
    EntityRouter = Marionette.EntityRouter = Backbone.Marionette.AppRouter.extend({
        onRoute: function (name, path) {
            if (_.isFunction(this.options.controller.onActionExecuting)) {
                this.options.controller.onActionExecuting(name, path, arguments);
            }
        },
        //Root path for all routes defined by this router. Override this in a deriving
        //class for keeping route table DRY.
        urlRoot: undefined,

        //override the route method to prefix the route URL
        route: function (route, name, callback) {
            if (this.urlRoot) {
                route = (route === '' ? this.urlRoot : this.urlRoot + "/" + route);
            }

            //define route
            Backbone.Router.prototype.route.call(this, route, name, callback);

            //also support URLs with trailing slashes
            Backbone.Router.prototype.route.call(this, route + "/", name, callback);
        },
        appRoutes: {
            'create/*actions': 'create',
            'edit/:id/*actions': 'edit',
            ':page/*actions': 'getType',
            'startsWith/:startsWith/field/:field/*actions': 'textSearch'
        }
    });
})(jQuery, _, Backbone, Marionette);
var MessageView;
(function ($, _, Backbone, Marionette, MessageModel, messageTemplate) {
    MessageView = Marionette.MessageView = Backbone.Marionette.View.extend({
        model: MessageModel,
        tagName: 'li',
        template: messageTemplate
    });
})(jQuery, _, Backbone, Marionette, MessageModel, this['Templates']['messageTemplate']);

var MessageListView;
(function ($, _, Backbone, Marionette, MessageView, MessagesCollection) {
    MessageListView = Backbone.Marionette.CollectionView.extend({
        tagName: 'ul',
        childView: MessageView,
        collection: MessagesCollection
    });

})(jQuery, _, Backbone, Marionette, MessageView, MessagesCollection);
var BaseValidationView;
(function ($, _, Backbone, Marionette, ValidationModel, validationTemplate, MessageCollection, MessageListView) {
    BaseValidationView = Marionette.BaseValidationView = Backbone.Marionette.View.extend({
        tagName: 'div',
        template: validationTemplate,
        regions: {
            validationMessages: '.validationMessages'
        },
        onRender: function () {
            this.$el.attr('data-alert', '');
            var messageCollection = new MessageCollection();
            messageCollection.setMessages(this.options);

            this.showChildView('validationMessages', new MessageListView({collection: messageCollection}));
        }
    });

})(jQuery, _, Backbone, Marionette, ValidationModel, this['Templates']['validationTemplate'], MessagesCollection, MessageListView);

var ErrorView;
(function ($, _, Backbone, Marionette) {
    ErrorView = Marionette.BaseValidationView.extend({
        className: 'alert alert-danger alert-dismissable',
        templateContext: {
            iconClass: 'pficon-error-circle-o'
        }
    });
})(jQuery, _, Backbone, Marionette);

var InfoView;
(function ($, _, Backbone, Marionette) {
    InfoView = Marionette.BaseValidationView.extend({
        className: 'alert alert-info alert-dismissable',
        templateContext: {
            iconClass: 'pficon-info'
        }
    });
})(jQuery, _, Backbone, Marionette);
var SuccessView;
(function ($, _, Backbone, Marionette) {
    SuccessView = Marionette.BaseValidationView.extend({
        className: 'alert alert-success alert-dismissable',
        templateContext: {
            iconClass: 'pficon-ok'
        }
    });

})(jQuery, _, Backbone, Marionette);

var WarningView;
(function ($, _, Backbone, Marionette) {
    WarningView = Marionette.BaseValidationView.extend({
        className: 'alert alert-warning alert-dismissable',
        templateContext: {
            iconClass: 'pficon-warning-triangle-o'
        }
    });
})(jQuery, _, Backbone, Marionette);

var ReusableTypeLayoutView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeLayoutView = Marionette.ReusableTypeLayoutView = Backbone.Marionette.View.extend({
        initialize: function (options) {
            _.extend(this, options);

            this._channel = Backbone.Radio.channel(this.dataField);
            this.on('destroy', this._destroyRadio);
        },
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField
            };
        },
        getChannel: function () {
            return this._channel;
        },
        _destroyRadio: function () {
            this._channel.stopReplying(null, null, this);
        }
    });
})(jQuery, _, Backbone, Marionette);

var ReusableTypeListView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeListView = Marionette.ReusableTypeListView = Backbone.Marionette.CollectionView.extend({
        initialize: function (options) {
            _.extend(this, options);

            var channel = this._channel = Backbone.Radio.channel(this.dataField);
            this.on('destroy', this._destroyRadio);
        },
        childViewOptions: function () {
            var self = this;
            return {
                dataField: self.dataField,
                selectedId: self.selectedId
            };
        },
        getChannel: function () {
            return this._channel;
        },
        _destroyRadio: function _destroyRadio() {
            this._channel.stopReplying(null, null, this);
        }
    });
})(jQuery, _, Backbone, Marionette);

var ReusableTypeView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeView = Marionette.ReusableTypeView = Backbone.Marionette.View.extend({
        initialize: function (options) {
            _.extend(this, options);
            var channel = this._channel = Backbone.Radio.channel(this.dataField);

            this.isSelected();
            this.on('destroy', this._destroyRadio);
        },
        isSelected: function () {
            this.checked = "";
            if (_.isUndefined(this.selectedId)) {
                if (!_.isUndefined(this.model.get('value')) && this.model.get('value') === true) {
                    this.checked = "checked";
                }

                return;
            }

            var id = this.model.get('id');
            if ((isNaN(this.selectedId) && this.selectedId.indexOf(id) > -1) || id === parseInt(this.selectedId)) {
                this.checked = "checked";
            }
        },
        template: function () {
            return _.template('<script id="empty-template" type="text/template"></script>');
        },
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField,
                checked: self.checked
            };
        },
        getChannel: function () {
            return this._channel;
        },
        _destroyRadio: function _destroyRadio() {
            this._channel.stopReplying(null, null, this);
        }
    });

})(jQuery, _, Backbone, Marionette);

var WyswigView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, wyswigTextTemplate, CKEDITOR) {
    WyswigView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            var value = this.model.get('value'),
                $hiddenDiv = $('<div></div>'),
                html = $hiddenDiv.html(value),
                imgs = $(html).find('img'),
                self = this;

            _.each(imgs, function (img) {
                var $img = $(img),
                    src = $img.attr('src');

                if (self.isPathAbsolute(src)) {
                    return;
                }

                src = App.API_URL + src;
                $img.attr('src', src);
            });

            this.model.set({ value: $hiddenDiv.html() });
        },
        tag: 'input',
        ui: {
            $editor: '.editor'
        },
        onDomRefresh: function () {
            var self = this;

            CKEDITOR.replace(self.dataField, {
                filebrowserBrowseUrl: App.FILE_BROWSER_URL
            });
        },
        template: wyswigTextTemplate,
        isPathAbsolute: function (path) {
            return /^https?:\/\//i.test(path);
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['wyswigTemplate'], CKEDITOR);

var SortableItemView;
(function ($, _, Backbone, Marionette) {
    SortableItemView = Marionette.SortableItemView = Marionette.View.extend({
        tagName: "li",
        attributes: {
            "draggable": true
        },
        events: {
            "dragstart": "start",
            "dragenter": "enter",
            "dragleave": "leave",
            "dragend": "leave",
            "dragover": "over",
            "drop": "drop"
        },
        initialize: function (options) {
            _.extend(this, options);
        },
        onRender: function () {
            this.$el.data('id', this.model.get('id'));
        },
        start: function (e) {
            this.parent.draggedModel = this.model;
            if (e.originalEvent) e = e.originalEvent;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.dropEffect = "move";
            e.dataTransfer.setData('text', "Drag");
        },
        enter: function (e) {
            e.preventDefault();
            this.$el.addClass(this.overClass);
        },
        leave: function (e) {
            e.preventDefault();
            this.$el.removeClass(this.overClass);
        },
        over: function (e) {
            e.preventDefault();
            return false;
        },
        drop: function (e) {
            e.preventDefault();
            this.leave(e);

            var $target = $(e.target),
                currentModelId = $target.data('id'),
                collection = this.model.collection,
                currentModel = collection.get(currentModelId);

            this.getChannel().trigger('item:dropped', this.parent.draggedModel, currentModel);
        },
        getChannel: function () {
            return Backbone.Radio.channel(this.route);
        }
    });
})(jQuery, _, Backbone, Marionette);
var SortableCollectionView;
(function ($, _, Backbone, Marionette, SortableItemView) {
    SortableCollectionView = Marionette.SortableCollectionView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'sortable-view',
        childView: SortableItemView,
        overClass: 'over',
        initialize: function (options) {
            _.extend(this, options);

            this.getChannel().on('item:dropped', _.bind(this.setPlacement, this));
            this.setComparator();
        },
        setPlacement: function (draggedModel, overModel) {
            var placementOverModelIndex = _.indexOf(_.pluck(this.placement, 'id'), overModel.get('id')),
                placementDraggedModelIndex = _.indexOf(_.pluck(this.placement, 'id'), draggedModel.get('id'));

            var draggedModelPlacment = this.placement[placementDraggedModelIndex].placement,
                overModelPlacement = this.placement[placementOverModelIndex].placement;

            var placement;
            if (draggedModelPlacment < overModelPlacement) {
                for (var j = 0; j < this.placement.length; j++) {
                    placement = this.placement[j].placement;
                    if (placement <= overModelPlacement) {
                        this.placement[j].placement--;
                    }
                }

                this.placement[placementDraggedModelIndex].placement = overModelPlacement;
            } else if (draggedModelPlacment > overModelPlacement) {
                for (var i = 0; i < this.placement.length; i++) {
                    placement = this.placement[i].placement;
                    if (placement >= overModelPlacement) {
                        this.placement[i].placement++;
                    }
                }

                this.placement[placementDraggedModelIndex].placement = overModelPlacement;
            }


            this.setComparator();
        },
        setComparator: function () {
            var self = this;

            this.collection.comparator =
                function (model) {
                    var item =
                        _.find(self.placement, function (index) {
                            return index.id === model.get('id');
                        });

                    if (!_.isUndefined(item)) {
                        return item.placement;
                    }

                    return 0;
                };

            this.collection.sort();
        },
        buildChildView: function (item, ItemViewType, itemViewOptions) {
            var options = _.extend({
                    model: item,
                    overClass: this.overClass,
                    parent: this,
                    route: this.route
                },
                itemViewOptions);

            return new ItemViewType(options);
        },
        appendHtml: function (collectionView, itemView, index) {
            var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
            var children = childrenContainer.children();
            if (children.size() <= index) {
                childrenContainer.append(itemView.el);
            } else {
                childrenContainer.children().eq(index).before(itemView.el);
            }
        },
        getChannel: function () {
            return Backbone.Radio.channel(this.route);
        }
    });
})(jQuery, _, Backbone, Marionette, SortableItemView);
var SingleLineTextView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, singleLineTextTpl) {
    SingleLineTextView = ReusableTypeLayoutView.extend({
        tag: 'input',
        template:singleLineTextTpl
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['singleLineTextTemplate']);

var NumberView;
(function ($, _, Backbone, Marionette, SingleLineTextView) {
    NumberView = SingleLineTextView.extend({});
})(jQuery, _, Backbone, Marionette, SingleLineTextView);
var TextAreaView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, textAreaTemplate) {
    TextAreaView = ReusableTypeLayoutView.extend({
        template: textAreaTemplate
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['textAreaTemplate']);

var RadioButtonView;
(function ($, _, Backbone, Marionette, radioButtonTemplate, ReusableTypeView) {
    RadioButtonView = ReusableTypeView.extend({
        tagName: 'div',
        className: 'col-sm-6',
        template: radioButtonTemplate
    });

})(jQuery, _, Backbone, Marionette, this['Templates']['radioButtonTemplate'], ReusableTypeView);

var RadioButtonListView;
(function ($, _, Backbone, Marionette, RadioButtonView, ReusableTypeListView) {
    RadioButtonListView = ReusableTypeListView.extend({
        childView: RadioButtonView
    });
})(jQuery, _, Backbone, Marionette, RadioButtonView, ReusableTypeListView);


var PagerItemView;
(function ($, _, Backbone, Marionette, pagerItemTemplate) {
    PagerItemView = Marionette.View.extend({
        template: pagerItemTemplate,
        tagName: 'li',
        className: function () {
            var isCurrent = this.model.get('currentPage'),
                current = '';

            if (isCurrent) {
                current = 'current';
            }

            return current;
        }
    });

})($, _, Backbone, Marionette, this['Templates']['pagerItemTemplate']);

var PagerListView;
(function ($, _, Backbone, Marionette, PagerItemView) {
    PagerListView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'pagination',
        initialize: function (options) {
            _.extend(this, options);
        },
        childView: PagerItemView,
        events: {
            'click li': 'updateCurrent'
        },
        ui: {
            '$pagerItems': 'li'
        },
        updateCurrent: function (e) {
            e.preventDefault();

            var $target = $(e.target),
                channel = this.getChannel();

            this.$el.find('li').removeClass('current');
            $target.parent().addClass('current');

            channel.trigger('page:changed:' + this.parentViewCid, e);

            if (this.options.routing) {
                location.hash = $target.attr('href');
            } else {
                channel.trigger('getAll', $target.data('number'));
            }
        },
        getChannel: function () {
            return Backbone.Radio.channel(this.route);
        }
    });
})(jQuery, _, Backbone, Marionette, PagerItemView);
var ImageFieldView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, imageFieldTemplate) {
    ImageFieldView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            $('[data-field="' + this.dataField + '"]').on('change', this.updateImageUrl);
        },
        template: imageFieldTemplate,
        ui: {
            '$image': '.uploadedImage'
        },
        updateImageUrl: function (localUrl) {
            var url = $('[data-field="' + this.dataField + '"]').val();

            if (url !== '') {
                this.ui.$image.attr('src', localUrl + url);
                this.ui.$image.parent().show();
            }
        },
        onDomRefresh: function () {
            this.updateImageUrl(App.API_URL + '/');
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['imageFieldTemplate']);

var OptionView;
(function ($, _, Backbone, Marionette, ReusableTypeView) {
    OptionView = ReusableTypeView.extend({
        tagName: 'option',
        onRender: function () {
            this.$el.val(this.model.get('id'));
            this.$el.text(this.model.get('name'));
        },
        onDomRefresh: function () {
            var dataField = this.dataField;
            if (this.model.get('id') === this.selectedId) {
                var $selector = $('select[data-field="' + dataField + '"]');
                $selector.val(this.model.get('id'));
            }
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeView);

var DropDownListView;
(function ($, _, Backbone, Marionette, OptionView, ReusableTypeListView) {
    DropDownListView = ReusableTypeListView.extend({
        childView: OptionView,
        tagName: 'select',
        className: 'combobox form-control',
        onRender: function (options) {
            var dataField = options.dataField;
            this.$el.attr('data-field', dataField);
        },
        onDomRefresh: function () {
            this.$el.combobox();
        }
    });
})($, _, Backbone, Marionette, OptionView, ReusableTypeListView);

var DateTimePickerView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, datePickerTemplate, moment) {
    DateTimePickerView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            var value = this.model.get('value'),
                timeFormat = !_.isUndefined(this.timeFormat) ? this.timeFormat : 'hh:mm:ss A',
                dateFormat = !_.isUndefined(this.dateFormat) ? this.dateFormat : 'MM/DD/YYYY',
                date = moment(value).format(dateFormat),
                time = moment(value).format(timeFormat);

            if (date !== 'Invalid date') {
                this.model.set({date: date});
            } else {
                this.model.set({date: ''});
            }

            if (time !== 'Invalid date') {
                this.model.set({time: time});
            } else {
                this.model.set({time: ''});
            }
        },
        ui: {
            $datePicker: '.bootstrap-datepicker',
            $timePicker: '.time-picker-pf input'
        },
        template: datePickerTemplate,
        onDomRefresh: function () {
            this.ui.$datePicker.datepicker()
                .on('changeDate', _.bind(function (e) {
                    this._channel.trigger('change:date:' + this.dataField, e);
                }, this));

            this.ui.$timePicker.datetimepicker({
                format: 'LT',
                keyBinds: {
                    enter: function () {
                        this.hide();
                    }
                }
            });

            var $date = this.$el.find('.date'),
                $time = this.$el.find('.time');

            if (this.dateType === 'Date') {
                $time.hide();
            } else if (this.dateType === 'Time') {
                $date.hide();
                $time.attr('style', 'float:left');
            }
        },
        show: function () {
            this.$el.datepicker('show');
        },
        hide: function () {
            this.$el.datepicker('hide');
        },
        update: function (value) {
            this.$el.datepicker('update', value);
        },
        getDateTime: function () {
            var $date = $('[data-field="' + this.dataField + '_date"]'),
                $time = $('[data-field="' + this.dataField + '_time"]');

            if (this.dateType === 'Date') {
                $date.val();
            } else if (this.dateType === 'Time') {
                $time.val();
            }

            return $date.val() + ' ' + $time.val();
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['datePickerTemplate'], moment);

var CheckBoxView;
(function ($, _, Backbone, Marionette, checkBoxTemplate, ReusableTypeView) {
    CheckBoxView = ReusableTypeView.extend({
        onShow: function () {
            if (!_.isUndefined(this.model.get('id'))) {
                this.$el.find('input').val(this.model.get('id'));
            }
        },
        tagName: 'div',
        className: 'col-sm-6',
        template: checkBoxTemplate,
        events: {
            'click input[type=checkbox]': 'itemChecked'
        },
        itemChecked: function (e) {
            this.getChannel().trigger(this.dataField + ':checked', this.model);
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['checkBoxTemplate'], ReusableTypeView);

var CheckBoxListView;
(function ($, _, Backbone, Marionette, CheckBoxView, ReusableTypeListView) {
    CheckBoxListView = ReusableTypeListView.extend({
        childView: CheckBoxView
    });
})(jQuery, _, Backbone, Marionette, CheckBoxView, ReusableTypeListView);

var AutoCompleteView;
(function ($, _, Backbone, Marionette, ReusableTypeListView, liAutoCompleteTemplate) {
    AutoCompleteView = Marionette.View.extend({
        tagName: 'li',
        template: liAutoCompleteTemplate
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeListView, this['Templates']['liAutoCompleteTemplate']);

var AutoCompleteListView;
(function ($, _, Backbone, Marionette, ReusableTypeListView, AutoCompleteView) {
    AutoCompleteListView = ReusableTypeListView.extend({
        className: 'dropdown-menu',
        tagName: 'ul',
        childView: AutoCompleteView,
        onRender: function () {
            this.$el.attr('id', this.dataField);
        },
        onDomRefresh: function () {
            this.getChannel().trigger('auto-complete:list:complete:' + this.dataField);
            this.$el.dropdown('toggle');
        },
        events: {
            'click .autocomplete-item': 'autoCompleteSelected'
        },
        autoCompleteSelected: function (e) {
            this.getChannel().trigger('auto-complete:selected:' + this.dataField, e);
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeListView, AutoCompleteView);
var AutoCompleteLayoutView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, autoCompleteTemplate, TimeoutUtil, AutoCompleteListView) {
    AutoCompleteLayoutView = ReusableTypeLayoutView.extend({
        tag: 'div',
        template: autoCompleteTemplate,
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.selectedId = options.selectedId;
            this.collection = options.collection;
            this._timeoutUtil = new TimeoutUtil();

            var channel = this.getChannel(this.dataField);
            channel.on('auto-complete:list:complete', _.bind(this.listingRetrieved, this));
            channel.on('auto-complete:selected', _.bind(this.entitySelected, this));
        },
        className: 'dropdown col-sm-12 nopadding',
        listingRetrieved: function () {
            this.ui.$ddLink.dropdown('toggle');
            var setSelectedEntity = _.bind(this.setSelectedEntity, this);

            $('html').on('click', function (e) {
                $(this).off('click');
                setSelectedEntity();
            });
        },
        entitySelected: function (e) {
            e.stopPropagation();
            e.preventDefault();

            var $target = $(e.target);
            this.ui.$selectedId.val($target.data('id'));
            this.ui.$valueText.val($target.html());

            this.getRegion('dropDownRegion').reset();

            $('html').off('click');
        },
        setSelectedEntity: function () {
            var $valueText = this.ui.$valueText,
                id = this.ui.$selectedId.val();

            if (_.isNull(id) || _.isUndefined(id) || id === '') {
                this.ui.$valueText.val('');
                this.getRegion('dropDownRegion').reset();
                return;
            }

            this.collection.getById(id)
                .done(_.bind(function (entity) {
                    this.getRegion('dropDownRegion').reset();
                    $valueText.val(entity.get('name'));
                }, this));
        },
        ui: {
            '$valueText': '.valueText',
            '$selectedId': '.selectedId',
            '$ddLink': '.dropdown-menu'
        },
        regions: {
            'dropDownRegion': '.dropDownRegion'
        },
        events: {
            'keyup .valueText': 'getEntities'
        },
        getEntities: function (e) {
            var $target = $(e.target),
                name = $target.val(),
                self = this;

            if (name.length < 2) {
                return;
            }

            this._timeoutUtil.suspendOperation(400,
                function () {
                    var data = {
                        conditions: [
                            {
                                searchType: 'like',
                                field: 'name',
                                value: name
                            }
                        ]
                    };

                    self.collection.query(false, data)
                        .done(function (entities) {
                            if (entities.length > 0) {
                                var listView = new AutoCompleteListView({
                                    collection: entities,
                                    dataField: self.dataField,
                                    selectedId: self.selectedId
                                });

                                self.showChildView('dropDownRegion', listView);
                            } else {
                                self.getRegion('dropDownRegion').reset();
                            }
                        });
                });
        },
        onDomRefresh: function () {
            var self = this;

            if (!_.isNull(this.selectedId) && !_.isUndefined(this.selectedId)) {
                this.collection.getById(this.selectedId)
                    .done(function (entity) {
                        self.ui.$valueText.val(entity.get('name'));
                        self.ui.$selectedId.val(entity.get('id'));
                    });
            }
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['autoCompleteTemplate'], TimeoutUtil, AutoCompleteListView);

var MessageBehavior;
(function ($, _, Backbone, Marionette, SuccessView, ErrorView, InfoView) {
    MessageBehavior = Marionette.Behavior.extend({
        defaults: {
            duration: 3000
        },
        onShowMessages: function (type, messages) {
            switch (type) {
                case 'error':
                    this.view.showChildView('messagesRegion', new ErrorView(messages));
                    break;
                case 'success':
                    this.view.showChildView('messagesRegion', new SuccessView(messages));
                    break;
                case 'info':
                    this.view.showChildView('messagesRegion', new InfoView(messages));
                    break;
            }

            var view = this.view;
            setTimeout(function () {
                if (view.isDestroyed) {
                    return;
                }

                var messagesRegion = this.view.getRegion('messagesRegion');
                messagesRegion.$el.fadeOut("slow", function () {
                    if (view.isDestroyed) {
                        return;
                    }

                    messagesRegion.reset();
                });

            }, this.options.duration);
        }
    });
})(jQuery, _, Backbone, Marionette, SuccessView, ErrorView, InfoView);

var ConfirmModalBehavior;
(function ($, _, Backbone, Marionette) {
    ConfirmModalBehavior = Marionette.Behavior.extend({
        defaults: {
            message: "Are you sure you want to do this?",
            yesFunc: function (e) {
            },
            noFunc: function (e) {
            }
        },
        showWarningModal: function (e) {
            e.preventDefault();

            var $confirmModal = this.getModal();
            //update the message
            $confirmModal.find('.message').html(this.options.message);

            //show modal
            $confirmModal.modal('show');

            $confirmModal.on('click', '.no', _.bind(function (e) {
                e.preventDefault();
                _.bind(this.options.noFunc, this)(e);
                $confirmModal.modal('hide');
            }, this));

            $confirmModal.on('click', '.yes', _.bind(function (e) {
                e.preventDefault();
                _.bind(this.options.yesFunc, this)(e);
                $confirmModal.modal('hide');
            }, this));
        }
    });
})(jQuery, _, Backbone, Marionette);
var DeleteWarnBehavior;
(function ($, _, Backbone, Marionette, ConfirmModalBehavior) {
    DeleteWarnBehavior = ConfirmModalBehavior.extend({
        events: {
            "click .delete": "showWarningModal"
        },
        getModal: function () {
            return $('.deleteModal');
        }
    });
})(jQuery, _, Backbone, Marionette, ConfirmModalBehavior);
var PagerBehavior;
(function ($, _, Backbone, Marionette, App, PagerListView) {
    PagerBehavior = Marionette.Behavior.extend({
        onShowPager: function (entityCollection) {
            var pagerRegion = this.view.getRegion('pagerRegion');
            if (pagerRegion.currentView !== null) {
                pagerRegion.reset();
            }

            if (_.isUndefined(App.indexes)) {
                return;
            }

            var count = App.indexes[this.view.key],
                currentPage = this.view.listView.currentPage,
                collection = new Backbone.Collection(),
                noOfPages = Math.ceil(count / App.pageSize);

            if (noOfPages === 1) {
                pagerRegion.empty();
                if (this.view.routing) {
                    location.hash = '/' + this.view.route + '/' + 1 + '/' + this.view.additionalParams;
                }

                return;
            }

            for (var i = 1; i <= noOfPages; i++) {
                var pagerItem = new Backbone.Model(),
                    route = '/' + this.view.route + '/' + i + '/' + this.view.additionalParams;

                pagerItem.set({route: route, currentPage: i == currentPage, number: i});
                collection.add(pagerItem);
            }

            this.view.showChildView('pagerRegion', new PagerListView({
                collection: collection,
                parentViewCid: this.view.cid,
                routing: this.view.routing,
                route: this.view.route
            }));
        }
    });
})(jQuery, _, Backbone, Marionette, App, PagerListView);
var EntityListView;
(function ($, _, Backbone, Marionette) {
    EntityListView = Marionette.EntityListView = Backbone.Marionette.CollectionView.extend({
        className: 'col-sm-12',
        initialize: function (options) {
            _.extend(this, options);

            this._channel = Backbone.Radio.channel(this.route);
        },
        onDomRefresh: function () {
            this._channel.trigger('view.list.activated');
        },
        childViewOptions: function () {
            var route = this.route,
                allowableOperations = this.allowableOperations,
                collection = this.collection,
                baseClassIds = [];

            if (!_.isUndefined(this.options.baseClassIds)) {
                baseClassIds = this.options.baseClassIds;
            }

            return {
                route: route,
                allowableOperations: allowableOperations,
                collection: collection,
                baseClassIds: baseClassIds
            };
        },
        onAddChild: function (childView) {
            var indexOf = this.collection.indexOf(childView.model);
            if (indexOf === 0 && !_.isUndefined(this.getTableHeader)) {
                childView.$el.before(this.getTableHeader());
            }
        },
        getChannel: function () {
            return this._channel;
        }
    });
})(jQuery, _, Backbone, Marionette);

var EntityListItemView;
(function ($, _, Backbone, Marionette, entityListItemTemplate, DeleteWarnBehavior) {
    EntityListItemView = Marionette.EntityListItemView = Backbone.Marionette.View.extend({
        regions: {
            fieldsRegion: {
                el: '.fieldsRegion',
                replaceElement: true
            }
        },
        className: 'row entity-list-item',
        template: entityListItemTemplate,
        initialize: function (options) {
            _.extend(this, options);

            this._channel = Backbone.Radio.channel(this.route);
        },
        ui: {
            $delete: '.delete',
            $edit: '.edit',
            $multiAction: '.multi-action',
            $actions: '.actions'
        },
        onDomRefresh: function () {
            if (this.options.baseClassIds.indexOf(this.model.get('id')) > -1) {
                this.ui.$delete.addClass('not-active');
                this.ui.$edit.addClass('not-active');
                this.ui.$multiAction.addClass('not-active');
            }
        },
        onRender: function () {
            if (!_.isUndefined(this.fieldsTemplate)) {
                var fieldsView =
                    Backbone.Marionette.View.extend(
                        {
                            template: this.fieldsTemplate,
                            model: this.model,
                            onRender: function () {
                                // Get rid of that pesky wrapping-div.
                                // Assumes 1 child element present in template.
                                this.$el = this.$el.children();
                                // Unwrap the element to prevent infinitely
                                // nesting elements during re-render.
                                this.$el.unwrap();
                                this.setElement(this.$el);
                            }
                        });

                this.showChildView('fieldsRegion', new fieldsView());
                this.bindUIElements();
            }

            if (this.baseClassIds.indexOf(this.model.get('id')) === -1) {
                this.$el.attr('data-index', this.collection.indexOf(this.model));
                this.$el.attr('data-id', this.model.get('id'));
            }
        },
        templateContext: function () {
            var route = this.route;

            var allowEdit = this.allowableOperations.indexOf('edit') > -1,
                allowDelete = this.allowableOperations.indexOf('delete') > -1,
                allowDeleteAll = this.allowableOperations.indexOf('delete-all') > -1,
                allowPublishAll = this.allowableOperations.indexOf('clone-all') > -1,
                allowAddAll = this.allowableOperations.indexOf('add-all') > -1,
                allowViewLive = this.allowableOperations.indexOf('view-live') > -1;

            return {
                route: route,
                allowEdit: allowEdit,
                allowDelete: allowDelete,
                allowDeleteAll: allowDeleteAll,
                allowPublishAll: allowPublishAll,
                allowAddAll: allowAddAll,
                allowViewLive: allowViewLive
            };
        },
        appendAction: function (action, icon) {
            this.ui.$actions.append('<li>' +
                '<a class="live" href="#' + this.route + '/' + action + '/' + this.model.get('id') + '/">' +
                '<i data-id="' + this.model.get('id') + '" class="' + icon + ' size-21"></i> ' +
                '</a> ' +
                '</li>');
        },
        behaviors: {
            ConfirmModal: {
                behaviorClass: DeleteWarnBehavior,
                message: "Are you sure you want to delete this item?",
                yesFunc: function (e) {
                    this.view._channel.trigger('delete', this.view.model.get('id'));
                },
                noFunc: function (e) {
                }
            }
        },
        getChannel: function () {
            return this._channel;
        }
    });

})(jQuery, _, Backbone, Marionette, this['Templates']['entityListItemTemplate'], DeleteWarnBehavior);

var EntityLayoutView;
(function ($, _, Backbone, Marionette, entityListLayoutTpl, EntityLayoutModel, TimeoutUtil, PagerBehavior) {
    EntityLayoutView = Marionette.EntityLayoutView = Marionette.View.extend({
        template: entityListLayoutTpl,
        regions: {
            'entityRegion': {
                el: '.entityRegion',
                replaceElement: true
            },
            'pagerRegion': {
                el: '.pagerRegion',
                replaceElement: true
            }
        },
        behaviors: {
            Pager: {
                behaviorClass: PagerBehavior
            }
        },
        initialize: function (options) {
            _.extend(this, options);

            this._timeoutUtil = new TimeoutUtil();

            if (options.additionalParams) {
                this.additionalParams = options.additionalParams;
            } else {
                this.additionalParams = '';
            }

            this.listView.allowableOperations = this.allowableOperations;
            this.listView.route = this.route;
            this.listView.parentViewCid = this.cid;

            this._channel = Backbone.Radio.channel(this.route);
            Marionette.bindEvents(this, this._channel, this.radioEvents);
        },
        className: function () {
            var entityLayoutClass = ' entity-layout';
            if (!this.routing) {
                entityLayoutClass = ' entity-layout-nested';
            }

            return 'entity-layout-view-' + this.cid + entityLayoutClass;
        },
        model: EntityLayoutModel,
        radioEvents: {
            'view.list.activated': 'listViewActivated',
            'view.form.activated': 'formViewActivated'
        },
        events: {
            'click .edit': 'editClick',
            'keyup .nameFilter': 'filterByName',
            'click .multi-action': 'showMultiActions',
            'click .delete-all': 'deleteAll',
            'click .publish-all': 'publishAll',
            'click .add-all': 'addAll',
            'click .sub-nav .create': 'createClick',
            'click .sub-nav .get-all': 'getAllClick'
        },
        ui: {
            '$subNav': '.sub-nav',
            '$nameFilter': '.filterEntities',
            '$createBtn': '.create',
            '$listBtn': '.get-all',
            '$subNavElements': '.sub-nav > dd',
            '$multiActionRequests': '.multi-action-requests',
            '$deleteAllModal': '.delete-all-modal',
            '$publishAllModal': '.publish-all-modal',
            '$treeBtn': '.get-tree',
            '$header': '.entity-header'
        },
        templateContext: function () {
            var showCreate = this.allowableOperations.indexOf('create') > -1,
                allowDeleteAll = this.allowableOperations.indexOf('delete-all') > -1,
                allowPublishAll = this.allowableOperations.indexOf('publish-all') > -1,
                allowAddAll = this.allowableOperations.indexOf('add-all') > -1,
                route = this.route,
                btnClass = this.btnClass;

            return {
                showCreate: showCreate,
                allowDeleteAll: allowDeleteAll,
                allowPublishAll: allowPublishAll,
                allowAddAll: allowAddAll,
                route: route,
                btnClass: btnClass
            };
        },
        createClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.ui.$subNavElements.removeClass('active');
            this.ui.$createBtn.parent().addClass('active');

            this.ui.$nameFilter.hide();
            
            if (!this.routing) 
            {
               this._channel.trigger('create');
            } else {
                var route = this.route + '/create/';
                location.hash = route;
            }
        },
        onDomRefresh: function () {
            this.showListView();
            this.renderHeader();
            this.showMultiActions();
        },
        listViewActivated: function () {
            this.ui.$subNavElements.removeClass('active');
            this.ui.$listBtn.parent().addClass('active');
            this.ui.$nameFilter.show();
            this.triggerMethod("ShowPager", this.listView.collection);
            this.showMultiActions();
        },
        formViewActivated: function () {
        },
        publishAll: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var itemsSelected = this.$el.find('.multi-action:checked'),
                self = this,
                ids = [];

            _.each(itemsSelected, function (item) {
                var id = $(item).data('id');
                ids.push(id);
            });

            this.ui.$publishAllModal.modal('show');

            this.ui.$publishAllModal.on('click', '.no', function (e) {
                e.preventDefault();
                self.ui.$publishAllModal.modal('hide');
            });

            this.ui.$publishAllModal.on('click', '.yes', function (e) {
                e.preventDefault();
                this._channel.trigger('publish-all', ids);
                self.ui.$publishAllModal.modal('hide');
            });
        },
        addAll: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var itemsSelected = this.$el.find('.multi-action:checked'),
                deferreds = [],
                fullCollection = this.listView.collection;

            _.each(itemsSelected, function (item) {
                var id = $(item).data('id');
                deferreds.push(fullCollection.getById(id));
            });

            $.when.apply($, deferreds)
                .then(_.bind(function () {
                    var models = [];
                    _.each(arguments, function (entity) {
                        models.push(entity);
                    });

                    this._channel.trigger('addAll', models);
                    itemsSelected.attr('checked', false);
                    this.showMultiActions();
                }, this));
        },
        deleteAll: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var itemsSelected = this.$el.find('.multi-action:checked'),
                ids = [],
                self = this,
                fullCollection = this.listView.collection;

            _.each(itemsSelected, function (item) {
                ids.push($(item).data('id'));
            });

            this.ui.$deleteAllModal.modal('show');

            this.ui.$deleteAllModal.on('click', '.no', function (e) {
                e.preventDefault();
                self.ui.$deleteAllModal.modal('hide');
            });

            this.ui.$deleteAllModal.on('click', '.yes', function (e) {
                e.preventDefault();
                fullCollection.deleteByIds(ids)
                    .done(function () {
                        self.ui.$deleteAllModal.modal('hide');
                    });
            });
        },
        showMultiActions: function (e) {
            if (e) {
                e.stopPropagation();
            }

            var allowDeleteAll = this.allowableOperations.indexOf('delete-all') > -1,
                allowPublishAll = this.allowableOperations.indexOf('publish-all') > -1,
                allowAddAll = this.allowableOperations.indexOf('add-all') > -1;

            if (!allowPublishAll && !allowDeleteAll && !allowAddAll) {
                return;
            }

            var itemsSelected = this.$el.find('.multi-action:checked');

            if (itemsSelected.length > 0) {
                this.ui.$multiActionRequests.show();
            } else {
                this.ui.$multiActionRequests.hide();
            }
        },
        filterByName: function (e) {
            e.stopPropagation();

            var $target = $(e.target),
                name = $target.val(),
                filterField = _.isUndefined(this.filterField) ? 'name' : this.filterField;

            this._timeoutUtil.suspendOperation(400, _.bind(function () {
                if (name.length === 0) {
                    this._channel.trigger('getAll', 1);
                    return;
                }

                this._channel.trigger('textSearch', name, filterField);
            }, this));
        },
        showListView: function () {
            this.showChildView('entityRegion', this.listView);
        },
        renderHeader: function () {
            if (_.isUndefined(this.header)) {
                return;
            }

            var html = Marionette.Renderer.render(this.header.template, this.header.params);
            this.ui.$header.append(html);
        },
        getAllClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var collection = this.listView.collection,
                page = 1;

            if (!_.isUndefined(this.listView.currentPage) && this.listView.currentPage !== 0) {
                page = this.listView.currentPage;
            }

            var route = this.route + '/' + page + '/';
            if (!this.routing) {
                this._channel.trigger('getAll', page);
            } else {
                location.hash = route;
            }
        },
        editClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $target = $(e.target),
                id = $target.data('id');

            if (this.routing) {
                location.hash = this.route + '/edit/' + id + '/';
            } else {
                this._channel.trigger('edit', id);
            }
        },
        getChannel: function () {
            return this._channel;
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['entityLayoutTemplate'], EntityLayoutModel, TimeoutUtil, PagerBehavior);

var FormView;
(function ($, _, Backbone, Marionette, FormValidator) {
    "use strict";

    /**
     * FormView Extension of Backbone.Marionette.View
     *
     * @param {Object} options                   Options defining this FormView
     * @param {Object} [options.data]            Form Data. (Required if options.model is not set)
     * @param {Object} [options.fields]          Which Fields to include
     *
     */
    FormView = Marionette.FormView = Marionette.View.extend({

        className: "formView",

        rules: {}, //Custom Field Validation Rules

        fields: {},

        constructor: function () {
            Marionette.View.prototype.constructor.apply(this, arguments);

            //Allow Passing In Fields by extending with a fields hash
            if (!this.fields) throw new Error("Fields Must Be Provided");

            if (!this.model) this.model = new Backbone.Model();

            this.listenTo(this.model, 'change', this.changeFieldVal, this);
            if (this.data) this.model.set(this.data);

            //Attach Events to preexisting elements if we don't have a template
            if (!this.template) this.runInitializers();
            this.on('dom:refresh', this.runInitializers, this);
        },

        changeFieldVal: function (model, fields) {
            if (!_.isEmpty(fields) && fields.changes) {
                var modelProperty = Object.keys(fields.changes);
                this.inputVal(modelProperty, this.model.get(modelProperty));
            } else if (fields.unset) {
                _(this.fields).each(function (options, field) {
                    var elem = this.$('[data-field="' + field + '"]');
                    this.inputVal(elem, this.model.get(field));
                }, this);
            }
        },

        populateFields: function () {
            _(this.fields).each(function (options, field) {
                var elem = this.$('[data-field="' + field + '"]');
                this.inputVal(elem, this.model.get(field));
                if (options.autoFocus) elem.focus();
                if (options.disabled) {
                    elem.attr('disabled', 'disabled');
                }
            }, this);
        },

        serializeFormData: function () {
            var data = {}, self = this;

            _(this.fields).each(function (options, field) {
                data[field] = self.inputVal(field);
            });

            return data;
        },

        beforeFormSubmit: function (e) {
            e.preventDefault();
            var errors = this.validate();
            var success = _.isEmpty(errors);
            if (success) {
                if (_.isFunction(this.onSubmit)) return this.onSubmit.apply(this, [e]);
            } else {
                if (_.isFunction(this.onSubmitFail)) this.onSubmitFail.apply(this, [errors]);
                e.stopImmediatePropagation();
                return false;
            }
        },

        onFieldEvent: function (evt) {
            this.handleFieldEvent(evt, evt.type);
        },

        handleFieldEvent: function (evt, eventName) {
            var el = evt.target || evt.srcElement,
                field = $(el).attr('data-field'),
                fieldOptions = this.fields[field];

            if (fieldOptions && fieldOptions.validateOn === eventName) {
                var errors = this.validateField(field);
                if (!_.isEmpty(errors) && _.isFunction(this.onValidationFail)) this.onValidationFail(errors);
            }
        },

        validate: function () {
            var errors = {},
                fields = _(this.fields).keys();

            _(fields).each(function (field) {
                var fieldErrors = this.validateField(field);
                if (!_.isEmpty(fieldErrors)) errors[field] = fieldErrors;
            }, this);
            return errors;
        },

        validateField: function (field) {
            var fieldOptions = this.fields[field],
                validations = fieldOptions && fieldOptions.validations ? fieldOptions.validations : {},
                fieldErrors = [],
                isValid = true;

            var val = this.inputVal(field);

            if (fieldOptions.required) {
                isValid = this.validateRule(val, 'required');
                var errorMessage = typeof fieldOptions.required === 'string' ? fieldOptions.required : 'This field is required';
                if (!isValid) fieldErrors.push(errorMessage);
            }

            // Don't bother with other validations if failed 'required' already
            if (isValid && validations) {
                _.each(validations, function (errorMsg, validateWith) {
                    isValid = this.validateRule(val, validateWith);
                    if (!isValid) fieldErrors.push(errorMsg);
                }, this);
            }

            if (!_.isEmpty(fieldErrors)) {
                var errorObject = {
                    field: field,
                    el: this.fields[field].el,
                    error: fieldErrors
                };
                return errorObject;
            }
        },

        inputVal: function (input, val) {
            //takes field name or jQuery object
            var el = input.jquery ? input : this.$('[data-field="' + input + '"]');
            var self = this, mode = typeof val === 'undefined' ? 'get' : 'set';

            if (el.data('fieldtype') === 'object') {
                if (mode === 'get') val = {};
                el.find('[data-property]').each(function () {
                    var elem = $(this);
                    var prop = elem.attr('data-property');
                    if (mode === 'get') {
                        val[prop] = self.inputVal(elem);
                    } else if (val) {
                        self.inputVal(elem, val[prop]);
                    }
                });
            }
            else if (el.data('fieldtype') === 'array') {
                if (mode === 'get') val = [];
                /*    el.find('[data-index]').each(function () {
                 var elem = $(this);
                 var index = elem.data('index');
                 if (mode === 'get') {
                 val.push(elem.data('id'));
                 }
                 });*/
            } else if (el.is('input')) {
                var inputType = el.attr('type').toLowerCase();
                switch (inputType) {
                    case "radio":
                        el.each(function () {
                            var radio = $(this);
                            if (mode === 'get') {
                                if (radio.is(':checked')) {
                                    val = radio.val();
                                    return false;
                                }
                            } else {
                                if (radio.val() === val) {
                                    radio.prop('checked', true);
                                    return false;
                                }
                            }
                        });
                        break;
                    case "checkbox":
                        if (mode === 'get') {
                            val = el.is(':checked');
                        } else {
                            el.prop('checked', !!val);
                        }
                        break;
                    default:
                        if (mode === 'get') {
                            val = $.trim(el.val());
                        } else {
                            el.val(val);
                        }
                        break;
                }
            }
            else if (el.is('div') && el.hasClass('zselect')) {
                var checkedOptions = el.find('.selectedOptions ul li');
                var value = [];
                _.each(checkedOptions, function (checkedOption) {
                    var $checkedOption = $(checkedOption);
                    value.push($checkedOption.data('id'));
                });

                val = value;
            }
            else if (el.is('select') && el.is(":visible")) {
                if (mode === 'get') {
                    val = el.val();
                }
            }
            else if (el.is('textarea')) {
                if (mode === 'get') {
                    var editor = CKEDITOR.instances[input];
                    if (!_.isUndefined(editor)) {
                        val = $.trim(CKEDITOR.instances[input].getData());
                        var $hiddenDiv = $('<div></div>'),
                            html = $hiddenDiv.html(val),
                            imgs = $(html).find('img');

                        _.each(imgs, function (img) {
                            var $img = $(img),
                                src = $img.attr('src');

                            if (src.indexOf(App.API_URL) > -1) {
                                src = src.replace(App.API_URL, '');
                                $img.attr('src', src);
                            }
                        });

                        val = $hiddenDiv.html();
                    } else {
                        val = el.val();
                    }
                } else {
                    el.val(val);
                }
            }
            else {
                if (mode === 'get') {
                    val = $.trim(el.val());
                } else {
                    el.val(val);
                }
                //Handle Select / MultiSelect Etc
                //@todo
            }

            return val;
        },

        validateRule: function (val, validationRule) {
            var options;

            // throw an error because it could be tough to troubleshoot if we just return false
            if (!validationRule) throw new Error('Not passed a validation to test');

            if (validationRule === 'required') return FormValidator.required.evaluate(val);

            if (validationRule.indexOf(':') !== -1) {
                options = validationRule.split(":");
                validationRule = options.shift();
            }

            if (this.rules && this.rules[validationRule]) {
                return _(this.rules[validationRule].evaluate).bind(this)(val);
            } else {
                return _(FormValidator.validate).bind(this)(validationRule, val, options);
            }
            return true;
        },

        submit: function () {
            this.form.find('input[type=submit').trigger('click');
        },

        bindFormEvents: function () {
            var form = (this.$el.hasClass('form')) ? this.$el : this.$('.form').first();
            this.form = form;

            this.$('input')
                .blur(_(this.onFieldEvent).bind(this))
                .keyup(_(this.onFieldEvent).bind(this))
                .keydown(_(this.onFieldEvent).bind(this))
                .change(_(this.onFieldEvent).bind(this));

            var submitBtn = form.find('input[type=submit]');
            submitBtn.on('click', _.bind(function (e) {
                e.stopPropagation();
                _.bind(this.beforeFormSubmit, this)(e);
            }, this));
        },

        runInitializers: function () {
            this.populateFields();
            this.bindFormEvents();
            if (_.isFunction(this.onReady)) this.onReady();
        }
    });

})(jQuery, _, Backbone, Marionette, FormValidator);
var MultiSelectOptionView;
(function ($, _, Backbone, Marionette, EntityListItemView, multiSelectLiTemplate) {
    MultiSelectOptionView = EntityListItemView.extend({
        tagName: 'li',
        className: 'col-sm-12 multi-select-option nopadding',
        fieldsTemplate: multiSelectLiTemplate,
        onRender: function () {
            EntityListItemView.prototype.onRender.call(this);
            this.$el.attr('data-id', this.model.get('id'));
        }
    });

})(jQuery, _, Backbone, Marionette, EntityListItemView, this['Templates']['multiSelectLiTemplate']);

var MultiSelectListView;
(function ($, _, Backbone, Marionette, EntityListView, MultiSelectOptionView) {
    MultiSelectListView = EntityListView.extend({
        tagName: 'ul',
        childView: MultiSelectOptionView,
        className: 'multi-select-listings'
    });
})(jQuery, _, Backbone, Marionette, EntityListView, MultiSelectOptionView);

var EntityService;
(function ($, _, Backbone, Marionette, App, EntityLayoutView, headerTemplate) {
    EntityService = Marionette.EntityService = Marionette.Object.extend({
        initialize: function (options) {
            _.extend(this, options);

            this._entityLayoutView = null;

            if (!_.isUndefined(options.allowableOperations)) {
                this.allowableOperations = options.allowableOperations;
            } else {
                this.allowableOperations = ['create', 'delete', 'edit', 'delete-all'];
            }

            if (_.isUndefined(options.routing)) {
                this.routing = true;
            }

            if (_.isUndefined(this.entityLayoutViewType)) {
                this.entityLayoutViewType = EntityLayoutView;
            }

            if (_.isUndefined(this.baseClassIds)) {
                this.baseClassIds = [];
            }

            if (_.isUndefined(this.track)) {
                this.track = true;
            }

            if (!_.isUndefined(this.header)) {
                this.getHeader = function () {
                    return this.header;
                };
            }

            if (_.isUndefined(this.channelName)) {
                this.channelName = this.route;
                this._initRadio();
            }

            if (_.isUndefined(this.filterField)) {
                this.filterField = 'name';
            }
        },
        radioEvents: {
            'create': 'create',
            'edit': 'edit',
            'delete': 'delete',
            'getAll': 'getAll',
            'getType': 'getType',
            'textSearch': 'textSearch'
        },
        entityLayoutView: function (entities) {
            if (_.isNull(this._entityLayoutView) || this._entityLayoutView.isDestroyed()) {
                this._entityLayoutView = this.getEntityLayoutView(entities);
            }

            return this._entityLayoutView;
        },
        getEntityLayoutView: function (entities) {
            var listView =
                new this.listView
                ({
                    collection: _.isUndefined(entities) ? this.collection : entities,
                    baseClassIds: this.baseClassIds,
                    route: this.route
                });

            listView.currentPage = _.isUndefined(entities) ? 1 : entities.currentPage;

            return new this.entityLayoutViewType
            ({
                allowableOperations: this.allowableOperations,
                route: this.route,
                listView: listView,
                header: this.getHeader(),
                model: new Backbone.Model(),
                btnClass: this.getBtnClass(),
                routing: this.routing,
                filterField: this.filterField
            });
        },
        getHeader: function () {
            return {params: {title: this.title}, template: headerTemplate};
        },
        getBtnClass: function () {
            return '';
        },
        getNewModel: function () {
            return new this.model();
        },
        getFormOptions: function () {
            return {};
        },
        create: function () {
            var entity = this.getNewModel();

            if (this.region.currentView !== this.entityLayoutView()) {
                this.region.show(this.entityLayoutView());
            }

            var form = new this.formView
            ({
                model: entity,
                collection: this._entityLayoutView.listView.collection,
                parentViewCid: this.entityLayoutView().cid,
                btnClass: this.getBtnClass(),
                formOptions: this.getFormOptions(),
                channelName: this.route
            });

            this.entityLayoutView().showChildView('entityRegion', form);
        },
        edit: function (id) {
            if (this.region.currentView !== this.entityLayoutView()) {
                this.region.show(this.entityLayoutView());
            }

            this.collection.getById(id)
                .done(_.bind(function (entity) {
                    var form = new this.formView
                    ({
                        model: entity,
                        collection: this._entityLayoutView.listView.collection,
                        parentViewCid: this.entityLayoutView().cid,
                        btnClass: this.getBtnClass(),
                        formOptions: this.getFormOptions(),
                        channelName: this.channelName
                    });

                    this.entityLayoutView().showChildView('entityRegion', form);
                }, this));
        },
        delete: function (id) {
            var self = this;

            if (this.region.currentView !== this.entityLayoutView()) {
                this.region.show(this.entityLayoutView());
            }

            this.collection.getById(id)
                .done(function (entityToDelete) {
                    entityToDelete.destroy({
                        type: "DELETE",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: entityToDelete.url + '/' + id,
                        success: function (response) {
                            console.log("Inside success");
                            console.log(response);

                            var currentCollection = self.entityLayoutView().listView.collection;
                            currentCollection.remove(id);

                            self.entityLayoutView().triggerMethod("ShowPager", currentCollection);
                        },
                        error: function (errorResponse) {
                            console.log("Inside Failure");
                            console.log(errorResponse.responseText);
                        }
                    });
                });
        },
        textSearch: function (startsWith, field) {
            var data = {
                conditions: [
                    {
                        searchType: 'like',
                        field: field,
                        value: startsWith
                    }
                ],
                page: 1,
                pageSize: App.pageSize
            };

            this.collection.query(this.track, data)
                .done(_.bind(function (entities, key) {
                    var models = null;

                    if (_.isUndefined(entities.child)) {
                        models = entities;
                    } else {
                        models = entities.child;
                    }

                    var listView =
                        new this.listView
                        ({
                            collection: models,
                            parentViewCid: this.entityLayoutView().cid,
                            baseClassIds: this.baseClassIds,
                            route: this.route
                        });

                    listView.route = this.route;
                    listView.allowableOperations = this.allowableOperations;

                    this.entityLayoutView().key = key;

                    var channel = this.getChannel();
                    channel.trigger('subcollection', models);

                    this.entityLayoutView().showChildView('entityRegion', listView);
                }, this));
        },
        getAll: function (page, force) {
            if (this.region.currentView !== this._entityLayoutView) {
                throw new Error('You need to call getType on this service before calling get all!!');
            }

            var self = this;

            if (isNaN(page)) {
                page = 0;
            }

            var data = this.getData(page);

            this.collection.query(this.track, data, force)
                .done(function (entities, key) {
                    var models = null;

                    if (_.isUndefined(entities.child)) {
                        models = entities;
                    } else {
                        models = entities.child;
                    }


                    var listView =
                        new self.listView
                        ({
                            collection: models,
                            parentViewCid: self.entityLayoutView().cid,
                            baseClassIds: self.baseClassIds,
                            route: self.route
                        });

                    listView.currentPage = page;
                    listView.route = self.route;
                    listView.allowableOperations = self.allowableOperations;

                    self.entityLayoutView().key = key;
                    self.entityLayoutView().listView = listView;

                    var channel = self.getChannel();
                    channel.trigger('subcollection', models);

                    self.entityLayoutView().showChildView('entityRegion', listView);
                });
        },
        getType: function (page, force) {
            var self = this;

            if (isNaN(page)) {
                page = 0;
            }

            if (this.region.currentView === this._entityLayoutView) {
                this.getAll(page);
                return;
            }

            var data = this.getData(page);

            this.collection.query(this.track, data, force)
                .done(function (entities, key) {
                    var models = null;

                    if (_.isUndefined(entities.child)) {
                        models = entities;
                    } else {
                        models = entities.child;
                    }

                    self.region.reset();
                    models.currentPage = page;

                    var channel = self.getChannel();
                    channel.trigger('subcollection', models);

                    var entityLayoutView = self.entityLayoutView(models);
                    entityLayoutView.key = key;

                    self.region.show(entityLayoutView);
                });
        },
        getData: function (page) {
            return {
                page: parseInt(page),
                pageSize: parseInt(App.pageSize)
            };
        }
    });
})(jQuery, _, Backbone, Marionette, App, EntityLayoutView, this['Templates']['headerTemplate']);

var MultiSelectService;
(function ($, _, Backbone, Marionette, EntityService, App, MultiSelectListView) {
    MultiSelectService = Marionette.EntityService.extend({
        getData: function (page) {
            var data = {
                conditions: [],
                page: page,
                pageSize: App.pageSize
            };

            data.conditions = data.conditions.concat(this.conditions);
            return data;
        },
        initialize: function (options) {
            this.model = null;
            this.listView = MultiSelectListView;
            this.formView = null;

            Marionette.EntityService.prototype.initialize.call(this, options);
        },
        getHeader: function () {
            return this.header;
        },
        getBtnClass: function () {
            return 'tiny round';
        }
    });
})(jQuery, _, Backbone, Marionette, EntityService, App, MultiSelectListView);
var MultiSelectLayoutView;
(function (Marionette, $, _, multiSelectLayoutTpl, ReusableTypeLayoutView, MultiSelectService, EntityLayoutModel, headerTemplate) {
    MultiSelectLayoutView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.collection = options.collection;
            this.excludedItemsRoute = this.dataField + '-excluded-items';
            this.selectedItemsRoute = this.dataField + '-included-items';

            if (!options.selectedId) {
                this.selectedId = [];
            } else {
                this.selectedId = options.selectedId;
            }

            this.selectedItems = new Backbone.Collection();
            this.actionableOptions = new Backbone.Collection();
        },
        onRender: function () {
            this.$el.attr('data-field', this.dataField);
        },
        className: 'zselect',
        template: multiSelectLayoutTpl,
        regions: {
            'optionsRegion': '.options',
            'selectedOptionsRegion': '.selectedOptions'
        },
        events: {
            'click .zmshead': 'toggleMultiSelect',
            'click .multi-select-option': 'selectOption',
            'click .remove-items': 'removeItems',
            'click .add-items': 'addItems'
        },
        ui: {
            '$optionsRegion': '.optionsRegion',
            '$selected': '.zmshead',
            '$addItems': '.add-items',
            '$removeItems': '.remove-items'
        },
        showSelectedInHeader: function () {
            this.ui.$selected.attr('title', '');

            var toolTip = 'There are no selected items.';
            if (this.selectedItems.length > 0) {
                toolTip = 'Selected items: ';
                this.selectedItems.each(_.bind(function (entity) {
                    if (this.selectedItems.indexOf(entity) === (this.selectedItems.length - 1)) {
                        toolTip = toolTip + entity.get('name');
                    } else {
                        toolTip = toolTip + entity.get('name') + ', ';
                    }
                }, this));
            }

            this.ui.$selected.attr('title', toolTip);
            this.ui.$selected.tooltip();
        },
        removeItems: function (e) {
            e.preventDefault();

            var self = this;
            this.actionableOptions.each(function (entity) {
                var index = self.selectedId.indexOf(entity.get('id'));
                self.selectedId.splice(index, 1);
            });

            this.getChannel().trigger('removed', this.actionableOptions);

            this.actionableOptions.reset();
            this.showSelectedInHeader();
            this.ui.$removeItems.hide();
            this.refreshCollections();
        },
        addItems: function (e) {
            e.preventDefault();

            if (!_.isUndefined(this.options.allowMultipleItems)) {
                if (!this.options.allowMultipleItems &&
                    ((this.selectedItems.length >= 1 && this.actionableOptions.length >= 1) ||
                    this.actionableOptions.length > 1)) {
                    alert("You can only add one item.");
                    this.$el.find('.entityRegion ul li').removeClass('selected');
                    this.actionableOptions.reset();
                }
            }

            var self = this;
            this.actionableOptions.each(function (entity) {
                self.selectedId.push(entity.get('id'));
            });

            this.getChannel().trigger('added', this.selectedItems);

            this.actionableOptions.reset();
            this.showSelectedInHeader();
            this.ui.$addItems.hide();
            this.refreshCollections();
        },
        refreshCollections: function () {
            var selectedIds = this.selectedId;

            var notInPred = [];
            if (selectedIds !== "") {
                notInPred = [
                    {
                        searchType: 'except',
                        field: 'id',
                        value: selectedIds
                    }
                ];
            }

            if (this.options.conditions && this.options.conditions.length > 0) {
                notInPred = notInPred.concat(this.options.conditions);
            }

            this.excludedItemsService.conditions = notInPred;
            this.excludedItemsService.getChannel().trigger('getAll', 1);

            var inPred = [
                {
                    searchType: 'in',
                    field: 'id',
                    value: selectedIds
                }
            ];

            if (this.options.selectedConditions && this.options.selectedConditions.length > 0) {
                inPred = inPred.concat(this.options.selectedConditions);
            }

            this.selectedItemsService.conditions = inPred;
            this.selectedItemsService.getChannel().trigger('getAll', 1);
        },
        selectOption: function (e) {
            e.preventDefault();

            var $target = $(e.target);

            if (!$target.is('li')) {
                $target = $target.closest('li');
            }

            var optionSelectedFunc = _.bind(this.optionSelected, this),
                id = $target.data('id');

            this.collection.getById(id)
                .done(function (entity) {
                    optionSelectedFunc(entity, $target);
                });
        },
        optionSelected: function (entity, $target) {
            if (this.actionableOptions.contains(entity)) {
                this.actionableOptions.remove(entity);
                $target.removeClass('selected');
            } else {
                this.actionableOptions.add(entity);
                $target.addClass('selected');
            }

            var removing = false,
                adding = false;

            if (this.actionableOptions.length > 0) {
                this.selectedItems.each(_.bind(function (item) {
                    var findSelected =
                        this.actionableOptions.find(function (actionableItem) {
                            return actionableItem.get('id') === item.get('id');
                        });

                    if (!_.isUndefined(findSelected)) {
                        removing = true;
                        return;
                    }
                }, this));

                this.nonSelectedItems.each(_.bind(function (item) {
                    var findNonSelected =
                        this.actionableOptions.find(function (actionableItem) {
                            return actionableItem.get('id') === item.get('id');
                        });

                    if (!_.isUndefined(findNonSelected)) {
                        adding = true;
                        return;
                    }
                }, this));
            }

            if (adding && removing) {
                alert("You can only select items from one side or the other.");
                this.$el.find('.entityRegion ul li').removeClass('selected');
                this.actionableOptions.reset();
                this.ui.$removeItems.hide();
                this.ui.$addItems.hide();
            } else if (adding) {
                this.ui.$addItems.show();
                this.ui.$removeItems.hide();
            } else if (removing) {
                this.ui.$removeItems.show();
                this.ui.$addItems.hide();
            } else {
                this.ui.$addItems.hide();
                this.ui.$removeItems.hide();
            }
        },
        toggleMultiSelect: function (e) {
            if (!this.ui.$optionsRegion.is(':visible')) {
                this.ui.$optionsRegion.show();
            } else {
                this.ui.$optionsRegion.hide();
            }
        },
        showSelectedItems: function () {
            var inPred = [
                {
                    searchType: 'in',
                    field: 'id',
                    value: this.selectedId.toString()
                }
            ];

            if (this.options.selectedConditions && this.options.selectedConditions.length > 0) {
                inPred = inPred.concat(this.options.selectedConditions);
            }

            var options = {
                allowableOperations: [],
                route: this.selectedItemsRoute,
                header: {params: {title: "Remove an Item"}, template: headerTemplate},
                routing: false,
                conditions: inPred,
                region: this.getRegion('selectedOptionsRegion'),
                collection: this.collection
            };

            this.selectedItemsService = new MultiSelectService(options);
            this._selectedItemsChannel = this.selectedItemsService.getChannel();

            this._selectedItemsChannel.on('subcollection', _.bind(function (entities) {
                this.selectedItems = new Backbone.Collection(entities.models);
                this.showSelectedInHeader();
            }, this));

            this._selectedItemsChannel.trigger('getType', 1);
        },
        showExcludedItems: function () {
            var notInPred = [
                {
                    searchType: 'except',
                    field: 'id',
                    value: this.selectedId.toString()
                }
            ];

            if (this.options.conditions && this.options.conditions.length > 0) {
                notInPred = notInPred.concat(this.options.conditions);
            }

            var options = {
                allowableOperations: [],
                route: this.excludedItemsRoute,
                header: {params: {title: "Select an Item"}, template: headerTemplate},
                routing: false,
                conditions: notInPred,
                region: this.getRegion('optionsRegion'),
                collection: this.collection
            };

            this.excludedItemsService = new MultiSelectService(options);
            this._excludedItemsChannel = this.excludedItemsService.getChannel();

            this._excludedItemsChannel.on('subcollection', _.bind(function (entities) {
                this.nonSelectedItems = new Backbone.Collection(entities.models);
            }, this));

            this._excludedItemsChannel.trigger('getType');
        },
        onDomRefresh: function () {
            this.ui.$optionsRegion.hide();
            this.showExcludedItems();
            this.showSelectedItems();
        },
        onDestroy: function () {
            this._excludedItemsChannel.reset();
            this._selectedItemsChannel.reset();
        }
    });
})(Marionette, jQuery, _, this['Templates']['multiSelectLayoutTemplate'], ReusableTypeLayoutView, MultiSelectService, EntityLayoutModel, this['Templates']['headerTemplate']);

var EntityFormView;
(function ($, _, Backbone, Marionette, entityFormLayoutTemplate, MultiSelectLayoutView, DropDownListView, AutoCompleteLayoutView, MessageBehavior, RadioButtonListView, TextAreaView, CheckBoxView, WyswigView, ImageFieldView, DateTimePickerView) {
    EntityFormView = Marionette.EntityFormView = Backbone.Marionette.FormView.extend({
        template: entityFormLayoutTemplate,
        regions: {
            entityFormRegion: '.entityFormRegion',
            'messagesRegion': '.messagesRegion'
        },
        initialize: function (options) {
            _.extend(this, options.formOptions);

            if (!_.isUndefined(this.collection)) {
                this.model.setUrl(this.collection.getUrl());
            }

            this.getDropDownForRegion = _.bind(this._dropDownForRegion, this);
            this.getRadioBtnsForRegion = _.bind(this._radioButtonListForRegion, this);
            this.getAutoCompleteForRegion = _.bind(this._autoCompleteForRegion, this);
            this.getMultiSelectForRegion = _.bind(this._multiSelectForRegion, this);
            this.getTextAreaForRegion = _.bind(this._textAreaForRegion, this);
            this.getCheckboxForRegion = _.bind(this._checkboxForRegion, this);
            this.getWyswigForRegion = _.bind(this._wyswigForRegion, this);
            this.getImagePickerForRegion = _.bind(this._imagePickerForRegion, this);
            this.getDatePickerForRegion = _.bind(this._dateTimePickerForRegion, this);

            if (!this.model.isNew()) {
                this.original = this.model.toJSON();
            }

            this._channel = Backbone.Radio.channel(this.getOption('channelName'));
        },
        behaviors: {
            Messages: {
                behaviorClass: MessageBehavior
            }
        },
        ui: {
            '$actions': '.actions',
            '$spinner': '.spinner'
        },
        templateContext: function () {
            var self = this;
            return {
                btnClass: self.options.btnClass,
                isNew: this.model.isNew()
            };
        },
        events: {
            'click .reset': 'resetForm'
        },
        onDomRefresh: function () {
            this._channel.trigger('view.form.activated');
            this.checkDisabledFields();
        },
        checkDisabledFields: function () {
            var allDisabled = true;
            for (var key in this.fields) {
                var field = this.fields[key];
                if (_.isUndefined(field.disabled) || !field.disabled) {
                    allDisabled = false;
                    break;
                }
            }

            if (allDisabled) {
                this.ui.$actions.hide();
            }
        },
        onRender: function () {
            if (_.isUndefined(this.formTemplate)) {
                throw new Error("The formTemplate property is undefined!");
            }

            var formView = Backbone.Marionette.View.extend({
                template: this.formTemplate,
                model: this.model
            });

            this.showChildView('entityFormRegion', new formView());
            this.bindUIElements();
        },
        getChannel: function () {
            return this._channel;
        },
        resetForm: function (e) {
            e.preventDefault();
            this.render();
        },
        showWarningModal: function (message, eventName) {
            var $warningModal = $('.warningModal'),
                self = this;

            //update the message
            $warningModal.find('.message').html(message);

            //show modal
            $warningModal.modal('show');

            if (_.isUndefined(eventName)) {
                $warningModal.find('.buttons').hide();
            }

            $warningModal.on('click', '.no', function (e) {
                e.preventDefault();

                self._channel.trigger('warning-modal:no:' + eventName);
                $warningModal.modal('hide');
            });

            $warningModal.on('click', '.yes', function (e) {
                e.preventDefault();
                
                self._channel.trigger('warning-modal:yes:' + eventName);
                $warningModal.modal('hide');
            });
        },
        onSubmitFail: function (errors) {
            console.log("FAIL");
            console.log(errors);

            var $errors = $('.error');
            $errors.remove();

            for (var errorObject in errors) {
                var field = errors[errorObject].el,
                    $selector = $(field),
                    $formGroup = $selector.closest('.form-group');

                $formGroup.addClass('has-error');

                for (var i = 0; i < errors[errorObject].error.length; i++) {
                    $selector.after('<span class="help-block">' + errors[errorObject].error[i] + '</span>');
                }
            }
        },
        onSubmit: function (evt) {
            evt.preventDefault();

            var $errors = $('.help-block');
            $errors.remove();

            _.each($errors, function ($error) {
                var $formGroup = $error.closest('.form-group');
                $formGroup.removeClass('has-error');
            });

            this.setModelDefaults();
            this.saveModel();
        },
        setModelDefaults: function () {
            var data = this.serializeFormData();

            //loop through all of the data properties and save them to the model
            for (var key in data) {
                //make sure it doesn't come from the prototype and that
                //we don't overwrite the id.
                if (!data.hasOwnProperty(key) || key === 'id') {
                    continue;
                }

                this.model.set(key, data[key]);
            }
        },
        getHeaders: function () {
            return {};
        },
        saveModel: function () {
            var self = this;
            this.model.save(null, {
                headers: this.getHeaders(),
                success: function (model, response) {
                    if (model.isNew()) {
                        //check to see if something went wrong server side
                        if (parseInt(response) === 0) {
                            if (!_.isUndefined(self.collection)) {
                                self.collection.remove(model);
                            }

                            self.triggerMethod("ShowMessages", 'error', ['Could not create item!']);
                            return;
                        }

                        model.set({id: response});
                        if (!_.isUndefined(self.collection)) {
                            self.collection.add(model);
                        }

                        self.triggerMethod("ShowMessages", 'success', ['Item successfully created!']);
                        self.getChannel().trigger("Entity.Created");
                    } else {
                        self.triggerMethod("ShowMessages", 'success', ['Item successfully saved!']);
                        self.getChannel().trigger("Entity.Updated." + model.get('id'));
                    }
                },
                error: function (model, response) {
                    if (model.isNew()) {
                        if (!_.isUndefined(self.collection)) {
                            self.collection.remove(self.model.cid);
                        }

                        self.triggerMethod("ShowMessages", 'error', ['Could not create item!']);
                    } else {
                        self.triggerMethod("ShowMessages", 'error', ['Could not save item!']);
                    }

                    console.log(response.responseText);
                }
            });
        },
        getSubServiceRoute: function (name) {
            return location.hash.substring(1, location.hash.length) + name;
        },
        _wyswigForRegion: function (model, region, dataField) {
            this.showChildView(region, new WyswigView({
                model: model,
                dataField: dataField
            }));
        },
        _dropDownForRegion: function (collection, region, dataField, conditions) {
            var viewContext = this;
            if (!conditions) {
                conditions = [];
            }

            var data = {
                conditions: conditions
            };

            collection.query(false, data).done(function (entities) {
                var currentlySetId = viewContext.model.get(dataField);

                if (_.isUndefined(currentlySetId) || _.isNull(currentlySetId) || currentlySetId === '' || currentlySetId === 0) {
                    entities.add(new Backbone.Model({name: 'Select', id: ''}), {at: 0});
                    currentlySetId = '';
                }

                viewContext.showChildView(region, new DropDownListView({
                    collection: entities,
                    dataField: dataField,
                    selectedId: currentlySetId
                }));
            });
        },
        _multiSelectForRegion: function (collection, region, dataField, conditions) {
            var selectedIds = this.model.get(dataField);

            if (_.isUndefined(conditions)) {
                conditions = [];
            }

            if (!this.model.isNew() && dataField === 'parentIds') {
                conditions.push({
                    searchType: 'notEquals',
                    value: this.model.get('id') === null ? 0 : this.model.get('id'),
                    field: 'id'
                });
            }

            var multiSelect =
                new MultiSelectLayoutView({
                    collection: collection,
                    dataField: dataField,
                    selectedId: selectedIds,
                    conditions: conditions
                });

            this.showChildView(region, multiSelect);
        },
        _autoCompleteForRegion: function (collection, region, dataField) {
            var selectedId = this.model.get(dataField);

            this.showChildView(region,
                new AutoCompleteLayoutView({
                    collection: collection,
                    dataField: dataField,
                    selectedId: selectedId
                }));
        },
        _radioButtonListForRegion: function (collection, region, dataField) {
            var selectedId = this.model.get(dataField);

            this.showChildView(region, new RadioButtonListView({
                collection: collection,
                dataField: dataField,
                selectedId: selectedId
            }));
        },
        _textAreaForRegion: function (model, region, dataField) {
            this.showChildView(region, new TextAreaView({
                model: model,
                dataField: dataField
            }));
        },
        _checkboxForRegion: function (model, region, dataField) {
            this.showChildView(region, new CheckBoxView({
                model: model,
                dataField: dataField
            }));
        },
        _imagePickerForRegion: function (model, region, dataField) {
            this.showChildView(region, new ImageFieldView({
                model: model,
                dataField: dataField
            }));
        },
        _dateTimePickerForRegion: function (model, region, dataField, dateType) {
            this.showChildView(region, new DateTimePickerView({
                model: model,
                dataField: dataField,
                dateType: dateType
            }));
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['entityFormLayoutTemplate'], MultiSelectLayoutView, DropDownListView, AutoCompleteLayoutView, MessageBehavior, RadioButtonListView, TextAreaView, CheckBoxView, WyswigView, ImageFieldView, DateTimePickerView);


var TreeCompositeView;
(function ($, _, Backbone, Marionette, treeCompositeTpl) {
    TreeCompositeView = Marionette.TreeCompositeView = Backbone.Marionette.View.extend({
        tagName: 'li',
        template: treeCompositeTpl,
        events: function () {
            var nodeClickEvent = 'click .nodeLink' + this.options.model.get('id'),
                plusClickEvent = 'click .plus' + this.options.model.get('id'),
                minusClickEvent = 'click .minus' + this.options.model.get('id'),
                toggleClickEvent = 'click .toggle' + this.options.model.get('id');

            var eventsHash = {};
            eventsHash[nodeClickEvent] = 'navigateToItem';
            eventsHash[plusClickEvent] = 'showChildren';
            eventsHash[minusClickEvent] = 'hideChildren';
            eventsHash[toggleClickEvent] = 'toggleChildren';

            return eventsHash;
        },
        onDomRefresh: function () {
            if (this.hasChildren() && !_.isUndefined(this.renderChildrenTpl)) {
                this.renderChildrenTpl();
                var childrenRegion = new Backbone.Marionette.Region({
                    el: '.children-' + this.model.get('id'),
                    replaceElement: true
                });

                this.addRegion('childrenRegion', childrenRegion);
                 
                var ListView = this.model.get('listView');
                this.showChildView('childrenRegion', new ListView({ collection: this.collection }));
            }
        },
        ui: {
            '$children': '.children'
        },
        navigateToItem: function (e) {
            e.preventDefault();
        },
        toggleChildren: function (e) {
            e.preventDefault();

            if (!this.model.get('hideChildren')) {
                this.hideChildren(e);
                this.ui.$plus.show();
                this.ui.$minus.hide();
            } else {
                this.showChildren(e);
                this.ui.$plus.hide();
                this.ui.$minus.show();
            }
        },
        showChildren: function (e) {
            e.preventDefault();
            var self = this;

            this.collection = this.getChildrenCollection()
                .done(function () {
                    self.setChildrenCollection();
                    if (self.collection.length > 0) {
                        self.ui.$children.show();
                        self.model.set({ childCollection: self.collection });
                        self.model.set({ hideChildren: false });

                        self.render();
                    }
                });
        },
        hideChildren: function (e) {
            e.preventDefault();
            this.ui.$children.hide();
            this.model.set({ hideChildren: true });
        },
        initialize: function (options) {
            _.extend(this, options);

            if (_.isUndefined(this.model.get('hideChildren'))) {
                this.model.set({ hideChildren: true });
            }

            var childCollection = this.model.get('childCollection');
            if (!_.isUndefined(childCollection) && childCollection.length > 0) {
                this.collection = childCollection;
            }
        },
        getChildrenCollection: function () {
            var modelId = this.model.get('id');
            return this.fullCollection.getChildren(modelId, 5, false);
        },
        setChildrenCollection: function () {
            var self = this,
                modelId = this.model.get('id');

            var collection = new Backbone.CollectionSubset({
                parent: self.fullCollection,
                filter: function (node) {
                    var parentIds = node.get('parentIds');
                    return parentIds.indexOf(modelId) > -1;
                }
            });

            this.collection = collection.child;
        },
        hasChildren: function () {
            return !_.isUndefined(this.collection) && this.collection.length > 0;
        }
    });

})(jQuery, _, Backbone, Marionette, this['Templates']['treeCompositeTemplate']);

var TreeListView;
(function ($, _, Backbone, Marionette, TreeCompositeView) {
    TreeListView = Marionette.TreeListView = Marionette.CollectionView.extend({
        childView: TreeCompositeView,
        initialize: function (options) {
            this.fullCollection = options.fullCollection;
        },
        onRender: function () {
            // Get rid of that pesky wrapping-div.
            // Assumes 1 child element present in template.
            this.$el = this.$el.children();
            // Unwrap the element to prevent infinitely
            // nesting elements during re-render.
            this.$el.unwrap();
            this.setElement(this.$el);
        },
        childViewOptions: function () {
            var fullCollection = this.fullCollection;

            return {
                fullCollection: fullCollection
            };
        }
    });

})(jQuery, _, Backbone, Marionette, TreeCompositeView);

var EntityController;
(function (App, $, _, Backbone, Marionette, EntityLayoutView, headerTemplate, TimeoutUtil, EntityService) {
    EntityController = Marionette.EntityController = Marionette.Object.extend({
        initialize: function (options) {
            this._channel = Backbone.Radio.channel(options.route);
            this.getEntityService(options);
        },
        onActionExecuting: function (name, path) {
            App.route = this.route;
        },
        getEntityService: function (options) {
            this.entityService = new EntityService(options);
        },
        create: function () {
            this._channel.trigger('create');
        },
        edit: function (id) {
            this._channel.trigger('edit', id);
        },
        textSearch: function (startsWith, field) {
            this._channel.trigger('textSearch', startsWith, field);
        },
        getAll: function (page) {
            this._channel.trigger('getAll', page);
        },
        getType: function (page) {
            this._channel.trigger('getType', page);
        }
    });
})(App, jQuery, _, Backbone, Marionette, EntityLayoutView, this['Templates']['headerTemplate'], TimeoutUtil, EntityService);

//# sourceMappingURL=main.js.map

    return {
        ErrorView: ErrorView,
        InfoView: InfoView,
        WarningView: WarningView,
        SuccessView: SuccessView,
        TimeoutUtil: TimeoutUtil,
        UriUtil: UriUtil,
        AutoCompleteLayoutView: AutoCompleteLayoutView,
        MultiSelectLayoutView: MultiSelectLayoutView,
        DateTimePickerView: DateTimePickerView,
        SingleLineTextView: SingleLineTextView,
        WyswigView: WyswigView,
        ImageFieldView: ImageFieldView,
        AutoCompleteListView: AutoCompleteListView,
        RadioButtonListView: RadioButtonListView,
        CheckBoxListView: CheckBoxListView,
        CheckBoxView: CheckBoxView,
        SortableItemView: SortableItemView,
        SortableCollectionView: SortableCollectionView,
        FormValidator: FormValidator,
        ReusableTypeLayoutView: ReusableTypeLayoutView,
        MessageBehavior: MessageBehavior,
        DropDownListView: DropDownListView,
        EntityListItemView: EntityListItemView,
        EntityListView: EntityListView,
        EntityLayoutView: EntityLayoutView,
        TreeCompositeView: TreeCompositeView
    };
}));