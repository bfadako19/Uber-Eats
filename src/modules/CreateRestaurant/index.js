import {Card, Input, Button, message, Form} from 'antd';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Restaurant } from '../../models';
import { useRestaurantContext } from '../../context/RestaurantContext';

const CreateRestaurant = () => {
    const[name, setName] = useState('');
    const[address,setAddress] = useState('');
    const[image,setImage] = useState('');

    const {sub, setRestaurant, restaurant} = useRestaurantContext();
    const onFinish = async () => {
        if(!name){
            message.error('Name Required!');
            return;
        }
        if(!address){
            message.error('Address Required!');
            return;
        }
        if(!image){
            message.error('Image Required!');
            return;
        }
        if(!restaurant){
            await createNewRestaurant();
        }else{
            await updateRestaurant();
        }
    
    };
    useEffect(() => {
        if(!restaurant){
            return;
        }
        setName(restaurant.name);
        setAddress(restaurant.address);
        setImage(restaurant.image);
    }, [restaurant]);
   
    const updateRestaurant = async () => {
        const updateRestaurant = await DataStore.save(
            Restaurant.copyOf(restaurant, (updated) => {
                updated.name = name;
                updated.address = address;
                updated.image = image;
            })
        );
        setRestaurant(updateRestaurant);
        message.success('Restaurant Updated!');
    };
    const createNewRestaurant = async () => {
        const newRestaurant = DataStore.save(new Restaurant({
            name,
            image,
            address,
            adminSub: sub,
        }));
        setRestaurant(newRestaurant);
        message.success('Restaurant Created!');
    }
    return (
        <Card title={'Restaurant Details'} style={styles.page}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label = {'Name'} required>
                    <Input placeholder="Enter Name"
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                    />

                </Form.Item>
                <Form.Item label={'Address'} required>
                    <Input
                    placeholder='Enter Address'
                    value = {address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label={'Image'} required>
                    <Input placeholder="Enter Image Link"
                    value = {image}
                    onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
                
            </Form>
        </Card>
    );
};

const styles = {
    page: {
        margin: 20,
    },
}
export default CreateRestaurant;