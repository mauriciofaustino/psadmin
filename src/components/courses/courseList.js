"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');
var CourseActions = require('../../actions/courseActions');

var CourseList = React.createClass({
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },

    deleteCourse: function(id, event) {
        event.preventDefault();
        CourseActions.deleteCourse(id);
        toastr.success('Course Deleted');
    },

    render: function() {
        var createCourseRow = function(course) {
            return (
                <tr key={course.id}>
                    <td>
                        <a href={course.watchHref}>Watch</a> &nbsp;
                        <a href="#" onClick={this.deleteCourse.bind(this, course.id)}>Delete</a>
                    </td>
                    <td>{course.id}</td>
                    <td><Link to="manageCourse" params={{id: course.id}}>{course.title}</Link></td>
                    <td>{course.author.name}</td>
                    <td>{course.length}</td>
                    <td>{course.category}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th></th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Length</th>
                        <th>Category</th>
                    </thead>
                    <tbody>
                        {this.props.courses.map(createCourseRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CourseList;