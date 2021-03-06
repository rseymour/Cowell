var React = require('react/addons');
var Button = require('button');
var Cowell = React.createClass({
  getDefaultProps: function() {
    return(
      {
        colors: ['cyan','salmon','violet','greenyellow']
      }
    );
  },
  getInitialState: function() {
    return(
      {
        sequence: [],
        playerInput: [],
        currentIndex: 0
      }
    );
  },
  playSequence: function() {
    var i = 0
    var seq = this.state.sequence;
    var rock = function() {
      if (i%2) {
        console.log("playin blank");
        this.setState({litButton:undefined});
      } else {
        console.log("playin " + seq[i/2]);
        this.setState({litButton:seq[i/2]});
      }

      i++;
      if (i > seq.length*2) {
        clearInterval(playing);
      }
    }
    var playing = setInterval(rock.bind(this),300);
  },
  chooseColor: function(c) {
    if (c == this.state.sequence[this.state.currentIndex]) {
      if (this.state.sequence.length == this.state.currentIndex + 1) {
        console.log("good job");
        // add the color
        // play new sequence
        var newColor = this.choice(this.props.colors);
        this.setState({playerInput: [],
                      currentIndex: 0,
                      sequence: this.state.sequence.concat([newColor])
                      },this.playSequence
                     );
        this.setState({litButton:""});
      } else {
        console.log("keep going");
        this.setState({playerInput: this.state.playerInput.concat([c]),
                       currentIndex: this.state.currentIndex + 1});
      }
    } else {
      console.log("you messed up.");
      this.setState(this.getInitialState());
    }
  },
  choice: function(x) {
    return (x[Math.floor(Math.random() * x.length)]);
  },
  newGame: function() {
    this.setState({
      sequence: [this.choice(this.props.colors)],
      playerInput: [],
      currentIndex: 0,
      litButton: ""
    },this.playSequence);
  },
  render: function() {
    var buttons = this.props.colors.map( function(c) { return (
      <Button chooseColor={this.chooseColor} key={c} lit={c === this.state.litButton ? true : false} color={c}/>
    ); }, this);
    return (
      <div>
        <h1 onClick={this.newGame}>New Game</h1>
        <h1>Score: {this.state.sequence.length -1}</h1>
        {buttons}
      </div>
    );
  }
});

module.exports = Cowell;
