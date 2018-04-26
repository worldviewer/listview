// React Dependencies
import React, { Component } from 'react';

class DraggableListItem extends Component {
	render() {
		const
			listItemStyles = {
				fontFamily: 'Poppins, sans-serif',
				height: '70px'
			},

			imageStyles = {
				height: '50px',
				left: '-50px',
				maxWidth: '70px',
				pointerEvents: 'none',
				position: 'relative'
			},

			itemTypeStyles = {
				color: '#616161',
				fontSize: '12px',
				left: '70px',
				marginBottom: 0,
				position: 'absolute',
				top: '30px'
			};

		return (<li data-id={this.props.item.id} style={listItemStyles}
				key={this.props.item.id}>

				<img src={this.props.item.src} alt='thumbnail'
					style={imageStyles} />

				<p style={itemTypeStyles}>
					{this.props.item.type}
				</p>
			</li>);
	}
}

export default DraggableListItem;
