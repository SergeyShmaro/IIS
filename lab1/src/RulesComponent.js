import React, { Component } from 'react';
import arrOfRules from "./rules";
import _ from 'lodash';

class Rules extends Component {

    constructor() {
        super();
        const aims = [];//= arrOfRules.map( item => item.split(' -> ')[1].split(' = ')[0] );
        for (let i = 0; i < arrOfRules.length; i++) {
            let aim = arrOfRules[i].split(' -> ')[1].split(' = ')[0];
            if (aims.indexOf(aim) === -1) {
                aims.push(aim);
            }
        }
        this.state = {
            aims: aims,
            aim: '',
            properties: { },
            propAnsw: { }
        };
        console.log(aims);
    }

    searchQuestions = aim => {
        let result = { };
        const rules = {
            left: arrOfRules.map( item => item.split(' -> ')[0].split(' & ') ),
            right: arrOfRules.map( item => item.split(' -> ')[1].split(' = ')[0] ),
        }

        const index = rules.right.indexOf(_.trim(aim));
        for (let i = 0; i < rules.left[index].length; i++) {
            const item = rules.left[index][i];
            const expr = item.split(' = ')[0];
            if (this.state.aims.indexOf(expr) !== -1) {
                result = { ...result, ...this.searchQuestions(expr) }
            } else {
                result[expr] = '';
            }
        }

        return result;
    }

    searchAnswers = (prop) => {
        const temp = arrOfRules.map( item => item.split(' -> ')[0].split(' & ') );
        let bigArr = [];

        temp.forEach( item => {
            item.forEach( elem => {
                bigArr.push(elem);
            })
        });
        const result = { };
        bigArr.forEach(item => {
            const expr = item.split(' = ');
            if (expr[0] in prop) {
                if (!(expr[0] in result)) {
                    result[expr[0]] = [expr[1]];
                } else {
                    if (result[expr[0]].indexOf(expr[1]) === -1) {
                        result[expr[0]].push(expr[1]);
                    }
                }
            }
        });

        return result;
    }

    clickOnAim = (e) => {
        const aim = e.target.innerHTML;
        const prop = this.searchQuestions(aim);
        console.log(prop);
        const answers = this.searchAnswers(prop);
        console.log(answers);

        this.setState({
            aim: aim,
            properties: prop,
            propAnsw: answers,
        })
    }

    handleAnswer = (e) => {
        const answ = _.trim(e.target.innerHTML);
        let question;
        for (const key in this.state.properties) {
            const element = this.state.properties[key];
            if (!element) {
                question = key;
                break;
            }
        }
        const newStateProp = { ...this.state.properties };
        newStateProp[question] = answ;
        this.setState({
            properties: newStateProp,
        });        
    }

    refresh = () => {
        const aims = [];//= arrOfRules.map( item => item.split(' -> ')[1].split(' = ')[0] );
        for (let i = 0; i < arrOfRules.length; i++) {
            let aim = arrOfRules[i].split(' -> ')[1].split(' = ')[0];
            if (aims.indexOf(aim) === -1) {
                aims.push(aim);
            }
        }
        this.setState( {
            aims: aims,
            aim: '',
            properties: { },
            propAnsw: { }
        });
    }

    searchResult = () => {
        let answer;

        const rules = {
            left: arrOfRules.map( item => item.split(' -> ')[0].split(' & ') ),
            right: arrOfRules.map( item => item.split(' -> ')[1] ),
        }

        let result = [];
        for (const key in this.state.properties) {
            const element = this.state.properties[key];
            result.push(`${key} = ${element}`);
        }
        let count = 0;
        let deleted = [];
        for (let i = 0; i < rules.left; i++) {
            const arr = rules.left[i];
            const index = i;
        }
        const resultObj = { rules: [] };
        rules.left.forEach( (arr, index) => {
            if (!(result[0].split(' = ')[0] === _.trim(this.state.aim))) {

                result.forEach( (item, i) => {
                    if (arr.indexOf(item) !== -1) {
                        deleted.push(item); 
                        count++;
                    }
                })

                if (count === 2) {
                    count = 0;
                    deleted.forEach(item => {
                        result.splice(result.indexOf(item), 1);
                    });
                    deleted = [];
                    result.push(rules.right[index]);
                    resultObj.rules.push(arrOfRules[index]);
                } else {
                    console.log()
                    count = 0;
                    result = [...result];
                    deleted = [];
                }
            }            
        });
        resultObj.result = result;

        return resultObj;
    }

    render() {
        if (!this.state.aim) {
            const buttonArr = this.state.aims.map( (item, index) => {
                return (
                    <button onClick={this.clickOnAim} key={index}> {item} </button>
                )
            });

            return (
                <div>
                    <h1>
                        Выберите цель:
                    </h1>
                    {buttonArr}
                </div>
            );
        } else {
            let question;
            for (const key in this.state.properties) {
                const element = this.state.properties[key];
                if (!element) {
                    question = key;
                    break;
                }
            } 
            if (question) {
                const buttonArr = this.state.propAnsw[question].map( (item, i) => {
                    return (
                        <button onClick={this.handleAnswer} key={i}>{item}</button>
                    )
                })
                return (
                    <div>
                        <h1>
                            {question}
                        </h1>
                        {buttonArr}
                    </div>
                )
            } else {
                const { result, rules } = this.searchResult();
                const listOfRules = rules.map((item, i) => {
                    return (
                        <li key={i}>
                            {item}
                        </li>
                    );
                });
                return (
                    <div>
                        <h1 onClick={this.refresh}>{result}</h1>
                        <ul>
                            {listOfRules}
                        </ul>
                    </div>
                )
            }
        }
    }
}

export default Rules;