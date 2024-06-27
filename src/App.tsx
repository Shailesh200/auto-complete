import React, { useEffect, useState } from 'react';
import './App.css';

import { useLegacyState } from './customHooks/useLegacyState';
import { useDebounce } from './customHooks/useDebounce';

import Header from './components/Header';
import Suggestions from './components/Suggestions';
import Input from './components/Input';

import { API_URL, NETWORK_ERROR } from './constants/constants';
import { IProductInterface } from './constants/interfaces';

function App() {
  const [state, setState] = useLegacyState({
    searchtext: '',
    suggestions: [],
    loading: false,
    users: [],
    productSelected: false
  });
  const [cache, setCache] = useState<{ [key: string]: [] }>({});
  const { searchtext, suggestions, loading, productSelected } = state;
  const debouncedValue = useDebounce<string>(searchtext, 500);

  useEffect(() => {
    const getData = async (value: string) => {
      try {
        if (cache[value]) {
          console.log('Returning for Cache: ', cache);
          setState({
            suggestions: cache[value],
          });
        } else {
          const response = await fetch(API_URL);

          console.log('Returning from API');
          if (!response.ok) {
            throw new Error(NETWORK_ERROR);
          }

          const users = await response.json();
          setState({
            users,
            loading: false
          });
          const filteredUsers = users.filter((user: IProductInterface) =>
            user.title.toLowerCase().includes(value.toLowerCase())
          );
          setCache({ ...cache, [value]: filteredUsers });
          console.log('Cache: ', cache);
          setState({
            suggestions: filteredUsers,
            loading: false
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (debouncedValue) {
      setState({ loading: true })
      getData(debouncedValue);
    } else {
      setState({ suggestions: [] });
    }
  }, [debouncedValue, cache, setState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      searchtext: e.target.value,
      productSelected: false,
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className='input-form'>
        <Input
          searchtext={searchtext}
          handleInputChange={handleInputChange}
          loading={loading}
          productSelected={productSelected}
        />
        <Suggestions
          suggestions={suggestions}
          inputValue={searchtext}
          productSelected={productSelected}
          setState={setState}
        />
      </div>
    </div>
  );
}

export default App;
