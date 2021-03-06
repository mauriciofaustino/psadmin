"use strict";

var React = require('react');
var Router = require('react-router');
var Toastr = require('toastr');
var AuthorStore = require('../../stores/authorStore');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var CourseForm = require('./courseForm');

var _getCourseState = function(id) {
    return CourseStore.getCourseById(id);
};

var _getAuthorFormattedForDropdown = function(author) {
    return {
        value: author.id,
        text: author.firstName + ' ' + author.lastName
    };
};

var _getAuthorFormattedForSave = function(author) {
    return {
        id: author.id,
        name: author.firstName + ' ' + author.lastName
    };
};

var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation,
        Router.State
    ],

    getInitialState: function() {
        return {
            course: {
                id: '',
                title: '',
                length: '',
                category: '',
                author: '',
                watchHref: ''
            },
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function() {
        CourseStore.addChangeListener(this._onChange);

        //need to transform author list into an array of objects
        //for use in the author dropdown.
        this.setState({allAuthors: AuthorStore.getAllAuthors().map(_getAuthorFormattedForDropdown) });

        var id = this.props.params.id; // from the path `/course/:id`

        if (id) {
            this.setState({course: _getCourseState(id)});
        }
    },

    componentWillUnmount: function() {
        CourseStore.removeChangeListener(this._onChange);
    },

    setCourseState: function(event) {
        this.setState({dirty: true});

        var field = event.target.name;
        var value = event.target.value;

        if (field === 'author') {
            value = _getAuthorFormattedForSave(AuthorStore.getAuthorById(value));
        }

        this.state.course[field] = value;
        return this.setState({course: this.state.course});
    },

    courseFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors

        if (this.state.course.title.length < 3) {
            this.state.errors.title = 'Course title must be at lease 3 characters.';
            formIsValid = false;
        }

        if (this.state.course.category.length < 3) {
            this.state.errors.category = 'Course title must be at lease 3 characters.';
            formIsValid = false;
        }

        if (!this.state.course.author) {
            this.state.errors.author = 'Select an author.';
            formIsValid = false;
        }

        if (this.state.course.length.search('\\d*:\\d\\d') !== 0) {
            this.state.errors.length = 'Insert a valid course length.';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    saveCourse: function(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }
        if(this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            console.log(this.state.course);
            CourseActions.createCourse(this.state.course);
        }
        this.setState({dirty: false});
        Toastr.success('Course saved.');
        this.transitionTo('courses');
    },

    _onChange: function() {
        this.setState(_getCourseState());
    },

   render: function() {
       return (
            <CourseForm
                allAuthors={this.state.allAuthors}
                course={this.state.course}
                onChange={this.setCourseState}
                errors={this.state.errors}
                onSave={this.saveCourse}/>
       );
   }
});

module.exports = ManageCoursePage;