import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from 'classnames'

import './Bookmark.css'

const Bookmark = (props) => {
  const store = useSelector((state) => state, []);
  const isActive = store.show.currentPage;

  const bookmarkClass = classNames({
    "bookmark-shape": true,
    "bookmark-shape-activated": isActive === parseInt(props.pageNum),
  });

  return (
    <div
      className={bookmarkClass}
      style={{
        color: props.color,
        background: props.background,
        top: props.top
      }}
      onClick={props.action}
      >
      <span className="bookmark-text">{props.text}</span>
    </div>
  );
};

export default Bookmark;
