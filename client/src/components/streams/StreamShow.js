import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions/index';

class StreamShow extends React.Component {
    constructor(props) {
        super(props)

        this.videoRef = React.createRef();
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.props.fetchStream(id);

        this.bulidPlayer();
    }
    
    componentDidUpdate() {
        this.bulidPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    bulidPlayer() {
        if(this.player || !this.props.stream) {
            return
        } else {
            const { id } = this.props.match.params

            this.player = flv.createPlayer({
                type: 'flv',
                url: `http://localhost:8000/live/${id}.flv`
            });
            this.player.attachMediaElement(this.videoRef.current);
            this.player.load();
        }
    }

    render() {
        if(!this.props.stream) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            )
        }

        const { title, description } = this.props.stream

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>        
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);