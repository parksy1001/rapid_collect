import "./style/Main.css";
import axios from "axios";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Typography,
  Button,
  Modal,
} from "antd";
import { useState , useEffect} from "react";

const { Header, Content, Footer } = Layout;
//const { Title } = Typography;

function Main() {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCancel = () => {
    setModalIsOpen(false);
  };

  const getMachineInfo=()=>{


  }


  useEffect(() => {

		const fetchMachine = async () => {
			try {
				const response = await axios.get(
					'/rss/api/system/machinesInfo',
          {headers: {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3NUb2tlbiIsImV4cCI6MTY3NTMyNjYyMywiaWF0IjoxNjc1MzEyMjIzLCJ1c2VySWQiOjEwMDIzLCJ1c2VyTmFtZSI6IjIwMjIwNDYzIiwicGVybWlzc2lvbiI6IiJ9.SV5DXU3_8zbkrpOYJZp6yR0cCSMrHSHfLRUHbdr4kIU"
          }}
				);
				console.log(response.data.lists);
			} catch (e) {
				console.log(e);
			}
		}

		fetchMachine();



	}, []);

  return (
    <Layout className="layout">
      <Header>
        <div className="headerLogo">Rapid Collector</div>
      </Header>

      <Content
        className="content"
        style={{
          padding: "0 50px",
        }}
      >
        <div className="site-layout-content">
          <div className="machineWrapper" >
            <Typography.Title level={4} style={{ margin: 0 }}>
              Machine
            </Typography.Title>
            <div className="machineDetails"></div>
          </div>

          <div className="categoryWrapper" >
            <Typography.Title level={4} style={{ margin: 0 }}>
              Category
            </Typography.Title>
            <div className="categoryDetails"></div>
          </div>

          <div className="dateWrapper">
            <Typography.Title level={4} style={{ margin: 0 }}>
              Date
            </Typography.Title>
            <div className="dateDetails"></div>
          </div>

          <div>
            <Button className="searchButton">Search</Button>
          </div>
        </div>

        <Modal
          open={modalIsOpen}
          title="Error"
          onCancel={handleCancel}
          footer={[
            <Button key="back" type="primary" onClick={handleCancel}>
              Ok
            </Button>,
          ]}
        ></Modal>
      </Content>

      <Footer></Footer>
    </Layout>
  );
}

export default Main;
