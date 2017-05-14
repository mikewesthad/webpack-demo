import "../scss/main.scss";

import moment from "moment";
console.log(`Right now, it's: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);

import {randomInteger} from "./random";
console.log(`A random number: ${randomInteger(0, 10)}`);