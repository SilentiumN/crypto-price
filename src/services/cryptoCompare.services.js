class CryptoCompareService {
    constructor() {
        this.ws = null;
    }

    openWebSocket(apiKey) {
        this.ws = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
        
        return this.ws
    }

    sendParamsWebSocket(params) {
        console.log("params2", JSON.stringify(params))
        if (this.ws.readyState === 1) {
            this.ws.send(
                JSON.stringify(params)
            )
        }
    }
}

export default new CryptoCompareService();
