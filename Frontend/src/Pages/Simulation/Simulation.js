import { Button,Radio, Form, Input, InputNumber,notification,Skeleton ,Image , Switch , Divider, Row,Col } from 'antd';
import axios from '../../Helpers/Axios'
import classes from './style.module.css'
import { useState  , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {DownloadOutlined , RollbackOutlined} from '@ant-design/icons'
import { baseUrl } from '../../Helpers/Constants';
const Simulation = () => {
    const params = useParams();
    const [form] = Form.useForm();
    const [loadingPage , setLoadingPage ] = useState(true);
    const [loading, setLoading] = useState(false)
    const [initialValues, setInitialValues] = useState();
    const [preview,setPreview] = useState("");
    const [nodes,setNodes] = useState([]);
    const navigate = useNavigate();
    console.log(initialValues)
    const handlePreview=async ()=>{
      console.log("here");
      let values = form.getFieldsValue()
      values.random_nodes = values.random_nodes ? 1 :0;
      values.total_log = values.total_log ? 1 :0;
      values.nodes = [];
      
      setLoadingPage(true)

      let resp = await axios.post('http://localhost:8000/preview/',values);
      setPreview("data:image/png;base64,"+resp.data['preview-image'])
      setNodes(resp.data['nodes'])
      setLoadingPage(false)

    }
    useEffect(() => {
        if(!params.id){
            setLoadingPage(false)
        }
        else {
            axios.get(`/${params.id}/`).then(res=>{
              res.data.total_log = res.data.total_log == 1? true:false
              res.data.random_nodes = res.data.random_nodes == 1? true:false
              console.log("ttttttttttttt",res.data);
              setInitialValues(res.data)
            });
            setLoadingPage(false);
        }
    } , [])

    const onFinishForm = async (values) =>{
        setLoading(true);
        try{
         
          values.random_nodes = +values.random_nodes;
          values.total_log = values.total_log ? 1 :0;
          values.nodes = nodes;
      debugger;

            await axios.post('/',values);
            setLoading(false);
            navigate('/');
            notification.success({message:"Successfuly Added, please wait until simulation complete" , duration:5})

        }
        catch(e){
            setLoading(false);
            notification.error({message:"Successfuly Added, please wait until simulation complete" , duration:5});
        }

    }
    
    if((params.id && initialValues?.name && !loadingPage)||(!params.id)){
        return (
            <div className={classes.formContainer}>
            <div style={{alignSelf:"flex-start"}}>
               <Link to='/'> <Button type="primary" shape="round" icon={<RollbackOutlined />} size='middle'/></Link>
            </div>
            {params.id ? 
            <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , marginBottom:'2em'}}>

            <Image src={`${baseUrl}/${initialValues.image}`} width={400} />

            <a href={ baseUrl+'/'+initialValues.file} style={{textDecoration:'none'}}>
                <Button type="primary" shape="round" icon={<DownloadOutlined />} size='large' >Download Log</Button>
            </a>
            </div>
                      

            : null}
            {preview?.length > 0 &&
            <Image src={preview} width={400} /> 
          }
            <Form
              form={form}
              initialValues={initialValues}
              onFinish={onFinishForm}
              labelCol={{ span: 15 }}
              wrapperCol={{ span: 9 }}
              style={{maxWidth:'90%'}}
              name='Simulation'
              labelAlign="left"
              disabled={params.id}
              autoComplete='false'
            >
              
              <Form.Item label="Simulation Name" name="name" wrapperCol={12} labelCol={12}  rules={[{ required: true}]} >
                <Input placeholder="New Simulation" />
              </Form.Item>
              
              <Row gutter={15}>
                {params.id ? 
                <Col span={24}><h1>Run Log:</h1><p style={{width:'100%',whiteSpace:'pre-wrap'}}> {initialValues.run_log} </p></Col>:null}
        
              
              
              <Col span={8}>
              <Form.Item label="Number Of Nodes" name="nodes_number"  rules={[{ required: true , message:'Required'}]} initialValue={11}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Environment Dimension(m)" name="environment"  rules={[{ required: true , message:'Required'}]} initialValue={25}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Communication Range(m)" name="node_range"  rules={[{ required: true , message:'Required'}]} initialValue={11.26}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Execution Time(ms)" name='execution_time'  rules={[{ required: true , message:'Required'}]} initialValue={10000}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Mobility Flag" name='mobility_flag'  rules={[{ required: true , message:'Required'}]} initialValue={0}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Update Flag" name='update_flag'  rules={[{ required: true , message:'Required'}]} initialValue={0}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Buffer Size" name='buffer_size'  rules={[{ required: true , message:'Required'}]} initialValue={6}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Update Mobility Interval(ms)" name='update_mobility_interval'  rules={[{ required: true , message:'Required'}]} initialValue={6000}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              
              <Col span={8}>
              <Form.Item label="Node Deployment" name='random_nodes' rules={[{ required: true , message:'Required'}]} initialValue={"0"}>
                <Radio.Group size='small'>
                  <Radio.Button value="0">Grid</Radio.Button>
                  <Radio.Button value="1">Random</Radio.Button>
                </Radio.Group>
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Center Node Number" name='center_node_number'  rules={[{ required: true , message:'Required'}]} initialValue={0}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Heartbeat Period(ms)" name='heartbeat_period'  rules={[{ required: true , message:'Required'}]} initialValue={0}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>

              <Col span={8}>
              <Form.Item label="Total Log" name='total_log' valuePropName="checked" initialValue={false}>
                <Switch  />
              </Form.Item>
              </Col>
              </Row>
              <Divider>LowPower Mode</Divider>
              <Row>
              <Col span={8}>
              <Form.Item label="Receive Delay(ms)" name='receive_delay'  rules={[{ required: true , message:'Required'}]} initialValue={10}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Sleep Time(ms)" name='sleep_time'  rules={[{ required: true , message:'Required'}]} initialValue={5}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Receive Window" name='receive_window'  rules={[{ required: true , message:'Required'}]} initialValue={98}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="LowPower Pull interval(ms)" name='lowpower_poll_interval'  rules={[{ required: true , message:'Required'}]} initialValue={4000}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              </Row>

              <Divider>Nodes</Divider>
              <Row>
              <Col span={8}>
              <Form.Item label="Scan interval(ms)" name='scan_interval'  rules={[{ required: true , message:'Required'}]} initialValue={30}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>

              <Form.Item label="Scan Window" name='scan_window'  rules={[{ required: true , message:'Required'}]} initialValue={30}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={8}>

              <Form.Item label="Relay Retransmit Count" name='relay_retransmit_count'  rules={[{ required: true , message:'Required'}]} initialValue={0}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>

              <Col span={8}>

              <Form.Item label="Network Transmit Count" name='network_transmit_count'  rules={[{ required: true , message:'Required'}]} initialValue={0}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>

              <Col span={8}>

              <Form.Item label="Rris" name='rris'  rules={[{ required: true , message:'Required'}]} initialValue={1}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>

              <Col span={8}>

              <Form.Item label="Ntis" name='ntis'  rules={[{ required: true , message:'Required'}]} initialValue={1}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>

              <Col span={8}>

              <Form.Item label="Advertise Interval(ms)" name='advertise_interval'  rules={[{ required: true , message:'Required'}]} initialValue={20}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>

              <Col span={8}>

              <Form.Item label="Generation Interval(ms)" name='generation_interval'  rules={[{ required: true , message:'Required'}]} initialValue={1000}>
                <InputNumber placeholder="0" />
              </Form.Item>
              </Col>
              <Col span={24}>
              {params.id ? null : <Form.Item style={{display:'flex', justifyContent:'flex-end'}}>
                <Button type="primary" onClick={handlePreview} size='large' loading={loading}>preview</Button>
              </Form.Item>}
              {params.id ? null : <Form.Item style={{display:'flex', justifyContent:'flex-end'}}>
                <Button type="primary" htmlType="submit" size='large' loading={loading}>Submit</Button>
              </Form.Item>}
              </Col>
              </Row>
              
            </Form>
            
            </div>
        
            )
    }
    else{
        return <Skeleton />
    }
    
}
export default Simulation;