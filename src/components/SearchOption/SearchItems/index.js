import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  changeLandColor,
  changeForestColor,
  changeRiverColor,
  changeLakeolor,
  changeOthersColor,
  changeLandShow,
  changeForestShow,
  changeRiverShow,
  changeLakeShow,
  changeOtherShow,
} from '../../../features/filter/OptionReducer'

import land from '../../icons/land'

import ListItem from './ListItem'

import './css.css'

function rgbToHex(red, green, blue) {
  const redHex = Math.floor(red).toString(16).padStart(2, '0');
  const greenHex = Math.floor(green).toString(16).padStart(2, '0');
  const blueHex = Math.floor(blue).toString(16).padStart(2, '0');
  return `#${redHex}${greenHex}${blueHex}`;
}
const SearchItems = () => {
  const dispatch = useDispatch()
  const onChangeLandColor = (a)=> {
    dispatch(changeLandColor(rgbToHex(a.metaColor.r,a.metaColor.g,a.metaColor.b)))
  }
  const onChangeForestColor = (a)=> {
    dispatch(changeForestColor(rgbToHex(a.metaColor.r,a.metaColor.g,a.metaColor.b)))
  }
  const onChangeRiverColor = (a)=> {
    dispatch(changeRiverColor(rgbToHex(a.metaColor.r,a.metaColor.g,a.metaColor.b)))
  }
  const onChangeLakeColor = (a)=> {
    dispatch(changeLakeolor(rgbToHex(a.metaColor.r,a.metaColor.g,a.metaColor.b)))
  }
  const onChangeOthersColor = (a)=> {
    dispatch(changeOthersColor(rgbToHex(a.metaColor.r,a.metaColor.g,a.metaColor.b)))
  }
  const onChangeLandShow = (a)=> {
    dispatch(changeLandShow(a.target.checked))
  }
  const onChangeForestShow = (a)=> {
    dispatch(changeForestShow(a.target.checked))
  }
  const onChangeRiverShow = (a)=> {
    dispatch(changeRiverShow(a.target.checked))
  }
  const onChangeLakeShow = (a)=> {
    dispatch(changeLakeShow(a.target.checked))
  }
  const onChangeOtherShow = (a)=> {
    dispatch(changeOtherShow(a.target.checked))
  }
  const options = useSelector(state => state.options, [])
  
  const land_color = options.landOption.color
  const forest_color = options.options.forest.color
  const river_color = options.options.river.color
  const lake_color = options.options.lake.color
  const town_color = options.options.town.color

  const land_show = options.landOption.show
  const forest_show = options.options.forest.show
  const river_show = options.options.river.show
  const lake_show = options.options.lake.show
  const town_show = options.options.town.show
  
  return (
    <div className='right-checkbox-group'>
      <ListItem
        text='Land'
        color={land_color}
        action={onChangeLandColor}
        show={land_show}
        showAction={onChangeLandShow}
      />
      <ListItem
        text='Forest'
        color={forest_color}
        action={onChangeForestColor}
        show={forest_show}
        showAction={onChangeForestShow}
      />
      <ListItem
        text='River'
        color={river_color}
        action={onChangeRiverColor}
        show={river_show}
        showAction={onChangeRiverShow}
      />
      <ListItem
        text='Lake'
        color={lake_color}
        action={onChangeLakeColor}
        show={lake_show}
        showAction={onChangeLakeShow}
      />
      <ListItem
        text='Others'
        color={town_color}
        action={onChangeOthersColor}
        show={town_show}
        showAction={onChangeOtherShow}
      />
    </div>
  );
}

export default SearchItems