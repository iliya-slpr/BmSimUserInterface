import { Avatar, List, Image, Button } from 'antd';
import React from 'react';
import './style.css'
import Loading from './Components/Loading'
import NewButton from './Components/NewButton'
import { useState , useEffect } from 'react';
import axios from '../../Helpers/Axios';
import {BuildOutlined , DownloadOutlined} from '@ant-design/icons';
import { baseUrl } from '../../Helpers/Constants';
  const Menu = () => {
    const [listDataSource, setListDataSource] = useState([]);
    let data = [];
    let getData = ()=>{
      axios.get('/').then(res => {
        data = [...res.data];
        const serializedData = data.map(item => ({ 
          href: `/simulation/${item.id}`,
          title: item.name,
          photoUrl: `${baseUrl}/${item.image}`,
          logUrl : `${baseUrl}/${item.file}`,
          done: item.done === 1
        }));

        setListDataSource(serializedData);

      })
    }
    useEffect(()=>{
      getData();
      
    } , [])
    return (<div style={{display:'flex' , flexDirection:'column' , margin:'0.5em 0'}}>
    <div style={{alignSelf:'flex-end'}}>
      <NewButton />
    </div>
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={listDataSource}
        renderItem={(item) => (
          <List.Item
            key={item.title}

          >
            <List.Item.Meta
              avatar={<Avatar icon={<BuildOutlined />} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
              
            />
            <div style={{display:'flex' , flexDirection:'column' , alignitems:'center' , justifyContent:'center'}}>
              {item.done ? <>
          <div style={{margin:'0 auto'}}>

             <Image
                width={272}
                src={item.photoUrl}
                />
              </div>

              <div style={{alignSelf:'flex-end' , fontSize:'1.25em', color:'#1ebdb4' , fontWeight:400}}>

              <a href={item.logUrl} style={{textDecoration:'none'}}>
              <Button type="primary" shape="round" icon={<DownloadOutlined />} size='medium' />

                 </a>
              </div>
              </> : <Loading getData={getData}/>}
                </div>
                
          </List.Item>
        )}
      />
      </div>)
  }
  export default Menu;
