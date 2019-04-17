import React from "react";
import {Card, CardBody, CardFooter, CardHeader, CardLink, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PublicationForm from "../components/Publication/PublicationForm/PublicationForm";

class Home extends React.Component {

    // TODO get posts from API instead of hard coding
    // TODO Use Publication component
    render() {
        return (
            <Container>
                <Row style={{marginBottom: '20px'}}>
                    <Col sm={12} md={{size: 8, offset: 2}}>
                        <PublicationForm/>
                    </Col>
                </Row>

                <Row>
                    {([1, 2, 3, 4, 5]).map((item, index) => (
                        <Col sm={12} md={{size: 8, offset: 2}} key={index} style={{marginBottom: '25px'}}>
                            <Card>
                                <CardHeader>
                                    <img className={"avatar"} src="https://picsum.photos/200" alt={"John Doe avatar"}/>
                                    <Link style={{marginLeft: '10px', color: 'black'}} to={"/users/" + this.props.user.id}>
                                        {this.props.user.first_name} {this.props.user.last_name}
                                    </Link>
                                    <small style={{float: 'right', marginTop: '10px'}}>
                                        Le 10/03/2019 à 12:06
                                    </small>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>Lorem Ipsum</CardTitle>
                                    <CardText className={"text-justify"}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae justo vel
                                        sem
                                        euismod interdum vel et nisi. Nunc ut nisl quam. Cras hendrerit eget ligula id
                                        lacinia. Vestibulum nec dictum quam. Morbi non nisi a lorem fermentum finibus
                                        eget
                                        sit amet felis. Fusce nec nulla quis leo feugiat ultrices. Aliquam at leo
                                        fringilla,
                                        sagittis justo sit amet, mollis leo.<br/>

                                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor
                                        sit
                                        amet, consectetur adipiscing elit. Ut ac nunc tristique, finibus orci eu,
                                        sodales
                                        mauris. Donec tincidunt ex at purus feugiat, vitae luctus justo porta. Curabitur
                                        vel
                                        gravida tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                                        Cras
                                        ut sapien ut neque tincidunt rhoncus vel eu quam.<br/>
                                        Sed fermentum, lectus eget fringilla iaculis, augue dui consequat augue, quis
                                        consequat dolor turpis sit amet elit. Integer urna justo, vestibulum pulvinar
                                        egestas et, ullamcorper id mauris. Mauris ligula lacus, hendrerit id lacinia et,
                                        efficitur vel urna. Nulla rutrum molestie metus, vitae rhoncus sapien laoreet a.
                                        Mauris elementum, tortor ut viverra ultrices, nulla est vestibulum lacus, et
                                        cursus
                                        urna nibh in risus. Cras viverra accumsan leo, eleifend ullamcorper metus tempor
                                        quis. Integer vitae mi sagittis, condimentum nunc at, porttitor dolor.
                                        Suspendisse
                                        dapibus sit amet ipsum a fringilla.
                                    </CardText>
                                </CardBody>
                                <CardFooter className={"text-right"}>
                                    <CardLink href="#">{2 * index} commentaire(s)</CardLink>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(Home));
