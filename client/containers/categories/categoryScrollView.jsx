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
    render() {
      let slideNumber = 6;
      if (this.props.categories.length < 6) {
        slideNumber = this.props.categories.length
      }

      const settings = {
        dots: false,
        infinite: true,
        slidesToShow:slideNumber,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
      };

        return (
            <div className="row well category-list">
                <Slider {...settings}>
                    {this.props.categories.map((category, index) => (
                        <div key={index}>
                            {category.name}
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
