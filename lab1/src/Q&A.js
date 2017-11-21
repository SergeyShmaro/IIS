export default {
    q1: { 
        question: "Язык программирования...",
        answers: {
            a1: {
                value: "Высокоуровневый",
                end: false
            },
            a2: {
                value:"Низкоуровневый", 
                end: true
            }, // языки ассемблера
        }
        
    },
    q2: {
        question: "Парадигма программирования ...",
        answers: {
            a1: {
                value: "Императивная",
                end: false
            },
            a2: {
                value: "Декларативная",
                end: false
            },
        }
    },
    q3: {
        question: "Работа с базами данных?",
        answers: {
            a1: {
                value: "Да.",
                end: true
            }, // sql
            a2: {
                value: "Нет.",
                end: true
            }, // html
        }
    },
    q4: {
        question: "Его изучают в средних классах школы?",
        answers: {
            a1: {
                value: "Да.",
                end: true
            }, // pascal
            a2: {
                value: "Нет.",
                end: false
            },
        }
    },
    q5: {
        question: "Типизация ...",
        answers: {
            a1: {
                value: "Статическая.",
                end: false
            },
            a2: {
                value: "Динамическая.",
                end: false
            },
        }
    },
    q6: {
        question: "Первоначально был предназначен для внедрения в браузер?",
        answers: {
            a1: {
                value: "Да.",
                end: true
            }, // JavaScript
            a2: {
                value: "Нет.",
                end: true
            }, // Python
        }
    },
    q7: {
        question: "Работает на любой компьютерной архитектуре?",
        answers: {
            a1: {
                value: "Да.",
                end: true
            }, // Java
                a2: {
                value: "Нет.",
                end: false
            }, 
        }
    },
    q8: {
        question: "Год создания ...",
        answers: {
            a1: {
                value: "<1990",
                end: true
            }, // c++
            a2: {
                value: "1990-2000",
                end: true
            }, // c#
            a3: {
                value: ">2000",
                end: true
            }, // go
        }
    },
}
