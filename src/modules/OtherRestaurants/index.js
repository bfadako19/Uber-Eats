import {Card, Table} from 'antd';
import { DataStore } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { Restaurant } from '../../models';
import { useRestaurantContext } from '../../context/RestaurantContext';
const OtherRestaurant = () => {
    const [restaurants, setRestaurants] = useState();
    const {restaurant} = useRestaurantContext();

    useEffect(() => {
        if(restaurant){

        }
        DataStore.query(Restaurant).then(setRestaurants);
    },[restaurant])
    
    const tableColumns = [
        { title: 'Name',
         dataIndex: 'name',
         key: 'name',
        },
       { title: 'Address',
       dataIndex: 'address',
       key: 'address',
      },
      { title: 'Image Link',
       dataIndex: 'image',
       key: 'image',
      },
      
];
    const styles ={
        page:{
            margin: 20,
        },
}
    return(
        <Card title={'Other Restaurants'} style={styles.page}>
            <Table
                dataSource={restaurants}
                columns={tableColumns}
                rowKey='id'
            />

        </Card>
    );

};
    
export default OtherRestaurant;