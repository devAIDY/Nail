import React, { Component, Fragment } from 'react'
import axios from 'axios'
import '../Assets/Css/style.css';
import { Row, Col, Spinner } from 'reactstrap';
export class AfterHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            posting: false
        }

    }

    componentDidMount() {
        this.getdata();
    }

    getdata() {
        this.setState({ posting: true }, () => {
            axios.post('https://nailsa2z.com:5027/api/v1/banner/get_all_banner', {
            })
                .then((response) => {
                    this.setState({
                        banner: response.data.data,
                        posting: false
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        });

    }

    render() {
        const { banner, posting } = this.state;
        return (
            <Fragment>
                {posting && banner.length === 0 &&
                    <Row className="mx-0 px-">
                        <Col className='col-12 text-center'>
                            <Spinner className='spin_loader' />
                        </Col>
                    </Row>
                }

                {banner.map((item, x) => {
                    return (
                        <span key={x} className='m-2'>
                            <img src={`https://nailsa2z.com:5027/files/${item.image}`} loading="lazy" alt="banner" className="banner_img" />
                        </span>)
                })
                }
            </Fragment >
        )
    }
}

export default AfterHeader