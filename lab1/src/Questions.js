import order from "./Order";
import qAndA from "./Q&A";
import React, { Component } from 'react';

class Questions extends Component {
    
    state = {
        currentQ: '1',
        result: '',
    }

    onClickHandle = (e) => {
        const answerID = e.target.id;
        if (!qAndA['q' + this.state.currentQ].answers[answerID].end) {
            this.setState({
                currentQ: order[this.state.currentQ][answerID],
            });
         } else {
            this.setState({
                result: order[this.state.currentQ][answerID],
            });
        }
    };

    render() {
        const buttonArr = [];
        console.log(this.state);
        for (const key in qAndA['q' + this.state.currentQ].answers) {
            const element = qAndA['q' + this.state.currentQ].answers[key].value;
            buttonArr.push(
                <button key={key[1]} id={key} onClick={this.onClickHandle}>{element}</button>
            )
        };
        if (this.state.result) {
            return (
                <div>
                    <h1>
                        Ваш язык программирования: {this.state.result};
                    </h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>
                        {qAndA['q' + this.state.currentQ].question}
                    </h1>
                    <div>
                        {buttonArr}
                    </div>
                </div>
            );
        }
    }
}

export default Questions;