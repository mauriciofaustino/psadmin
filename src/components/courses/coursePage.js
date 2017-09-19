"use strict";

var React = require('react');
var CourseStore = require('../../stores/courseStore');
var CourseList = require('./courseList');

var CoursePage = React.createClass({
    getInitialState: function() {
        return {
            courses: CourseStore.getAllCourses()
        };
    },

    componentWillMount: function() {
        CourseStore.addChangeListener(this._onChange);
    },


    componentWillUnmount: function() {
        CourseStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({ courses: CourseStore.getAllCourses() });
    },

    render: function() {
        return (
            <div>
                <h1>Courses</h1>
                <CourseList courses={this.state.courses} />
            </div>
        );
    }
});

module.exports = CoursePage;