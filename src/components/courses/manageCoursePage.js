"use strict";

var React = require('react');
var Router = require('react-router');
var Toastr = require('toastr');
var AuthorStore = require('../../stores/authorStore');
var CourseActions = require('../../actions/courseActions');
var CourseForm = require('./courseForm');

var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function() {
        return {
            course: {
                id: '',
                title: '',
                length: '',
                category: '',
                author: {},
                watchHref: ''
            },
            authorOptions: AuthorStore.getAllAuthors(),
            errors: {},
            dirty: false
        };
    },

    setCourseState: function(event) {
        this.setState({dirty: true});

        var field = event.target.name;
        var value = event.target.value;
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
            // updateCourse
        } else {
            CourseActions.createCourse(this.state.course);
        }
        this.setState({dirty: false});
        Toastr.success('Course saved.');
        this.transitionTo('courses');
    },

   render: function() {
       return (
            <CourseForm
                authorOptions={this.state.authorOptions}
                course={this.state.course}
                onChange={this.setCourseState}
                errors={this.state.errors}
                onSave={this.saveCourse}/>
       );
   }
});

module.exports = ManageCoursePage;