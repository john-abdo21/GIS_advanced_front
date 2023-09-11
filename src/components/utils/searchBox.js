import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterText } from '../../features/filter/ShowReducer'
import { SearchOutlined } from '@ant-design/icons'
import './css.css'

const SearchBox = () => {
  const dispatch = useDispatch()
  const filterText = useSelector(state => state.show.filterText)
  const onChangeFilterText = e => {
    dispatch(setFilterText(e.target.value))
  }
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search anything"
        className="search-input"
        value={filterText}
        onChange={onChangeFilterText}
      />
        <a href="#" className="search-btn">
          <SearchOutlined className='icon' />
        </a>
    </div>
  );
}

export default SearchBox