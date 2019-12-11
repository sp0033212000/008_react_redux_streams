import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions/index';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions = () => {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    render() {
        if(!this.props.stream) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            )
        }

        if(this.props.stream) {
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
        }

        return (
            <Modal
                title="Delete Stream"
                content={`Are you sure you want to delete this stream with title: ${this.props.stream.title}`}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);