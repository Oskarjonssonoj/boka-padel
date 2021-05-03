import React, { useState, useEffect	 } from "react";
import './styles/payment.scss'
import Animate from 'react-smooth'
import { AiFillCloseCircle, AiOutlineConsoleSql } from "react-icons/ai";
import { MdInfo } from "react-icons/md";
import Mastercard from '../../assets/images/mc_tiny.png'
import Visa from '../../assets/images/visa_tiny.png'
import Amex from '../../assets/images/amex_tiny.png'
import ButtonLoaderSmall from "../../shared/components/loading/ButtonLoaderSmall";
import { useAuth } from '../../contexts/ContextComponent';
import { db } from '../../firebase/firebase';
import useUser from '../../hooks/useUser'

const CreditCardForm = ({ setPaymnet }) => {

	const {currentUser} = useAuth()
    const {user} = useUser(currentUser.uid)

	const [agree, setAgree] = useState(true)
	const [errorMsg, setErrorMsg] = useState(false)
	const [processing, setProcessing] = useState(false)
	const [cvc, setCvc] = useState("")
	const [amount, setAmount] = useState()
	const [paymentInfo, setPaymentInfo] = useState()

	useEffect(() => {
        setPaymentInfo(user?.card_info)
    }, [user])

	const agreedTerms = (e) => {
        if(e.target.checked) {
            setAgree(false)
        } else if (cvc === "") {
            setAgree(true)
        } else {
			setAgree(true)
		}
    }

	const handleCvcChange = (e) => {
		const { value } = e.target;
		setCvc(value)
    }

	const handleAmountChange = (e) => {
		const { value } = e.target;
		let parsed = parseInt(value, 10)
		setAmount(parsed)
    } 

	const handleCardChange = (e) => {
		const { name, value } = e.target;
        setPaymentInfo({
            ...paymentInfo,
            [name]: value
        })
    }
	

	const handleClose = () => {
        setPaymnet(false)
    }

	const handleConfirmPayment = async (e) => {		
		const userCopy = {...user}

		if (!amount || amount < 200) {
			setErrorMsg(true)
		} else {
			setErrorMsg(false)
			setProcessing(true)
			
			userCopy.balance = userCopy.balance + amount
			userCopy.card_info = paymentInfo

			try {
				await db.collection('users').doc(currentUser.uid).update(userCopy);
			    setProcessing(false)
			    setPaymnet(false)
	
			} catch (e) {
				setProcessing(false)
			}
		}
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

							<div className="amount-section">
								<label>Belopp</label>	
								<div className="amount-box">
									<input 
										type="text"
										placeholder="..."
										value={amount}
										onChange={handleAmountChange}
										name="amount"	
									/>
									<div className="info-box-right">
										<p>SEK</p>
									</div>
								</div>
								{
									errorMsg &&
									<p id="error">Minsta beloppet att fylla på med är 200 SEK</p>
								}
							</div>

							<div className="text-information">
								<p>Fyll i dina kortuppgifter för att fylla på ditt spelkonto. Tryck <span>här</span> för att läsa mer om <span id="payment-condition">betalning & villkor</span>.</p>
							</div>

							<div className="card-form">
								<div className="first-row">
									<input 
										type="text" 
										placeholder="Kortnummer"
										required
										autocomplete="new-password"
										value={paymentInfo?.cred}
										onChange={handleCardChange}
										name="cred"
									/>
									<div className="info-box-right">
										{
											paymentInfo?.cred.charAt(0) === "3" ? (
												<img alt="card" src={Amex}/>
											)
											
											: paymentInfo?.cred.charAt(0) === "4" ? (
												<img alt="card" src={Visa} className="visa-card"/>
											)

											: paymentInfo?.cred.charAt(0) === "5" ? (
												<img alt="card" src={Mastercard}/>
											)

											: 
												<>
													<img alt="card" src={Mastercard}/>
													<img alt="card" src={Visa} className="visa-card"/>
													<img alt="card" src={Amex}/>
												</>
										}
									</div>
								</div>
								<div className="second-row">
									<input 
										type="text" 
										autocomplete="new-password"
										placeholder="För- och efternamn"
										required
										value={paymentInfo?.name}
										onChange={handleCardChange}
										name="name"
									/>
								</div>
								<div className="third-row">
									<select
										value={paymentInfo?.cred_m}
										onChange={handleCardChange}
										name="cred_m" 
									>
										<option value="" disabled selected>Välj Månad...</option>
										<option value="01">Jan</option>
										<option value="02">Feb</option>
										<option value="03">Mar</option>
										<option value="04">Apr</option>
										<option value="05">Maj</option>
										<option value="06">Jun</option>
										<option value="07">Jul</option>
										<option value="08">Aug</option>
										<option value="09">Sep</option>
										<option value="10">Okt</option>
										<option value="11">Nov</option>
										<option value="12">Dec</option>
									</select>
									<select
										value={paymentInfo?.cred_y}
										onChange={handleCardChange}
										name="cred_y"
									>
										<option value="" disabled selected>Välj År...</option>
										<option value="2021">2021</option>
										<option value="2022">2022</option>
										<option value="2023">2023</option>
										<option value="2024">2024</option>
										<option value="2025">2025</option>
									</select>
									<div className="cvc">
										<input 
											type="text" 
											placeholder="CVC"
											required
											value={cvc}
											onChange={handleCvcChange}
											name="cvc"
										/>
										<div className="info-box-right">
											<MdInfo />
										</div>
									</div>
								</div>
							</div>

							<div className="accept-payment">
								<div className="method">
									<input type="checkbox" disabled={cvc === "" ? true : false} onClick={(e) => agreedTerms(e)}/>
									<p>Härmed godkänner jag min betalningsuppgifter och jag godkänner att mina uppgifter ovan sparas och hanteras enligt <span>följande villkor</span>.</p>
								</div>
							</div>

							<div className="buttons-section">
                                    <button onClick={handleClose}>Avbryt</button>
                                    <button disabled={agree} className="confirm" onClick={handleConfirmPayment}>
                                        {
                                            processing ?
                                            <ButtonLoaderSmall />
                                            :
                                            "Bekräfta betalning"
                                        }
                                    </button>
                                </div> 
						</div>
					</div>
				</Animate>
			</div>
		</Animate>
	);
};

export default CreditCardForm;