const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const member = require("./router/member")
const user = require("./router/user")
const paket = require("./router/paket")
const transaksi = require("./router/transaksi")
const {login} = require("./router/login")

app.use("/api/member", member)
app.use("/api/user", user)
app.use("/api/paket", paket)
app.use("/api/transaksi", transaksi)
app.use("/api/auth", login)

app.listen(8000, () => {
    console.log('server run on port 8000');
})