import React from "react";
import PropTypes from "prop-types";

import { PLAYER_ICON_RADIUS, PLAYER_MOVE_SOUND } from "../constants";

export default class Player extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onMovingStart: PropTypes.func.isRequired,
    onMovingEnded: PropTypes.func.isRequired
  }

  // The player-icon looks more in-place with this offset
  static POSITION_OFFSET = 0;

  constructor(props){
    super(props);

    this.state = {
      x: this.props.x,
      y: this.props.y
    }

    this.audio = new Audio(PLAYER_MOVE_SOUND);
    this.audio.volume = 0.35;
  }

  componentWillReceiveProps(newprops){
    this.setState({
      x: newprops.x,
      y: newprops.y
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.x !== prevProps.x || this.props.y !== prevProps.y){
      this.props.onMovingStart();
    }
    this.audio.play();
  }

  render(){
    return <g id="player-icon" style={{
        transform: "translate(" + (this.state.x + Player.POSITION_OFFSET) + "px," + (this.state.y + Player.POSITION_OFFSET) + "px)"
      }}
      // onTransitionStart does not work, see componentDidUpdate
      onTransitionEnd={this.props.onMovingEnded}>
      <circle cx={0} cy={0} r={PLAYER_ICON_RADIUS}/>
    </g>;
  }
}
