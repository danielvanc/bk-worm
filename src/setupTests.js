import "@testing-library/jest-dom/extend-expect";

jest.mock("next/dynamic", () => (func) => {
  let component = null;
  func().then((module) => {
    component = module.default;
  });
  const DynamicComponent = (...args) => component(...args);
  DynamicComponent.displayName = "LoadableComponent";
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});
