import { Card, Description, Divider, List, Button, Descriptions } from "antd";
import dishes from "../../data/data/dashboard/dishes.json";
const CreateDetailedOrder = () => {
    const total = dishes.reduce((sum,dish)=>{
        return sum + (dish.quantity * dish.price)
    }, 0);
    return(
        <Card title={'Order Number'} style={styles.page}>
            <Descriptions bordered column={{lg:1,md:1,sm:1}}>
                <Descriptions.Item label='Order Status'>Approved</Descriptions.Item>
                <Descriptions.Item label='Customer'>Bryce Fadako</Descriptions.Item>
                <Descriptions.Item label='Customer Address'>402 Fitz Ave</Descriptions.Item>

            </Descriptions>
            <Divider/>
            <List
                dataSource={dishes}
                renderItem={(dishItem) => (
                    <List.Item>
                        <div style={styles.dishItem}>{dishItem.name} x {dishItem.quantity}</div>
                        <div>${dishItem.price}</div>
                    </List.Item>
                )
                }
                >
            </List>
            <Divider/>
            <div style={styles.totalContainer}>
                <h2>Total:</h2>
                <h2 style={styles.totalPrice}>${total}</h2>
            </div>
            <Divider/>
            <div style={styles.buttonsContainer}>
                <Button
                    block
                    danger
                    type ='primary'
                    size = 'large'
                    style = {styles.button}
                    
                >
                    Decline Order

                </Button>
                <Button
                    block
                    type ='primary'
                    size = 'large'
                    style = {styles.button}
                    
                >
                    Accept Order

                </Button>
                <Button
                    block
                    type ='default'
                    size = 'large'
                    style = {styles.button}
                    
                >
                    Food Is Done

                </Button>

            </div>

        </Card>
    );
};

const styles ={
    page:{
        margin: 20,

    },
    dishItem:{
        fontWeight: 'bold',

    },
    totalContainer:{
        flexDirection: 'row',
        display: 'flex',

    },
    totalPrice:{
        marginLeft:'auto',
    },
    buttonsContainer:{
        display: 'flex',
        paddingBottom: 30,
    },
    button:{
        marginRight: 5,
        marginLeft: 5,

    },
}
export default CreateDetailedOrder;