import React, { useContext } from 'react'
import './App.css'
import UseStateHook from './ReactHooks/UseStateHook'
import UseEffectHook from './ReactHooks/UseEffectHook'
import UseContextHook from './ReactHooks/UseContextHook'
import CustomHook from './ReactHooks/CustomHook'
import { ThemeContext } from './context/ThemeContext'

function App() {

  const {theme} = useContext(ThemeContext)

  return (
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
      {/* <ThemeContextProvider> */}
        <UseStateHook />
        <UseEffectHook />
        <UseContextHook />
        <CustomHook />
      {/* </ThemeContextProvider> */}
    </div>

  )
}

export default App

/*
build a reactjs application just like bitika.xyz but this one will be doing trading of SUI-KSH and KSH-SUI DEX exchange purpose...
make it simple and a zero knowledge based in that there will be only one page for the user to trade/ exchange on 
the user only have to provide/ connect their wallet
1 SUI-KSH - the user connects their sui wallet if not exsist they create the wallet.. then the wallet address is automatiacally written in the wallet address area 
(this is the wallet with the sui token). then the user enter their mpesa number for the bot to send ksh to the account and also the amount 
2. KSH-SUI - the user enter their mpesa number and the amount in ksh and the user is able to see the conversion in real time then the address... the user can also connect their wallet address and the address recorded in the
address section automatically... the user can also see the conversion in real time and upone submiting the user receive a pushup by the daraja api to enter their
mpesa pin to confirm the transaction.. upone aproval the equvallent sui is sent to the user wallet 
3. coversion mechanisim that is of a real time is first dymanically displayed to the user on top of the form eg 1SUI = 415KSH or 415KSH = 1SUI like/ equvalent to the 
real time data as in the trading view... and also a dymamic conversion when user enter ether of the amount for exchange.
4. a link to send complains incase the trasaction delayed on mpesa to send the mpesa code/ sms/ sreenshoot as prove of the transaction for manual transaction by the admin
5. all this will be done by a bot that checks both the transactions and automate them, a smart contract for the sui transaction to the admin account 
6. there will be two liquid pools for SUI and one for KSH
7 main languages used reactjs, nodejs and move language for contract 
8. N/B just one page for simple user interaction for the above the aim is to make it simpler for the user to exchage SUI and KSH  
use mock data for the MVP to show how the logic will work 


i think i am almost done with the final  project and i will be sending it to you 
for now do research on how DEX  works and some examples especially bitika.xyz as this application is build based on how it functions
also take a look at the SUI blockchain network and how it works 
finally is the registration using this link which will be the final activity https://overflowportal.sui.io/submit-project
*/
