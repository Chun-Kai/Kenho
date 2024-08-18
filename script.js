// 初始化 TradingView 小工具
let widget;

function initTradingViewWidget(symbol = 'BTCUSDT') {
    widget = new TradingView.widget({
        "width": "100%",
        "height": 400,
        "symbol": "BINANCE:" + symbol,
        "interval": "D",
        "timezone": "Asia/Taipei",
        "theme": "light",
        "style": "1",
        "locale": "zh_TW",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview-widget"
    });
}

// 獲取熱門交易對
async function getPopularPairs() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();
        return data.sort((a, b) => b.volume - a.volume).slice(0, 10).map(pair => pair.symbol);
    } catch (error) {
        console.error('無法獲取熱門交易對:', error);
        return ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOGEUSDT', 'XRPUSDT', 'DOTUSDT', 'UNIUSDT', 'BCHUSDT', 'LTCUSDT'];
    }
}

// 更新圖表
function updateChart(symbol) {
    widget.setSymbol("BINANCE:" + symbol);
}

// 執行技術分析
function performAnalysis(method) {
    // 這裡應該實現實際的技術分析邏輯
    // 為了示例,我們只返回一個模擬結果
    const results = {
        'MA': '均線分析顯示上升趨勢,建議買入',
        'RSI': 'RSI 指標顯示超買,建議賣出',
        'MACD': 'MACD 顯示看漲交叉,建議買入',
        // ... 其他分析方法
    };
    
    document.getElementById('analysis-result').textContent = results[method] || '無法進行分析';
}

// 初始化頁面
async function initPage() {
    initTradingViewWidget();
    
    const popularPairs = await getPopularPairs();
    const pairsContainer = document.getElementById('popular-pairs');
    popularPairs.forEach(pair => {
        const button = document.createElement('button');
        button.textContent = pair;
        button.onclick = () => updateChart(pair);
        pairsContainer.appendChild(button);
    });
    
    const analysisButtons = ['MA', 'RSI', 'MACD', 'Bollinger', 'Stochastic', 'Fibonacci', 'Ichimoku', 'ADX', 'ATR', 'OBV'];
    const analysisContainer = document.getElementById('analysis-buttons');
    analysisButtons.forEach(method => {
        const button = document.createElement('button');
        button.textContent = method;
        button.onclick = () => performAnalysis(method);
        analysisContainer.appendChild(button);
    });
    
    document.getElementById('search-box').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            updateChart(this.value);
        }
    });
}

initPage();
