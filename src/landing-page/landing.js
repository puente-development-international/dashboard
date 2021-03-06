import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';

import landingStyle from './landing.module.css';
import { styles } from '../styles';

import DataDashboardLottie from "../js/components/lotties/landing_lottie";
import logo from '../assets/goldClear.png';
import appGif from '../assets/landing/mockAppCropped.gif';
import dashGif from '../assets/landing/mockDashCropped.gif';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
    <Grid textAlign='left' container style={{backgroundColor: "whitesmoke",marginBottom:"70px"}} >
      <Grid.Row columns={2}>
        <Grid.Column>
          <Header
            as='h2'
            content='The Future of International Development'
            textAlign='left'
            style={{
              fontSize: mobile ? '1.6em' : '3.2em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: mobile ? '1.5em' : '3em',
              color:"#3d4852 !important"
            }}
          />
          <Header
            as='h2'
            content=" Use Puente's digital technology to collect and analyze data to empower communities to achieve more sustainable development."
            //inverted
            textAlign='left'
            style={{
              fontSize: mobile ? '1.3em' : '1.5em',
              fontWeight: 'normal',
              marginTop: mobile ? '0.5em' : '1em',
              marginBottom: mobile ? '0.5em' : '1em',
              color:"#3d4852"
            }}
          />
        </Grid.Column>
        <Grid.Column style={{alignItems: "center",marginTop: mobile ? '1em' : '2em'}}>
          <DataDashboardLottie />
        </Grid.Column>
      </Grid.Row>
    </Grid>
)

const DataCollectionSegment = ({ mobile }) => (
  <Grid textAlign='left' style={{backgroundColor: "#F4F1F4",padding:50}} >
    <Grid.Row columns={2} >
    <Grid.Column style={{alignItems: "center",marginTop: mobile ? '1em' : '2em', borderRadius:"10px"}}>
          <Image rounded centered src={appGif} />
      </Grid.Column>
      <Grid.Column>
        <Header
          as='h2'
          content='Collect Data Smarter'
          textAlign='left'
          style={{
            fontSize: mobile ? '1.6em' : '3.2em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em',
            color:"#3d4852 !important"
          }}
        />
        <Header
          as='h2'
          content="Use standardized mobile data collection application. Collect data on the field, track data over time, incorporate photos and collect in multiple languages."
          //inverted
          textAlign='left'
          style={{
            fontSize: mobile ? '1.3em' : '1.5em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1em',
            marginBottom: mobile ? '0.5em' : '1em',
            color:"#3d4852"
          }}
        />
      </Grid.Column> 
    </Grid.Row>
  </Grid>
)

const DashboardSegment = ({ mobile }) => (
  <Grid textAlign='left' style={{backgroundColor: "#F4F1F4", padding:50}} >
    <Grid.Row columns={2} >
      <Grid.Column >
        <Header
          as='h2'
          content='Visualize Insights Faster'
          textAlign='left'
          style={{
            fontSize: mobile ? '1.6em' : '3.2em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em',
            color:"#3d4852 !important"
          }}
        />
        <Header
          as='h2'
          content="Visualize community health insights quicker, create custom forms for monitoring and evaluation, geolocate previously collected records, and download everything collected on the field."
          //inverted
          textAlign='left'
          style={{
            fontSize: mobile ? '1.3em' : '1.5em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1em',
            marginBottom: mobile ? '0.5em' : '1em',
            color:"#3d4852"
          }}
        />
      </Grid.Column>
      <Grid.Column style={{alignItems: "center",marginTop: mobile ? '1em' : '2em', borderRadius:"10px"}}>
          <Image rounded centered src={dashGif} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

const HomepageEnding = ({ mobile }) => (
  <Grid textAlign='center' container style={{backgroundColor: "whitesmoke",marginBottom:"70px"}} >
    <Grid.Row >
      <Grid.Column>
        <Header
          as='h2'
          content='Ready to empower more communities?'
          textAlign='center'
          style={{
            fontSize: mobile ? '1.6em' : '3.2em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '.75em' : '1.5em',
            color:"#3d4852 !important"
          }}
        />
   
        <Button 
          outline
          href='https://puente-dr.com/"' 
          size='huge' 
          >
          Get Started
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth} style={{backgroundColor: "whitesmoke"}}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 1em' }}
            vertical
          >
            <Menu
              fixed={'top'}
              secondary
              size='medium'
              className={landingStyle.menu}
              text
            > 
              <Menu.Item>
                <Image verticalAlign='middle' className={landingStyle.logopic} src={logo} />
              </Menu.Item>
              <Menu.Item position='left'>
                <Typography variant="h4" >
                  <div style={{color:styles.theme.primaryAppColor}}>Puente</div>
                </Typography>
              </Menu.Item>
              <Menu.Item position='right'>
                <Button style={{marginTop:0,marginBottom:0}} as={Link} to='/login' inverted={fixed}>
                  Log in
                </Button>
              </Menu.Item>
            </Menu>
            <HomepageHeading />
            <DataCollectionSegment />
            <DashboardSegment />
            <HomepageEnding />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          {/*<Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>*/}
          <Menu.Item as={Link} to='/login'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as={Link} to='/login' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer style={{backgroundColor: "white"}}>{children}</DesktopContainer>
    <MobileContainer style={{backgroundColor: "white"}}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer style={landingStyle}>
    {/*<Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h6' style={{ fontSize: '1em' }}>
              FOR NONPROFITS
            </Header>
            <h1 style={{ fontSize: '4em' }}>
              Provide a platform to to analyze your data
            </h1>
            <Button as='a' size='large'>
              Read More
            </Button>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
        <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h6' style={{ fontSize: '1em' }}>
              FOR INDIVIDUALS
            </Header>
            <h1 style={{ fontSize: '4em' }}>
              Start your life-changing journey
            </h1>
            <Button as='a' size='large'>
              Read More
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "What a Company"
            </Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/avatar/large/nan.jpg' />
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='/'>Case Studies</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it's really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment> */}
  </ResponsiveContainer>
)

export default HomepageLayout