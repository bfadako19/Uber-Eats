import {Card,Table,Tag} from "antd";
import orders from '../../data/data/dashboard/orders.json';
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
    const navigate = useNavigate()
    
    const renderOrderStatus = (orderStatus) => {
        let color = '';
        if(orderStatus === 'Accepted'){
            color = 'green';
        } else if (orderStatus === 'Pending'){
            color = 'orange';
        }else{
            color = 'red';
        }
        return <Tag color={color}>{orderStatus}</Tag>

    }

    const tableColumns = [
       { title: 'Id',
        dataIndex: 'orderID',
        key: 'orderID',
       },
       { title: 'Delivery Address',
       dataIndex: 'deliveryAddress',
       key: 'deliveryAddress',
      },
      { title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`
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
            rowKey='orderID'
            onRow={(order) => ({
                onClick: () => navigate(`order/${order.orderID}`)
            })}
            />

        </Card>
    );
  
}
export default CreateOrder;