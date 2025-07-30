// File: data.js
// Mục đích: Chứa toàn bộ dữ liệu cấu hình và trạng thái của ứng dụng.
// Đây là "bộ não" chỉ chứa thông tin, không thực hiện hành động.

// --- CONFIGURATION DATA ---
// Dữ liệu cấu hình cố định cho 5 chiếc hũ.
export const jarsConfig = {
    spending: { 
        name: "Chi tiêu", 
        color: "bg-blue-500", 
        description: "Tiền chi tiêu hàng ngày (ăn uống, đi lại, hóa đơn...)" },
    emergency: { 
        name: "Khẩn cấp", 
        color: "bg-red-500", 
        description: "Quỹ dự phòng cho các trường hợp bất ngờ, mục tiêu 6 tháng chi tiêu." },
    saving: { 
        name: "Tiết kiệm", 
        color: "bg-green-500", 
        description: "Dành cho các mục tiêu lớn (du lịch, mua sắm, xe cộ...)" },
    investment: { 
        name: "Đầu tư", 
        color: "bg-purple-500", 
        description: "Gia tăng tài sản qua các kênh đầu tư (chứng khoán, crypto...)" },
    education: { 
        name: "Học tập", 
        color: "bg-yellow-500", 
        description: "Đầu tư cho kiến thức và phát triển bản thân." }
};

// Danh sách coin/token cho phần đầu tư
export const coinsList = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628' },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB', image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/large/Cardano_Logo.png?1696502090' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501447' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot_new_logo.png?1696510158' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', image: 'https://assets.coingecko.com/coins/images/877/large/chainlink.png?1696501999' },
    { id: 'polygon', symbol: 'MATIC', name: 'Polygon', image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1696501954' },
    { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png?1696501400' },
    { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', image: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1696510159' },
    { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', image: 'https://assets.coingecko.com/coins/images/12559/large/avalanche-avax-logo.png?1696510159' },
    { id: 'stellar', symbol: 'XLM', name: 'Stellar', image: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501447' },
    { id: 'vechain', symbol: 'VET', name: 'VeChain', image: 'https://assets.coingecko.com/coins/images/1167/large/vechain-logo.png?1696501999' },
    { id: 'filecoin', symbol: 'FIL', name: 'Filecoin', image: 'https://assets.coingecko.com/coins/images/12817/large/filecoin.png?1696510159' },
    { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos', image: 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1696502526' },
    { id: 'monero', symbol: 'XMR', name: 'Monero', image: 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1696501461' },
    { id: 'algorand', symbol: 'ALGO', name: 'Algorand', image: 'https://assets.coingecko.com/coins/images/4380/large/download.png?1696501954' },
    { id: 'tezos', symbol: 'XTZ', name: 'Tezos', image: 'https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1696502090' },
    { id: 'neo', symbol: 'NEO', name: 'Neo', image: 'https://assets.coingecko.com/coins/images/480/large/NEO_512_512.png?1696501461' },
    { id: 'dash', symbol: 'DASH', name: 'Dash', image: 'https://assets.coingecko.com/coins/images/19/large/dash-logo.png?1696501400' },
    { id: 'zcash', symbol: 'ZEC', name: 'Zcash', image: 'https://assets.coingecko.com/coins/images/486/large/circle-zcash-color.png?1696501461' },
    { id: 'decred', symbol: 'DCR', name: 'Decred', image: 'https://assets.coingecko.com/coins/images/329/large/decred.png?1696501628' },
    { id: 'qtum', symbol: 'QTUM', name: 'Qtum', image: 'https://assets.coingecko.com/coins/images/700/large/qtum.png?1696501999' },
    { id: 'icon', symbol: 'ICX', name: 'ICON', image: 'https://assets.coingecko.com/coins/images/1060/large/icon-icx-logo.png?1696501999' },
    { id: 'nano', symbol: 'XNO', name: 'Nano', image: 'https://assets.coingecko.com/coins/images/756/large/nano-coin-logo.png?1696501999' },
    { id: 'raiden-network-token', symbol: 'RDN', name: 'Raiden Network Token', image: 'https://assets.coingecko.com/coins/images/1132/large/raiden-logo.jpg?1696501999' },
    { id: 'aeternity', symbol: 'AE', name: 'Aeternity', image: 'https://assets.coingecko.com/coins/images/1091/large/aeternity.png?1696501999' },
    { id: 'bytom', symbol: 'BTM', name: 'Bytom', image: 'https://assets.coingecko.com/coins/images/1080/large/bytom.png?1696501999' },
    { id: '0x', symbol: 'ZRX', name: '0x Protocol', image: 'https://assets.coingecko.com/coins/images/863/large/0x.png?1696501999' }
];

// --- STATE DATA ---
// "Bộ nhớ sống" của ứng dụng. Mọi thay đổi của người dùng sẽ được cập nhật ở đây.
// Dùng 'let' vì object này sẽ được gán lại giá trị khi tải từ Local Storage.
export let state = {
    jars: {
        // Dữ liệu số dư sẽ được khởi tạo khi ứng dụng chạy
    },
    transactions: [],
    totalBalance: 0,
    investmentWallet: { apiKey: '', address: ''},
    // Thêm dữ liệu cho phần đầu tư
    investmentPortfolio: {
        transactions: [], // Lưu các giao dịch mua/bán
        holdings: {}, // Lưu số lượng coin đang nắm giữ
        totalValue: 0, // Tổng giá trị portfolio
        totalPnL: 0, // Tổng lợi nhuận/lỗ
        currency: 'USD' // Đơn vị tiền tệ mặc định
    }
};

// Hàm này không phải là logic xử lý, nó chỉ là một công cụ để cập nhật lại biến state.
// Nó được đặt ở đây để file script.js có thể gọi và thay đổi state.
export function updateState(newState) {
    state = newState;
}
