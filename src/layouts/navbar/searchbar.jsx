import React, { useState } from 'react';
import { Input } from 'antd';
import { search } from '../../api/search';

export const SearchBar = () => {
    const { Search } = Input;
    const [searchData, setSearchData] = useState([]);
    // const [reload, setReload] = useState(false);
  
    const onSearch = async (value) => {
      if (value !== "") {
        await search({
            key: value
        }).then((res) => {
            setSearchData(res);
        }).catch((error) => console.log(error))
      }
      else {
        setSearchData([])
      }
    }

    const result = [];
    if (searchData.length > 0) {
        searchData.forEach((data) => {
            result.push(
                <a className='data-item-link' href={'/detail/'+(data.character?'kanji/':'vocabulary/')+data.id}>
                    <div className='item'>
                        <span className='japanese'>
                            <span className='character'>{data.character?data.character:data.word}</span>
                            {data.group?data.pronounces[0].Romanji:data.pronounce}
                        </span>
                        <p className='meaning'>{data.group?data.group:data.meaning_vietnamese[0].meaning}</p>
                    </div>
                </a>
            )
        })
    }

    return(
      <div className='search-wrapper'>
        <div className='search-input'>
            <Search style={{ width: 500 }} placeholder="Tìm kiếm từ vựng / hán tự" onSearch={onSearch} enterButton />
        </div>
        <div className='search-result'>
            {result}
        </div>
      </div>
    );
};
export default SearchBar;