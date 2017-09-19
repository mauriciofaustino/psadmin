"use strict";

var React = require('react');

var CourseList = React.createClass({
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },
    render: function() {
        var createCourseRow = function(course) {
            return (
                <tr key={course.id}>
                    <td><a href={course.watchHref}>Watch</a></td>
                    <td>{course.id}</td>
                    <td>{course.title}</td>
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