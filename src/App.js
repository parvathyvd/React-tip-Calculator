import { useEffect, useRef, useState } from 'react';
import './App.css';
import Footer from './Footer';

function App() {
  const [billInput, setBillInput] = useState('');
  const [numOfPerson, setNumOfPerson] = useState('');
  const [selectedTip, setSelectedTip] = useState('');
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);
  const [active, setActive] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [numPersonInvalid, setNumPersonInvalid] = useState(false);
  const [numPersonInvalidMessage, setNumPersonInvalidMessage] = useState('');
  const tipPerPersonRef = useRef('');
  const totalPerPersonRef = useRef('');
  const customBtnRef = useRef('');

  const customInputHandler = (e) =>{
    // setCustomEnteredNumber(e.target.value);
    setSelectedTip(e.target.value);
  }
  const selectTipHandler = (e) =>{
    // console.log(e.target.value);
    setSelectedTip(e.target.value);
    setActive(true);
    console.log('selected tip is',selectedTip);
  }
  const inputPersonHandler = (e) =>{
    if(e.target.value === '0'){
      // console.log('zero num person');
      setNumPersonInvalid(true);
      setNumPersonInvalidMessage(`Can't be zero`);
      setNumOfPerson(e.target.value); 
    }
    if(e.target.value === ''){
      // console.log('empty num person');
      setNumPersonInvalid(true);
      setNumPersonInvalidMessage('');
      setNumOfPerson(e.target.value); 
    }
    if(e.target.value !== '' && e.target.value !== '0'){
      // console.log('not empty or zero num person');
    setNumPersonInvalid(false);
    setNumPersonInvalidMessage('');
    setNumOfPerson(e.target.value); 
    }
  }

  const onBillChangeHandler = (e) => {
    if(e.target.value !== ''){
      setInvalid(false);
    }
    setBillInput(e.target.value);
  }

  const onBlurHandler = () => {
    if(billInput === ''){
      setInvalid(true);
    }
    else{
    setInvalid(false) 
    }
  }

  useEffect(()=>{
if(billInput !== '' && numOfPerson !== '' && numOfPerson !== '0'){
    //calculate the tip percentage and display
    console.log(billInput, numOfPerson);
    const TotalPerPersonResult = (+billInput/+numOfPerson).toFixed(2);
    // console.log('TotalPerPersonResult',TotalPerPersonResult);
    setTotalPerPerson(TotalPerPersonResult);
    const tipAmountPerPersonResult = ((+billInput * +(selectedTip/100))/numOfPerson).toFixed(2);
    // console.log('tipAmountPerPersonResult',tipAmountPerPersonResult);
    setTipPerPerson(tipAmountPerPersonResult)
  }
  },[billInput, numOfPerson, selectedTip, numPersonInvalid, invalid])


  const resetAll = () => {
    setBillInput('');
    setNumOfPerson('');
    setSelectedTip('');
    setTipPerPerson('0');
    setTotalPerPerson('0');
    customBtnRef.current.value = '';
  }

  return (
    <main className="splitter__app">
      <h1>SPLI<span>TTER</span></h1>
      <div className="splitter__app__container">
        <div className="splitter__calc">
          <label htmlFor="bill">Bill</label>
            <div className="splitter__input">
            <input className={invalid && billInput !== '0' ? 'invalid' : ''} type="number" name='bill' id='bill' required value={billInput}  onChange={onBillChangeHandler} onBlur={onBlurHandler} />
            <img src="./images/icon-dollar.svg" alt="dollar" />
            </div>
            <label>Select Tip %</label>
            <div className="splitter__buttons">
               <button className={active && selectedTip === '5' ? 'btn dark-btn active' : 'btn dark-btn'} type='button' dangerouslySetInnerHTML={{ __html: `5%`}} value={5} onClick={selectTipHandler}></button>
               <button className={active && selectedTip === '10' ? 'btn dark-btn active' : 'btn dark-btn'} type='button'dangerouslySetInnerHTML={{ __html: `10%`}}  value={10} onClick={selectTipHandler}></button>
               <button className={active && selectedTip === '15' ? 'btn dark-btn active' : 'btn dark-btn'} type='button' dangerouslySetInnerHTML={{ __html: `15%`}} value={15} onClick={selectTipHandler}></button>
               <button className={active && selectedTip === '25' ? 'btn dark-btn active' : 'btn dark-btn'} type='button' dangerouslySetInnerHTML={{ __html: `25%`}} value={25} onClick={selectTipHandler}></button>
               <button className={active && selectedTip === '50' ? 'btn dark-btn active' : 'btn dark-btn'} type='button' dangerouslySetInnerHTML={{ __html: `50%`}} value={50} onClick={selectTipHandler}></button>
               {/* <input className='btn custom' type="number">Custom</input> */}
               <input type="text" className='btn custom'ref={customBtnRef} placeholder='Custom' onChange={customInputHandler} />
            </div>
            <div className='num__people'><label htmlFor="bill">Number of People</label>{numPersonInvalid &&<span className='text-red'>{numPersonInvalidMessage}</span>}</div>
            <div className="splitter__input">
            <input value={numOfPerson} className={numPersonInvalid ? 'invalid' : ''} type="number" name='people' id='people' required   onChange={inputPersonHandler} />
            <img src="./images/icon-person.svg" alt="person" />
            </div>
        </div>
        <div className="splitter__result">
            <div className="tip__amount">
              <div className="tip__info">
                 <h4>Tip Amount</h4>
                <span>/person</span>
              </div>
                <h2 ref={tipPerPersonRef}>${tipPerPerson}</h2>
            </div>
            <div className="total__amount">
            <div className="tip__info">
                <h4>Total</h4>
                <span>/person</span>
                </div>
                <h2 ref={totalPerPersonRef}>${totalPerPerson}</h2>
            </div>
            <div className="reset-btn">
            <button className='btn light-btn' type='button' onClick={resetAll}>RESET</button>
            </div>
        </div>
      </div>
     <Footer/>
    </main>
  );
}

export default App;
