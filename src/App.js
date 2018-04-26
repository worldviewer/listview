import React, { Component } from 'react';
import './App.css';

import placeholder from 'placeholder.js';
import DraggableListItem from './DraggableListItem';

import mobiscroll from './mobiscroll/mobiscroll.react.min';
import './mobiscroll/mobiscroll.react.min.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.placeholder = placeholder.getData(
			{size: '60x60', text: ' ', bgcolor: '#e0e0e0'} );

		this.state = {
			newImageList: [{},{},{},{},{}].map((image, i) => {
				return {
					id: i+1,
					src: this.placeholder,
					type: 'empty',
					origin: null,
					dimensions: {
						width: 0,
						height: 0
					},
					crop: {
						x: 0, y: 0,
						width: 100,
						height: 100
					},
					pixelCrop: {
						x: 0, y: 0,
						width: 0,
						height: 0
					}
				}
			})
		}

		this.props = props;
	}

	render() {
		const
			staticListStyles = {
				marginLeft: '70px',
				marginTop: '10px',
				pointerEvents: 'none',
				position: 'absolute'
			},

			draggableListWrapperStyles = {
				position: 'absolute',
				width: '100%'
			},

			staticImageList = [
				{title: this.state.windowWidth > 360 ?
					'Main Feed Image' : 'Main Image'},
				{title: this.state.windowWidth > 360 ?
					'2nd Carousel Image' : '2nd Image'},
				{title: this.state.windowWidth > 360 ?
					'3rd Carousel Image' : '3rd Image'},
				{title: this.state.windowWidth > 360 ?
					'4th Carousel Image' : '4th Image'},
				{title: this.state.windowWidth > 360 ?
					'5th Carousel Image' : '5th Image'}
			],

			stages = () => {
				let that = this;

				return {
					right: [{
						percent: -25,
						color: '#f44336',
						icon: 'remove',
						text: 'Delete',
						confirm: true,

						action: (event, inst) => {
							const
								index = event.index,
								firstHalf = that.state.newImageList.slice(
									0, index),
								secondHalf = that.state.newImageList.slice(
									index+1, 5),

								clearedElement = {
									origin: null,
									dimensions: {
										width: 0,
										height: 0
									},
									crop: {
										x: 0, y: 0,
										width: 100,
										height: 100
									},

									id: that.state.newImageList[index].id,
									src: that.placeholder,
									type: 'empty'
								},

								spliced = firstHalf.concat(clearedElement)
									.concat(secondHalf);
							
							that.setState({newImageList: spliced});
						}
					}]
				};
			};

		// With stages: Try dragging by handle, notice UI problem
		return (<div className='App'>
			<div style={{marginTop: '50px', width: '100%', padding: '25px'}}>
				With stages, broken ...
			</div>

			<mobiscroll.Listview 
				itemType={DraggableListItem} 
				data={this.state.newImageList}
				theme="mobiscroll"
				swipe={true}
				sortable={{handle: 'right'}}
				iconSlide={true}
				enhance={true}
				stages={stages()}

				onSortStart={(event, inst) => {
					console.log('onSortStart');
					console.log('event.index: ' + event.index);
					console.log('');

					this.saveBackground = event.target.style.backgroundColor;
					event.target.style.backgroundColor = '#00c853';

					this.setState(prevState => ({
						dragStartIndex: event.index,
						dragStartElement: prevState.newImageList[event.index]
					}));
				}}

				onSortEnd={(event, inst) => {
					const
						dragStart = this.state.dragStartIndex,
						dragEnd = event.index;

						event.target.style.backgroundColor = this.saveBackground;

					if (dragEnd !== this.state.dragStart) {
						const
							firstHalf = this.state.newImageList.slice(
								0, dragStart),
							secondHalf = this.state.newImageList.slice(
								dragStart+1, 5),
							sliced = firstHalf.concat(secondHalf),
							spliced = sliced.slice(0, dragEnd)
								.concat(this.state.dragStartElement)
								.concat(sliced.slice(dragEnd, 5));

						this.setState({
							newImageList: spliced,
							dragStartIndex: 0,
							dragStartElement: {}
						});
					}
				}} />

			<div style={{marginTop: '50px', width: '100%', padding: '25px'}}>
				Without stages, works fine ...
			</div>

			<mobiscroll.Listview 
				itemType={DraggableListItem} 
				data={this.state.newImageList}
				theme="mobiscroll"
				swipe={true}
				sortable={{handle: 'right'}}
				iconSlide={true}
				enhance={true}

				onSortStart={(event, inst) => {
					console.log('onSortStart');
					console.log('event.index: ' + event.index);
					console.log('');

					this.saveBackground = event.target.style.backgroundColor;
					event.target.style.backgroundColor = '#00c853';

					this.setState(prevState => ({
						dragStartIndex: event.index,
						dragStartElement: prevState.newImageList[event.index]
					}));
				}}

				onSortEnd={(event, inst) => {
					const
						dragStart = this.state.dragStartIndex,
						dragEnd = event.index;

						event.target.style.backgroundColor = this.saveBackground;

					if (dragEnd !== this.state.dragStart) {
						const
							firstHalf = this.state.newImageList.slice(
								0, dragStart),
							secondHalf = this.state.newImageList.slice(
								dragStart+1, 5),
							sliced = firstHalf.concat(secondHalf),
							spliced = sliced.slice(0, dragEnd)
								.concat(this.state.dragStartElement)
								.concat(sliced.slice(dragEnd, 5));

						this.setState({
							newImageList: spliced,
							dragStartIndex: 0,
							dragStartElement: {}
						});
					}
				}} />

		</div>);
	}
}

export default App;
