import React, { useEffect, useState } from 'react'
import './App.css'
import Recipe from './recipe'

const App = () => {

  const APP_KEY = '542d3e19a099db7aad2452eedaf32591'
  const APP_ID = '79397501'

  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    commenceSearch()
  }, [search])

  const commenceSearch = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data)
  }

  const updateSearch = (e) => {
    setQuery(e.target.value)
  }

  const searchSubmit = (e) => {
    e.preventDefault()
    setSearch(query)
  }

  return <div className='App'>
    <div>
      <form
        className='search-form'
        onSubmit={searchSubmit}
      >
        <input
          value={query}
          onChange={updateSearch}
          className='search-bar'
        />
        <button
          className='search-button'
        >SEARCH</button>
      </form>
      <div className='recipe1'>
        {recipes.map(recipe => (
          <Recipe
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  </div>
}

export default App