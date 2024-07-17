const miniReact = { createElement, render };

const renderElement = (fn, props) => {
  return fn(props);
};

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

  if (typeof type === "function") {
    const obj = renderElement(type, props);
    render(obj, container);
  } else {
    let domEl;
    if (type) {
      domEl = document.createElement(type);
    }

    Object.entries(props)
      .filter(([key]) => key !== "children")
      .forEach(([key, value]) => (domEl[key] = value));

    if (props.children) {
      props.children.forEach((child) => {
        if (typeof child === "string") {
          domEl.textContent = domEl.textContent + child;
        } else {
          render(child, domEl);
        }
      });
    }

    container.appendChild(domEl);
  }
}

function App(props) {
  return miniReact.createElement(
    "div",
    null,
    miniReact.createElement("h1", null, "Hello, ", props.name)
  );
}

//renderElement(App, { name: "world" });

const element = miniReact.createElement(App, { name: "world" });

const container = document.getElementById("root");
miniReact.render(element, container);
