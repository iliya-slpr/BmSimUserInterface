import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
const NewButton = ()=>{
    return (
        <Link to="/new">
        <Button icon ={ <PlusOutlined />} size="large">
          New Simulation
        </Button>
        </Link>
    )
}
export default NewButton;