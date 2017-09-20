"use strict";

var React = require('react');
var Router = require('react-router');
var Toastr = require('toastr');
var AuthorStore = require('../../stores/authorStore');
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

    saveCourse: function(event) {
        event.preventDefault();

        this.setState({dirty: false});
        Toastr.success('Course saved.');
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