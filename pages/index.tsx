import Head from 'next/head'
import {Button, InputNumber, Layout, Typography} from "antd";
import {useEffect, useState} from "react";

const {Header, Content } = Layout;
const {Text} = Typography
export default function Home() {

  const [currency, setCurrency] = useState(0);
  const [percent, setPercent] = useState(2);
  const [amount,setAmount] = useState(100);
  const [amountWithPercent, setAmountWithPercent] = useState(0)
  const [result, setResult] = useState(amount / currency)

  useEffect(()=>{
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js'
    fetch(url)
      .then(req => req.json())
      .then(data=> {
        setCurrency(data.Valute.USD.Value)
      })
  }, [])

  useEffect(()=>{
    const percentHundred =  ((100-percent)/100)
    console.log(amount,currency,result, amountWithPercent, percentHundred)
    console.log(amount*(100-percent))
    setAmountWithPercent(amount* percentHundred)
    const resultWithoutPercent  = (amount/currency)
    setResult(+(resultWithoutPercent * percentHundred).toFixed(2))

    console.log(amount,currency,result, amountWithPercent)
    console.log("----")
  },[ amount,currency, percent])

  return (
    <Layout>
      <Head>
        <title>Amir Capital Exchange</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Text style={{color: 'white'}}>Amir Capital Exchange</Text>
      </Header>
      <Content style={{paddingLeft: '50px', background: 'white'}}>
        <h1>Калькулятор RUB {"->"} USDT</h1>
        <div>
          К оплате: <InputNumber min={0} defaultValue={10} step={1} value={amount} onChange={(e:number)=> setAmount(e)} /> RUB
        </div>
        <div><strong>Итого: {result} USDT</strong></div>
        <hr/>
            <div>Курс USD: {currency} RUB</div>

            <div>
            <div>Комиссия перевода: <InputNumber min={0} step={0.5} max={100} value={percent} onChange={(value:number) => setPercent(value)}/>%</div>
            <div>Итоговая сумма к переводу: {amountWithPercent.toFixed(2)} RUB</div>
            </div>
      </Content>
    </Layout>
  )
}
