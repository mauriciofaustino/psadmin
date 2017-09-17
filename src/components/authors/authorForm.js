"use strict";

var React = require('react');

var AuthorForm = React.createClass({
    render: function() {
        return (
            <form>
                <h1>Manage Author</h1>
                <lable htmlFor="firstName">First Name</lable>
                <input type="text"
                       name="firstName"
                       className="form-control"
                       planceHolder="First Name"
                       ref="firstName"
                       onChange={this.props.onChange}
                       value={this.props.author.firstName} />
                <br />

                <lable htmlFor="lastName">Last Name</lable>
                <input type="text"
                       name="lastName"
                       className="form-control"
                       planceHolder="Last Name"
                       ref="lastName"
                       onChange={this.props.onChange}
                       value={this.props.author.lastName} />
                <br />

                <input type="submit" value="Save" className="btn btn-default" />
            </form>
        );
    }
});

module.exports = AuthorForm;