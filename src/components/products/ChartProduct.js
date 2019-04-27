import React from 'react';
import { Doughnut } from 'react-chartjs-2';

let data = {
	labels: [
		'Fashion',
		'Gadget',
		'Sport'
	],
	datasets: [{
		data: [0, 0, 0],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

class ChartProduct extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data : {}
        }
    }

    componentDidUpdate(prevProps){
        //render chart
        if(prevProps.products !== this.props.products){
            //update if something changed
            //fahsion
            data.datasets[0].data[0] = this.props.products.filter((product) => {
                return product.category.includes(data.labels[0]);
            }).length;

            //gadget
            data.datasets[0].data[1] = this.props.products.filter((product) => {
                return product.category.includes(data.labels[1]);
            }).length;

            //gadget
            data.datasets[0].data[2] = this.props.products.filter((product) => {
                return product.category.includes(data.labels[2]);
            }).length;

            this.setState({ data : data });
        }
    }

    render(){
        return(
            <div>
                <label>Categories:</label>
                <Doughnut data={this.state.data} />
            </div>
        );
    }
}

export default ChartProduct;