module.exports = function (grunt) {
    var fs = require('fs');
    var fileSave = require('file-save');

    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                options: {
                    sourceMap: true
                },
                src: [
                    './util/formValidator.js',
                    './util/timeoutUtil.js',
                    './util/uriUtil.js',
                    './models/EntityModel.js',
                    './models/EntityLayoutModel.js',
                    './models/validation/MessageModel.js',
                    './models/validation/ValidationModel.js',
                    './collections/EntityCollection.js',
                    './collections/HierarchicalEntityCollection.js',
                    './collections/validation/MessagesCollection.js',
                    './routers/entityRouter.js',
                    './views/validation/MessageView.js',
                    './views/validation/MessageListView.js',
                    './views/validation/BaseValidationView.js',
                    './views/validation/ErrorView.js',
                    './views/validation/InfoView.js',
                    './views/validation/SuccessView.js',
                    './views/validation/WarningView.js',
                    './views/reusableTypes/ReusableTypeLayoutView.js',
                    './views/reusableTypes/ReusableTypeListView.js',
                    './views/reusableTypes/ReusableTypeView.js',
                    './views/reusableTypes/wyswig/WyswigView.js',
                    './views/reusableTypes/sortable/SortableItemView.js',
                    './views/reusableTypes/sortable/SortableCollectionView.js',
                    './views/reusableTypes/singleLineText/SingleLineTextView.js',
                    './views/reusableTypes/singleLineText/NumberView.js',
                    './views/reusableTypes/singleLineText/TextAreaView.js',
                    './views/reusableTypes/radioButtons/RadioButtonView.js',
                    './views/reusableTypes/radioButtons/RadioButtonListView.js',
                    './views/reusableTypes/pager/PagerItemView.js',
                    './views/reusableTypes/pager/PagerListView.js',
                    './views/reusableTypes/image/ImageFieldView.js',
                    './views/reusableTypes/dropDownLists/OptionView.js',
                    './views/reusableTypes/dropDownLists/DropDownListView.js',
                    './views/reusableTypes/dateTimePicker/DateTimePickerView.js',
                    './views/reusableTypes/checkBoxes/CheckBoxView.js',
                    './views/reusableTypes/checkBoxes/CheckBoxListView.js',
                    './views/reusableTypes/autoComplete/AutoCompleteView.js',
                    './views/reusableTypes/autoComplete/AutoCompleteListView.js',
                    './views/reusableTypes/autoComplete/AutoCompleteLayoutView.js',
                    './behaviors/messages/MessageBehavior.js',
                    './behaviors/modals/ConfirmModalBehavior.js',
                    './behaviors/modals/DeleteWarnBehavior.js',
                    './behaviors/pager/PagerBehavior.js',
                    './views/EntityListView.js',
                    './views/EntityListItemView.js',
                    './views/EntityLayoutView.js',
                    './views/table/TableListItemView.js',
                    './views/table/TableListView.js',
                    './views/table/TableLayoutView.js',
                    './views/FormView.js',
                    './views/reusableTypes/multiSelectLists/MultiSelectOptionView.js',
                    './views/reusableTypes/multiSelectLists/MultiSelectListView.js',
                    './services/entityService.js',
                    './services/multiSelectService.js',
                    './views/reusableTypes/multiSelectLists/MultiSelectLayoutView.js',
                    './views/EntityFormView.js',
                    './views/tree/TreeCompositeView.js',
                    './views/tree/TreeListView.js',
                    './views/sideNav/SideNavItemView.js',
                    './views/sideNav/SideNavListView.js',
                    './views/sideNav/SideNavLayoutView.js',
                    './views/topBar/TopBarMenuItemView.js',
                    './views/topBar/TopBarListView.js',
                    './controllers/entityController.js'
                ],
                dest: './generated/js/main.js'
            }
        },
        watch: {
            default: {
                options: {
                    nospawn: true,
                    debounceDelay: 1000
                },
                files: ['!./generated/js/*.js',  './**/*/*.js', './entityview.template.js', './templates/**/*.html', './templates/*.html'],
                tasks: ['default']
            }
        },
        underscore: {
            options: {
                namespace: 'FastTrack.Templates',
                compile: true
            },
            demo: {
                files: {
                    './generated/js/templates.js': ['./templates/**/*.html', './templates/*.html']
                }
            }
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-underscore-compiler');
    grunt.loadNpmTasks('grunt-then');

    grunt.registerTask('default', function () {
        grunt.task.run(['concat', 'underscore'])
            .then(function () {
                var content = fs.readFileSync('./generated/js/main.js', 'utf8'),
                    templates = fs.readFileSync('./generated/js/templates.js', 'utf8'),
                    template = fs.readFileSync('./entityview.template.js', 'utf8'),
                    fileContent = grunt.template.process(template, { data: { content: content, templates: templates } });

                grunt.file.write('./backbone.marionette.entityview.js', fileContent);
            });
    });
};
/**
 * Created by Sammi on 5/6/2016.
 */
