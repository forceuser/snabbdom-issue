import snabbdom from "snabbdom";
import h from "snabbdom/h"; // snabbdom hyperscript
import snabbdomProps from "snabbdom/modules/props";
import snabbdomAttrs from "snabbdom/modules/attributes";
import snabbdomEvents from "snabbdom/modules/eventlisteners";
import snabbdomClass from "snabbdom/modules/class";
import snabbdomStyle from "snabbdom/modules/style";
import countries from "mledoze/countries";
const exclude = ["kingdom", "federal", "islamic", "republic", "state", "territory", "commonwealth"];
// INITIALIZING TEST DATA
const data = countries.map(country => country.name.official.toLowerCase()).filter(i => !exclude.some(v => i.includes(v))).sort();

const patch = snabbdom.init([
	snabbdomProps,
	snabbdomAttrs,
	snabbdomEvents,
	snabbdomClass,
	snabbdomStyle
]);

const renderList = ListView(document.querySelector(".container"), {items: data});

let flag = true;
document.querySelector(".header").classList.remove("hide");
setInterval(testRender, 3000);
testRender();

function testRender () {
	renderList({items: filterData(flag = !flag ? "b" : "")});
}

function filterData (val = "") {
	const value = val.trim().toLowerCase();
	return value ? data.filter(i => i.includes(value)) : data;
}

function ListView (parent, initialState = {}) {
	let vdom;
	const defaultState = {items: []};
	const state = Object.assign(defaultState, initialState);
	return function render (newState) {
		Object.assign(state, newState);
		vdom = patch(vdom || parent, h("div", {}, [
			...state.items.map(item =>
				h("input", {key: item, attrs: {"data-key": item}, props: {value: item}, class: {target: item === "bermuda"}}, item)
			)
		]));
	};
}
