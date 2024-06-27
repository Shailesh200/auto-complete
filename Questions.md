# Part 2 - Questions

> Take home assignment for Deel's Frontend Engineer (React.js) position

## Questions

### 1. What is the difference between Component and PureComponent?
Component and PureComponent are both used to create React components, but they differ in how they handle re-rendering.

Component: This is the base class for React components. It always re-renders when its state or props change, regardless of whether the change actually affects the output.

PureComponent: This is a subclass of Component that implements a shallow comparison of the current and next state and props. It only re-renders if it detects a difference. This can lead to performance improvements by avoiding unnecessary renders.

Example where it might break your app:
If your component relies on deep or complex data structures and you switch from Component to PureComponent without ensuring immutability, PureComponent might fail to detect changes and not re-render when expected.

```jsx
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}

const data = { value: 1 };
<MyComponent data={data} />; // If data changes internally, PureComponent might not re-render
```

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
Using Context with ShouldComponentUpdate can be dangerous because ShouldComponentUpdate only checks props and state of the component itself, not the context. If the context value changes but the component’s props and state don’t, ShouldComponentUpdate will return false, and the component won’t re-render even though it should.

### Describe 3 ways to pass information from a component to its PARENT.
- Callback Functions: Pass a function from the parent to the child as a prop. The child can then call this function to pass data back to the parent.
```jsx
function Parent() {
  const handleData = (data) => {
    console.log(data);
  };

  return <Child onData={handleData} />;
}

function Child({ onData }) {
  return <button onClick={() => onData("Hello, Parent!")}>Send Data</button>;
}
```
- Context: Use React’s Context API to allow a child component to update values in a shared context that the parent listens to.
```jsx
const MyContext = React.createContext();

function Parent() {
  const [data, setData] = React.useState("");

  return (
    <MyContext.Provider value={{ data, setData }}>
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  const { setData } = React.useContext(MyContext);
  return <button onClick={() => setData("Hello, Parent!")}>Send Data</button>;
}
```
- Ref Callback: Use a ref callback to access a child component’s instance methods or properties and update the parent.
```jsx
class Parent extends React.Component {
  handleChildUpdate = (childData) => {
    console.log(childData);
  };

  render() {
    return <Child ref={(child) => child && child.updateParent(this.handleChildUpdate)} />;
  }
}

class Child extends React.Component {
  updateParent = (callback) => {
    callback("Hello, Parent!");
  };

  render() {
    return <div>Child</div>;
  }
}
```
### 4. Give 2 ways to prevent components from re-rendering.
- `shouldComponentUpdate` Method: In class components, override this lifecycle method to control whether the component should update.
```jsx
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }
  render() {
    return <div>{this.props.value}</div>;
  }
}
```
- `React.memo`: In functional components, use `React.memo` to memoize the component, preventing it from re-rendering unless its props change.
```jsx
const MyComponent = React.memo(({ value }) => {
  return <div>{value}</div>;
});
```
### 5. What is a fragment and why do we need it? Give an example where it might break your app.
A fragment is a lightweight container for grouping multiple elements without adding extra nodes to the DOM. This is useful for returning multiple elements from a component render method without wrapping them in a div or another container.
```jsx
return (
  <React.Fragment>
    <Child1 />
    <Child2 />
  </React.Fragment>
);
```
Example where it might break your app:
If you rely on the parent element for CSS styling or layout purposes, replacing it with a fragment can break the design.
```jsx
// CSS relies on the parent div
.parent {
  display: flex;
}

function Parent() {
  return (
    <React.Fragment>
      <Child1 />
      <Child2 />
    </React.Fragment>
  );
}
```
### 6. Give 3 examples of the HOC pattern.
- Authentication: A HOC that checks if a user is authenticated before rendering the component.
```jsx
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = useAuth();
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return <Component {...props} />;
  };
}
```
- Logging: A HOC that logs when a component mounts and unmounts.
```jsx
function withLogging(Component) {
  return class extends React.Component {
    componentDidMount() {
      console.log(`${Component.name} mounted`);
    }
    componentWillUnmount() {
      console.log(`${Component.name} unmounted`);
    }
    render() {
      return <Component {...this.props} />;
    }
  };
}
```
- Theming: A HOC that provides theme-related props to a component.
```jsx
function withTheme(Component) {
  return function ThemedComponent(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
}
```
### 7. What's the difference in handling exceptions in promises, callbacks and async...await?
- Promises: Handle exceptions using .catch() method.
```jsx
fetchData()
  .then(data => {
    // handle data
  })
  .catch(error => {
    console.error(error);
  });
```
- Callbacks: Handle exceptions by passing an error as the first argument in the callback.
```jsx
function fetchData(callback) {
  // perform operation
  if (error) {
    callback(error);
  } else {
    callback(null, data);
  }
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
  } else {
    // handle data
  }
});
```
- async/await: Handle exceptions using try/catch blocks.
```jsx
async function fetchData() {
  try {
    const data = await getData();
    // handle data
  } catch (error) {
    console.error(error);
  }
}
```
### 8. How many arguments does setState take and why is it async.
`setState` takes two arguments:

The new state (either as an object or a function returning an object).
An optional callback function that is executed after the state is updated.
setState is asynchronous to batch multiple state updates for performance reasons, ensuring the component re-renders only once.

### 9. List the steps needed to migrate a Class to Function Component.
- Remove Class Syntax: Convert class syntax to function syntax.
```jsx
class MyComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

function MyComponent() {
  return <div>Hello</div>;
}
```
- Convert State: Replace this.state and this.setState with useState.
```jsx
function MyComponent() {
  const [state, setState] = React.useState(initialState);
  return <div>{state}</div>;
}
```
- Replace Lifecycle Methods: Use useEffect to replace lifecycle methods.
```jsx
function MyComponent() {
  React.useEffect(() => {
    // componentDidMount logic
    return () => {
      // componentWillUnmount logic
    };
  }, []);
  return <div>Hello</div>;
}
```
- Update Event Handlers: Remove the need for this by defining event handlers directly.
```jsx
function MyComponent() {
  const handleClick = () => {
    // handle click
  };
  return <button onClick={handleClick}>Click me</button>;
}
```
### 10. List a few ways styles can be used with components.
- Inline Styles: Define styles directly in the component using the style prop.
```jsx
<div style={{ color: 'red', fontSize: '20px' }}>Hello</div>
```
- CSS Modules: Use locally scoped CSS files.
```jsx
import styles from './MyComponent.module.css';

function MyComponent() {
  return <div className={styles.myClass}>Hello</div>;
}
```
- Styled Components: Use a library like styled-components to create styled React components.
```jsx
import styled from 'styled-components';

const MyDiv = styled.div`
  color: red;
  font-size: 20px;
`;

function MyComponent() {
  return <MyDiv>Hello</MyDiv>;
}
```
- CSS-in-JS: Use JavaScript to define CSS.
```jsx
const styles = {
  color: 'red',
  fontSize: '20px'
};

function MyComponent() {
  return <div style={styles}>Hello</div>;
}
```
### 11. How to render an HTML string coming from the server.
To render an HTML string safely, use dangerouslySetInnerHTML:
```jsx
function MyComponent({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
```
Warning: Ensure the HTML string is sanitized to prevent XSS attacks before using this method.
