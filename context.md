# CẤU TRÚC MONTRACKER

Cơ Bản: user có lương -> nhập lương -> tự động chia tiền ra các hủ đã được đề xuất theo tỉ lệ -> mỗi hủ đều có các tính năng riêng: số tiền còn lại trong hủ, mục tiêu, lịch sử chi tiêu (nhập từ thêm chi tiêu)

Yêu cầu nhập thêm hủ nợ nâng số lượng hủ lên là 6 hủ theo thứ tự: Nợ, chi tiêu, khẩn cấp, tiết kiệm, đầu tư, học tập

I. Nhập lương
    click nhập lương -> modal pop up -> modal: số tiền cần nhập, mô tả, 6 hủ: Nợ, chi tiêu, khẩn cấp, tiết kiệm, đầu tư, học tập (như một danh sách nằm ở phần dưới ở trong modal này) -> nhập số tiền, mô tả -> lưu -> tiền sẽ tự động chia đều cho 6 hủ theo tỉ lệ mặc định (Nợ 20%, chi tiêu 40%, khẩn cấp 10%, tiết kiệm 10%, đầu tư 10%, học tập 10%) tuy nhiên ở mỗi hủ sẽ có nút chỉnh tỉ lệ bằng tiền hoặc % và mỗi hủ được chỉnh tỉ lệ sẽ ảnh hưởng đến các hủ khác miễn là duy trì trong mức tổng 100% được nhập vào.

    Thêm nút chỉnh sửa lương nằm bên phải nút hủy, lưu. User click chỉnh sửa mục lương đã nhập trước đó -> reset toàn bộ lương đã nhập trước đó -> nhập số mới -> lưu -> chia tiền thành nhiều hủ theo tỉ lệ -> update chart và hiển thị số mới (tuy nhiên các lịch sử giao dịch trước đó không được phép xóa đi)

    Dữ liệu ở mục nhập lương này sẽ đồng bộ chung với dữ liệu các hủ nằm ở bên dưới và update ở mục tổng số dư và tổng lương. 

    
    
    *mô tả modal: 
        từ trên xuống: số tiền, mô tả, hủy, lưu, chỉnh sửa, 6 hủ theo thứ tự từ trên xuống, ở mỗi hủ hiển thị tiền được chia + chỉnh sửa tỉ lệ.

II. Thêm thu nhập
    đây là phần thêm thu nhập từ các nguồn tiền bên ngoài, gắn thêm mô tả cho user biết "Thu nhập thêm của bạn từ các nguồn công việc khác, hãy chọn hủ để bỏ vào, *nếu có nợ thì ưu tiên trả nợ trước nhé*". 
    Khi user nhập thêm thu nhập -> lưu -> update hiển thị tổng số dư, tổng lương ở giao diện bảng tin.
    ví dụ: click thêm thu nhập -> modal pop up -> nhập thông tin -> lưu -> tắt modal -> update tổng số dư và tổng lương, update chart -> update hủ được user chọn.

    Ở modal thêm thu nhập có dòng chữ "Tổng lương còn lại" có nghĩa là tổng lương còn lại sau khi chi tiêu. Nếu user chi tiêu 3,000,000đ với tổng lương là 10,000,000đ thì còn 7,000,000đ. 
III. Thêm chi tiêu:
    
IV. 6 hủ và các tính năng chung và riêng.
    Mô tả ban đầu: các hủ hiển thị tên hủ, số tiền còn lại ở mỗi hủ, mô tả của từng hủ 

    Tính năng chung:
    ------
    Tính năng riêng:
    Nợ:
    Chi tiêu:
    Khẩn cấp:
    Tiết kiệm:
    Đầu tư:
    Học tập:

    Mô tả toàn bộ tính năng từng hủ:
    Nợ:
    Chi tiêu:
    Khẩn cấp:
    Tiết kiệm:
    Đầu tư:
    Học tập: