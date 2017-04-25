import React, {PropTypes, Component} from 'react';
import Carousel from 'nuka-carousel';
var Slider = require('react-slick');

var SampleNextArrow = React.createClass({
  render: function() {
    return <div {...this.props}></div>;
    }
  });

  var SamplePrevArrow = React.createClass({
    render: function() {
      return (
        <div {...this.props}></div>
      );
    }
  });

  class CategoryScrollView extends Component {
    constructor(props){
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(category){
      this.props.PostPagingDetail({
        shortAs: this.props.datetime.shortAs,
        category: category._id,
        categoryName: category.name,
        pageNumber: 1,
        pageSize: this.props.datetime.pageSize
      });
      this.props.getAllPost({
        shortAs: this.props.datetime.shortAs,
        category: category._id,
        pageNumber: 1,
        action: 'rebind'
      })
    }
    render() {
      let slideNumber = 6;
      if (this.props.categories.length < 6) {
        slideNumber = this.props.categories.length + 1;
      }

      const settings = {
        dots: false,
        infinite: false,
        slidesToShow:slideNumber,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow/>,
      prevArrow: <SamplePrevArrow/>
  };

  return (
    <div className="row well category-list">
      <Slider {...settings}>
        <div key="-1">
          <a  onClick={()=>{this.handleClick('')}} className={"CategoryScrollView"}>All</a>
        </div>
        {this.props.categories.map((category, index) => (
          <div key={index}>
            <a  onClick={()=>{this.handleClick(category)}} className={this.props.datetime && this.props.datetime.category == category._id ? "CategoryScrollView CategoryActive" : "CategoryScrollView"}>{category.name}</a>
          </div>
        ))}
      </Slider>
    </div>
  )
}
}

CategoryScrollView.propTypes = {
  categories: PropTypes.array
};

export default CategoryScrollView;
