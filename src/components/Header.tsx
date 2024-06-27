import { API_URL } from "../constants/constants";

const Header = () => {
    return (
      <div className="header-container">
        <h1>
          Auto Complete complete component using Typescript
        </h1>
        <p>
          Take home assignment for Deel&#39;s Frontend Engineer (React.js)
          position
        </p>
        <p>
          <span className="font-bold">Note: </span>
          The data is fetched from an API at{' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={API_URL}
            className="underline"
          >
            {API_URL}
          </a>{' '}
          and is stored locally in the app&#39;s state
        </p>
      </div>
    );
  };
  
  export default Header;
  