import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_51J0IQWCeDR4ioCyJK56ZHmyrGjLJae8Ibau5HdiLs18jGZqw0KX6eLaojvYk1yC28utG7hhltmYA6qFrpPWPfbFE00PRvrnftL';

	const onToken = token => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token,
			}
		})
				.then(response => {
					alert('Payment Successful')
				})
				.catch(error => {
					console.log('Payment Error: ', JSON.parse(error))
					alert('There was an issue with your payment. Please ensure proper payment type was used.')
				})
	}

	return (
		<StripeCheckout
			label='Pay Now'
			name='CRWN Clothing Ltd.'
			billingAddress
			shippingAddress
			image='https://sendeyo.com/en/f3eb2117da'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	)	
}

export default StripeCheckoutButton;