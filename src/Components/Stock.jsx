import React, { Component, Fragment } from 'react'
import { Row, Col, Card, Button, CardText, Spinner } from 'reactstrap';
import '../Assets/Css/style.css';
import axios from 'axios'
export class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgData: [],
            sliceimgData: [],
            all: false,
            discount: 0,
            posting: false,
            slide: {}
        }

    }
    componentDidMount() {
        this.getdata();
    }

    getAllData = () => {
        this.setState({ all: !this.state.all })
    }


    getdata() {
        this.setState({ posting: true }, () => {
            axios.post('https://nailsa2z.com:5027/api/v1/flashSale/get_stock_clearance', {
            })
                .then((response) => {
                    let updatedArr = [];
                    let type;
                    let last = {}
                    response.data.data.products_list.map((x) => {
                        type = x.product_id.prod_name;
                        x.product_id.colors.map((a) => {
                            a.prod_media.map((data) => {
                                last = { ...data, type }
                                updatedArr.push(last)
                            })
                        })
                    })
                    this.setState({
                        discount: response.data.data.discount_value,
                        imgData: updatedArr,
                        sliceimgData: updatedArr.slice(0, 4),
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
        console.log(this.state.slide)
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
        const { imgData, all, sliceimgData, discount, posting } = this.state;

        const newArr = all ? imgData : sliceimgData;
        return (
            <Fragment>
                <Row className='mx-0 mt-4'>
                    <Col className='top_text col-12'>
                        Stock Clearance <span className='discount_on'>Upto {`${discount}%`} off</span>
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
                        >{'<'}</Button>
                        <Button
                            size="sm"
                            className="arrow_icon"
                            onClick={() => { this.moreData('plus') }}
                            disabled={newArr.length === 0}
                        >{'>'}</Button>
                    </Col>
                    {
                        newArr.length > 0 ?
                            newArr.map((item, x) => {
                                return (
                                    <Col className="col-3 mt-1" key={x}>
                                        <Card className='img_card shadow rounded'>
                                            <div>
                                                <img className="top_images p-2" src={`https://nailsa2z.com:5027/products/${item.media_url}`} loading="lazy" alt="Card" />
                                            </div>

                                            < CardText className="card_text">{item.type}</CardText>
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
                            className="clear_btn"
                            onClick={() => { this.getAllData() }}
                        >{all ? 'LESS CLEARANCE' : 'MORE CLEARANCE'}</Button>
                    </Col>

                </Row>
            </Fragment >
        )
    }
}

export default Stock;