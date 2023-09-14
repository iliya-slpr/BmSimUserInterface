import {SyncOutlined} from '@ant-design/icons'
import { Alert } from 'antd';
const Loading = ()=>{
    return  <Alert message="Simulation is running, Please Refresh Page After Simulation Time." type="info" showIcon icon={<SyncOutlined spin/>} />

}

export default Loading;