import React from "react";
import './styles/payment.scss'
import Animate from 'react-smooth'
import { AiFillCloseCircle } from "react-icons/ai";
import { MdInfo } from "react-icons/md";
import Mastercard from '../../assets/images/mc_tiny.png'
import Visa from '../../assets/images/visa_tiny.png'
import Amex from '../../assets/images/amex_tiny.png'

const CreditCardForm = ({ setPaymnet }) => {

	const handleClose = () => {
        setPaymnet(false)
    }
		return (
		<Animate to="1" from="0" attributeName="opacity" duration="300">
			<div className="payment-section">
				<Animate to="1" from="0" attributeName="opacity" duration="1000">
					<div className="payment-window">
						<div className="header">
							<h5>Fyll på konto</h5>
							<AiFillCloseCircle onClick={handleClose}/>
						</div>

						<div className="body">
							<div className="card-form">
								<div className="first-row">
									<input type="text" placeholder="Kortnummer"/>
									<div className="info-box-right">
										<img alt="card" src={Mastercard}/>
										<img alt="card" src={Visa} className="visa-card"/>
										<img alt="card" src={Amex}/>
									</div>
								</div>
								<div className="second-row">
									<input type="text" placeholder="För- och efternamn"/>
								</div>
								<div className="third-row">
									<select>
										<option></option>
									</select>
									<select>
										<option></option>
									</select>
									<div className="cvc">
										<input type="text" placeholder="CVC"/>
										<div className="info-box-right">
											<MdInfo />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Animate>
			</div>
		</Animate>
	);
};

export default CreditCardForm;