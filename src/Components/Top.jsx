import React, { Component, Fragment } from 'react'
import { Row, Col, Card, Button, CardText, Spinner } from 'reactstrap';
import '../Assets/Css/style.css';
import axios from 'axios'
export class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgData: [],
            sliceimgData: [],
            all: false,
            posting: false,
            slide: {}
        }
    }
    getAllData = () => {
        this.setState({ all: !this.state.all })
    }
    componentDidMount() {
        this.getdata();
    }

    getdata() {
        this.setState({ posting: true }, () => {
            axios.post('https://nailsa2z.com:5027/api/v1/category/get_all_category', {
                'parent_cat': ''
            })
                .then((response) => {
                    this.setState({
                        imgData: response.data.data,
                        sliceimgData: response.data.data.slice(0, 4),
                        posting: false,
                        slide: { a: 0, b: 4 }
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        })

    }

    moreData = (type) => {
        if (type === 'plus') {
            this.setState({
                sliceimgData: this.state.imgData.slice((this.state.slide.a + 4), (this.state.slide.b + 4)),
                slide: { a: this.state.slide.a + 4, b: this.state.slide.b + 4 }
            })
        }
        else {
            this.setState({
                sliceimgData: this.state.imgData.slice((this.state.slide.a - 4), (this.state.slide.b - 4)),
                slide: { a: this.state.slide.a - 4, b: this.state.slide.b - 4 }
            })
        }
    }


    render() {
        const { imgData, all, sliceimgData, posting } = this.state;

        const newArr = all ? imgData : sliceimgData;
        return (
            <Fragment>
                <Row className='mx-0 mt-4'>
                    <Col className='top_text col-12'>
                        Top Categories
                    </Col>
                </Row>
                <Row className='mx-0 mb-4'>
                    {posting && newArr.length === 0 &&
                        <Col className='col-12 text-center'>
                            <Spinner className='spin_loader' />
                        </Col>}
                    <Col className='col-12 arrow_move'>
                        <Button
                            size="sm"
                            className="arrow_icon m-2"
                            onClick={() => { this.moreData('neg') }}
                            disabled={this.state.slide.a === 0 && this.state.slide.b === 4}
                        >
                            {'<'}
                        </Button>
                        <Button
                            size="sm"
                            className="arrow_icon"
                            onClick={() => { this.moreData('plus') }}
                            disabled={newArr.length === 0}
                        >{'>'}</Button>
                    </Col>
                    {newArr.length > 0 ?
                        newArr.map((item, x) => {
                            return (
                                <Col className="col-sm-3 mt-1" key={x}>
                                    <Card className='img_card shadow rounded'>
                                        <div>
                                            <img className="top_images p-2" loading="lazy" src={`https://nailsa2z.com:5027/files/${item.cat_image}`} alt="Card" />
                                        </div>

                                        <CardText className="card_text">{item.cat_name}</CardText>
                                    </Card>
                                </Col>
                            )
                        })
                        :
                        <Col>
                            <div className="no_record">
                                No Record Found
                            </div>
                        </Col>
                    }
                    <Col className="col-12 text-center mt-3">
                        <Button
                            size="sm"
                            className="see_btn"
                            onClick={() => { this.getAllData() }}
                        >{all ? 'SEE LESS' : 'SEE ALL'}</Button>
                    </Col>

                </Row>
            </Fragment >
        )
    }
}

export default Top;