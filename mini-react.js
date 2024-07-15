const miniReact = { createElement, render };

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

function render(element, container) {
  const { type, props } = element;
  const domEl = document.createElement(type);
  const filterArr = Object.entries(props).filter(([key]) => key !== "children");

  filterArr.forEach(([key, value]) => (domEl[key] = value));

  if (props.children) {
    props.children.forEach((i) => render(i, domEl));
  }

  container.appendChild(domEl);
}

const element = miniReact.createElement(
  "div",
  { id: "foo", className: "fooFoo" },
  miniReact.createElement("a", { id: "foo2", className: "fooFoo" }),
  miniReact.createElement("b", { id: "foo3", className: "fooFoo" })
);

const container = document.getElementById("root");
miniReact.render(element, container);
