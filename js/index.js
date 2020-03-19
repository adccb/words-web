const CHOICES = {};

// state
class ReportingInput extends HTMLSelectElement {
  constructor() {
    super();

    this.addEventListener(
      "change",
      e => (CHOICES[this.dataset.tier] = e.target.value)
    );
  }

  appendChild(child) {
    if (!this.firstChild) {
      this.className = `${this.className} visible`;
    }

    super.appendChild(child);
  }
}

customElements.define("reporting-input", ReportingInput, { extends: "select" });

// utilities
const buildInput = className => {
  const element = document.createElement("select", { is: "reporting-input" });
  element.dataset.tier = className;
  return element;
};

const optionsFor = (target, words) => {
  while (target.firstChild) target.firstChild.remove();

  const el = document.createElement("option");
  el.appendChild(document.createTextNode("-- select a word --"));
  target.appendChild(el);

  words.forEach(word => {
    const el = document.createElement("option");
    el.appendChild(document.createTextNode(word));
    el.value = word;
    target.appendChild(el);
  });
};

// main
document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  document.getElementById("root").appendChild(container);

  const one = buildInput("one");
  const two = buildInput("two");
  const three = buildInput("three");

  // render on screen
  container.appendChild(one);
  container.appendChild(two);
  container.appendChild(three);

  // add the options in order
  optionsFor(one, Object.keys(window.words));
  one.addEventListener("change", () =>
    optionsFor(two, Object.keys(window.words[CHOICES["one"]]))
  );

  two.addEventListener("change", () =>
    optionsFor(three, window.words[CHOICES["one"]][CHOICES["two"]])
  );
});
