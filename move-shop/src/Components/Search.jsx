import React, { useState } from 'react';

const Search = ({searchItem, setSearch}) => {
    return (
        <div className='flex flex-col items-center gap-4'>
            <p>search {searchItem}</p>
            <input type="search" placeholder='search movies'/>
        </div>
    )

}
export default Search;