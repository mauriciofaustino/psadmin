"use strict";

var React = require('react');
var Input = require('../common/textInput');
var Select = require('../common/selectInput');

var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        authorOptions: React.PropTypes.array.isRequired,
        errors: React.PropTypes.object
    },

    render: function() {
        return (
            <form>
                <h1>Manage Course</h1>
                <Input
                    name="title"
                    label="Title"
                    value={this.props.course.title}
                    error={this.props.course.title}
                    onChange={this.props.onChange} />
                <Input
                    name="watchHref"
                    label="Watch URL"
                    value={this.props.course.watchHref}
                    error={this.props.course.watchHref}
                    onChange={this.props.onChange} />
                <Input
                    name="length"
                    label="Length"
                    value={this.props.course.length}
                    error={this.props.course.length}
                    onChange={this.props.onChange} />
                <Input
                    name="category"
                    label="Category"
                    value={this.props.course.category}
                    error={this.props.course.category}
                    onChange={this.props.onChange} />
                <Select
                    name="author"
                    label="Author"
                    options={this.props.authorOptions}
                    value={this.props.course.author}
                    error={this.props.course.author}
                    onChange={this.props.onChange} />

                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = CourseForm;