import {SyncOutlined} from '@ant-design/icons'
import { Alert } from 'antd';
import { useEffect } from 'react';
const Loading = ({getData})=>{
    useEffect(()=>{
        setInterval(()=>{getData()} , 5000);
    } , [getData])
    return  <Alert message="Simulation is running, Please Refresh Page After Simulation Time." type="info" showIcon icon={<SyncOutlined spin/>} />

}

export default Loading;