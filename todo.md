===/Xây dựng phần đầu tư/===

phần này là quản trị danh mục đầu tư của user
bao gồm biểu đồ tài sản đã tích lũy
thông tin giao dịch mua bán
loại tiền mã hóa
xây dựng nó 100% giống của coin gecko
<img src="Project-Root/img/Screenshot 2025-07-31 003811.png">

1. My portfolio
- Current Balance
- 24h Portfolio Change
- Total Profit / Loss
- Holding chart: trình chiếu tài sản user đang nắm giữ với tỉ lệ phần trăm
- Portfolio: danh sách tài sản đang nắm giữ bao gồm:
    Token | Coin name
    Price: giá hiện tại của tài sản
    Holding: số lượng đang nắm giữ & tổng giá trị đang nắm giữ
    PnL: profit & loss giữa tài sản có giá trung bình so với giá hiện tại
    Action: 
        Dấu " + " sẽ là add transaction:

            đây là phần sẽ popup "Add Transaction" Modal <img src="Project-Root/img/Screenshot 2025-07-31 005252.png"> 

            Buy & Sell: cấu trúc sẽ giống nhau
                Select coin: chọn loại coin cần nhập, tôi nghĩ là sẽ tạo file chứa khoảng 30 coin/ token top bao gồm hình ảnh, tên
                    User click mũi tên chỉa xuống select coin -> danh sách coin xuất hiện
                total spend: nhập tổng số tiền đã Buy | Sell
                    user có thể lựa chọn nhập bằng VND | USD bằng mũi tên chỉa xuống hiện danh sách
                Quantity: số lượng token/ coin đã được lựa chọn từ khâu Select coin
                Price per Coin: giá một đồng coin dựa trên VND hoặc USD
                Date & Time: lựa chọn ngày tháng năm và giờ đã mua
                Button Add Transaction: user lick nút này dữ liệu sẽ nhập vào chart, My portfolio.

        Dấu " : " sẽ là view transaction | hoặc remove coin:
            user click view transaction:
                <img src="Project-Root/img/Screenshot 2025-07-31 011319.png">
                Type: hiển thị Buy | Sell
                Price: hiển thị giá đã Buy | Sell
                QUantity: hiển thị số lượng đã Buy | Sell
                Date&Time: ngày giờ Buy | Sell
                Cost: số tiền đã bỏ ra được nhập từ total spend của phần add transaction
                Action: 
                    Edit: <img src:"Project-Root/img/Screenshot 2025-07-31 011858.png">
                        user click vào edit sẽ pop up modal với cấu trúc 
                            Select coin: chọn loại coin cần nhập, tôi nghĩ là sẽ tạo file chứa khoảng 30 coin/ token top bao gồm hình ảnh, tên
                                 User click mũi tên chỉa xuống select coin -> danh sách coin xuất hiện
                            total spend: nhập tổng số tiền đã Buy | Sell
                                user có thể lựa chọn nhập bằng VND | USD bằng mũi tên chỉa xuống hiện danh sách
                            Quantity: số lượng token/ coin đã được lựa chọn từ khâu Select coin
                            Price per Coin: giá một đồng coin dựa trên VND hoặc USD
                            Date & Time: lựa chọn ngày tháng năm và giờ đã mua
                            Button Save: user lick nút này dữ liệu sẽ nhập vào chart, My portfolio.
                    Remove: <img src="Project-Root/img/Screenshot 2025-07-31 012259.png">
                        user click vào remove sẽ pop up modal như hình
                        Tiêu đề: Remove Transaction
                        Cảnh báo: "Are you sure you want to remove this transaction? This cannot be undone."
                        button: 
                            cancel: tắt modal
                            confirm: dữ liệu đó sẽ bị xóa -> update lại chart, my portfolio
    
/=====================================================/
1. update chart.js cho phần invest
2. tính toán PnL, tại sao, bằng cách nào lại xuất hiện con số PnL đó
    giá thị trường cần được update như thế nào
3. update file logo crypto

