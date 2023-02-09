import { useState, useEffect } from "react";
import {Card,Table,Tag} from "antd";
import { useNavigate } from "react-router-dom";
import { DataStore } from "aws-amplify";
import { Order } from '../../models';

const CreateOrder = () => {
    const[orders,setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        DataStore.query(Order).then(setOrders);
    });

    //console.log(orders);

    
    const renderOrderStatus = (orderStatus) => {
        const statusToColor ={
            PENDING : 'blue',
            COMPLETED : 'green',
            ACCEPTED : 'orange',
            DECLINED : 'red',
        }
        return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>

    }

    const tableColumns = [
       { title: 'Id',
        dataIndex: 'id',
        key: 'id',
       },
       { title: 'Created At',
       dataIndex: 'createdAt',
       key: 'createdAt',
      },
      { title: 'Price',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `$${total.toFixed(2)}`
     },
     { title: 'Status',
     dataIndex: 'status',
     key: 'status',
     render: renderOrderStatus
    }

    ];
    const styles ={
        page:{
            margin: 20,
        },
}
    return(
        <Card title='Orders' style={styles.page}>
            <Table
            dataSource={orders}
            columns={tableColumns}
            rowKey='id'
            onRow={(order) => ({
                onClick: () => navigate(`order/${order.id}`)
            })}
            />

        </Card>
    );
  
}
export default CreateOrder;