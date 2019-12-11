import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import history from '../../history';
import { fetchStream, editStream } from '../../actions/index';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        console.log(this.props)
        if(!this.props.stream) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            )
        }

        if(this.props.currentUserId !== this.props.stream.userId) {
            return (
                <div className="ui placeholder segment">
                    <div className="ui icon header">
                        USER ID DOES NOT MATCH!
                    </div>
                    <button className="ui button primary" onClick={() => history.push('/')}>OK</button>
                </div>
            )
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId
    };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);