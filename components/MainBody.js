
import KSideMenu from './kSideMenu'
import KConsts from '../kConfig_consts.json'
import ReactDOM from 'react-dom'
import { Container, Row, Col} from 'reactstrap'
export class MainBody extends React.Component {

    constructor(props)
    {
      super(props);
    
      
      
      const newLocal = this;
      newLocal.sceneFloorId = "sceneFloor";
      newLocal.sideMenuFunctions = {
        "Send email":()=>this.props.onVCChanged("SendEmailVC"),
        "All Members":()=>this.props.onVCChanged("AllMembers"),
        "Change list":function(){console.log("ddd8")}
      }
    }
 

    getSideMenuItems()
    {
      // items should be in the expected format : [{name:"test 1"},{name:"test 2"}]
      let items = [];
      let options = KConsts.SIDE_MENU_OPTIONS;
      let i = 0;
      options.forEach(element => {        
        items.push({key:i, name:element, clickAction:this.sideMenuFunctions[element]});
      });
  
      let result = items;
  
      return result;
    }
  
    emptySceneFloor()
    {
      let sceneFloor =  document.getElementById(this.sceneFloorId);
      sceneFloor.innerHTML = "";
    }
    render() {
      if (this.props.container === false) {
        return (
          <React.Fragment>
            {this.props.children}
          </React.Fragment>
        )
      } else if (this.props.navmenu === false) {
        return (
          <Container fluid={this.props.fluid} style={{marginTop: '1em'}}>
            {this.props.children}
          </Container>
        )
      } else {
        let items = this.getSideMenuItems();
        return (
          <Container fluid={this.props.fluid} style={{marginTop: '1em'}}>
            <Row>
              <Col id={this.sceneFloorId} xs="12" md="9" lg="10">
                {this.props.children}
              </Col>
              <Col xs="12" md="3" lg="2" style={{paddingTop: '1em'}}>
                
              <KSideMenu title={KConsts.SIDE_MENU_TITLE} menuItems={items} logMode={false}  />
            
              </Col>
            </Row>
          </Container>
        )
      }
    }
  }