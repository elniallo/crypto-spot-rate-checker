import https = require("https")
import {dbConfig} from './dbConfig'
import * as mysql from 'mySql'
const api_route:string = "api.coinmarketcap.com"
const db = mysql.createConnection(dbConfig)
function fetchData(){
https.get({host:api_route,path:"/v1/ticker/?limit=10",agent:false},(res)=>{
let data:string = ""
    res.on("data",(chunk)=>{
        data+=chunk
})
    res.on("end",()=>{
        let arr:any[] = JSON.parse(data)
        let outArr:coin[] = []
        arr.forEach((coin)=>{
            if(coin.id=='bitcoin'||coin.id=='ethereum'||coin.id=='litecoin'){
                outArr.push({
                    id:coin.id,
                    name:coin.name,
                    price_usd:parseFloat(coin.price_usd),
                    time_stamp:Date.now()
                })
            }
        })
        try {
            manageData(outArr)
        } catch (error) {
            console.log(error)
        }
        
    })
})
}

type coin = {
    id:string
    name:string
    price_usd:number
    time_stamp:number
}

function manageData(coins:coin[]):void{
    let sql = "INSERT INTO `spot_rates` (`bitcoin`,`ethereum`,`litecoin`) VALUES (?,?,?);"
    if (coins.length == 3)
    {db.query(sql,[coins[0].price_usd,coins[1].price_usd,coins[2].price_usd],(error,results,fields)=>{
        if (error) {
            console.log(`Failed to insert Spot Rate at ${coins[0].time_stamp}`)
        }
        else {
            //console.log("Added to db")
        }
    })}
    else {
        throw new Error("Incorrect data or data format")
    }
}

fetchData()
setInterval(()=>{
    fetchData()
}, 10000)


